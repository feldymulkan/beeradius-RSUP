/**
 * Mengonversi objek yang mungkin mengandung BigInt menjadi objek yang aman untuk JSON.
 * Next.js (JSON.stringify) tidak mendukung BigInt secara bawaan.
 */
export function serializeBigInt<T>(data: T): T {
    return JSON.parse(
        JSON.stringify(data, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        )
    );
}

/**
 * Format bytes ke ukuran yang mudah dibaca (KB, MB, GB, TB)
 */
export function formatBytes(bytes: number | bigint | string | null): string {
    if (bytes === null || bytes === undefined) return '0 B';
    
    const b = typeof bytes === 'bigint' ? Number(bytes) : Number(bytes);
    if (isNaN(b)) return '0 B';
    if (b === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(b) / Math.log(k));

    return parseFloat((b / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
