import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

/**
 * Konversi aman ke BigInt untuk menghindari crash pada nilai null/undefined.
 */
export function safeBigInt(value: any): bigint {
    if (value === null || value === undefined || value === '') return BigInt(0);
    try {
        return BigInt(value);
    } catch {
        return BigInt(0);
    }
}

/**
 * Deteksi timezone server secara otomatis.
 * Menggunakan Intl API untuk mendapatkan timezone runtime (misal: 'Asia/Makassar').
 */
const SERVER_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

/**
 * Hitung offset timezone server dalam milidetik secara dinamis.
 * Ini digunakan untuk koreksi Date dari Prisma/MySQL DATETIME yang tidak menyimpan timezone.
 */
function getServerOffsetMs(): number {
    const now = new Date();
    // Gunakan Intl untuk mendapatkan offset saat ini (termasuk DST jika ada)
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: SERVER_TZ,
        timeZoneName: 'shortOffset',
    });
    const parts = formatter.formatToParts(now);
    const tzPart = parts.find(p => p.type === 'timeZoneName');
    // Format: "GMT+8", "GMT-5", "GMT+5:30", dll
    const match = tzPart?.value?.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
    if (!match) return 0;
    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3] || '0', 10);
    return sign * (hours * 60 + minutes) * 60 * 1000;
}

const SERVER_OFFSET_MS = getServerOffsetMs();

/**
 * Normalisasi Date dari Prisma/MySQL DATETIME yang dibaca sebagai UTC tanpa timezone.
 * MySQL DATETIME tidak menyimpan timezone — FreeRADIUS menulis waktu lokal server.
 * Prisma membacanya seolah UTC, sehingga perlu dikoreksi dengan offset timezone server.
 * Contoh: server WITA (+8), MySQL simpan 09:17, Prisma baca 09:17 UTC → koreksi jadi 01:17 UTC.
 */
export function fixPrismaDate(date: Date | string | number | null | undefined): Date | null {
    if (!date) return null;
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    return new Date(d.getTime() - SERVER_OFFSET_MS);
}

/**
 * Konversi UTC Date aktual ke waktu lokal server untuk query filter Prisma pada kolom MySQL DATETIME.
 */
export function toPrismaDate(date: Date): Date {
    return new Date(date.getTime() + SERVER_OFFSET_MS);
}

/**
 * Rekursif mengoreksi objek/array yang mengandung Date dari Prisma.
 */
export function fixPrismaDates<T>(data: T): T {
    if (data === null || data === undefined) return data;
    if (data instanceof Date) {
        return fixPrismaDate(data) as any;
    }
    if (Array.isArray(data)) {
        return data.map(fixPrismaDates) as any;
    }
    if (typeof data === 'object' && data.constructor === Object) {
        const result: any = {};
        for (const [key, value] of Object.entries(data)) {
            if (value instanceof Date) {
                result[key] = fixPrismaDate(value);
            } else if (typeof value === 'object' && value !== null) {
                result[key] = fixPrismaDates(value);
            } else {
                result[key] = value;
            }
        }
        return result;
    }
    return data;
}

/**
 * Mengonversi objek yang mungkin mengandung BigInt & Date dari Prisma menjadi objek yang aman untuk JSON.
 */
export function serializeBigInt<T>(data: T): T {
    if (data === null || data === undefined) return data;
    
    const fixedData = fixPrismaDates(data);

    return JSON.parse(
        JSON.stringify(fixedData, (key, value) => {
            if (typeof value === 'bigint') return value.toString();
            // Fallback for cases where value might be intended to be bigint but is undefined
            if (key.includes('octets') || key.includes('input') || key.includes('output') || key.includes('sum')) {
                if (value === undefined || value === null) return "0";
            }
            return value;
        })
    );
}

/**
 * Format bytes ke ukuran yang mudah dibaca (KB, MB, GB, TB)
 */
export function formatBytes(bytes: number | bigint | string | null | undefined): string {
    const b = safeBigInt(bytes);
    if (b === BigInt(0)) return '0 B';

    const num = Number(b);
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(num) / Math.log(k));

    return parseFloat((num / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Format tanggal ke timezone server (dideteksi otomatis saat runtime).
 * Timezone saat ini: diambil dari Intl.DateTimeFormat (misal: Asia/Makassar untuk WITA).
 */
export function formatDate(date: Date | string | number | null, formatStr: string = 'dd/MM/yyyy HH:mm:ss'): string {
    if (!date) return '-';
    try {
        const d = new Date(date);
        if (isNaN(d.getTime())) return '-';
        
        const zonedDate = toZonedTime(d, SERVER_TZ);
        return format(zonedDate, formatStr);
    } catch {
        return '-';
    }
}
