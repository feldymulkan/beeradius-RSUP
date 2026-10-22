import prisma from "@/lib/prisma";

export interface TelegramSettings {
  id?: number;
  botToken: string;
  chatId: string;
  enabled: boolean;
  notifyDevice: boolean;
  notifyVpnOnline: boolean;
  notifyVpnOffline: boolean;
  updatedAt?: Date;
}

/**
 * Escapes characters that would break Telegram HTML parsing
 */
export function escapeHtml(str: string = ""): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Format date into RSUD NTB standard timestamp (WITA / Asia/Makassar)
 */
export function formatWitaTimestamp(date: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Makassar",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date) + " WITA";
  } catch {
    return date.toLocaleString("id-ID") + " WITA";
  }
}

/**
 * Format bytes to readable string (KB, MB, GB)
 */
export function formatBytes(bytes: number | bigint | null | undefined): string {
  if (bytes === null || bytes === undefined) return "0 B";
  const num = typeof bytes === "bigint" ? Number(bytes) : bytes;
  if (isNaN(num) || num <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(num) / Math.log(1024));
  const val = num / Math.pow(1024, i);
  return `${val.toFixed(2)} ${units[i]}`;
}

/**
 * Format seconds to readable duration (e.g., "1j 25m 10d")
 */
export function formatDuration(seconds: number | null | undefined): string {
  if (!seconds || seconds <= 0) return "0 detik";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (h > 0) parts.push(`${h}j`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}d`);
  return parts.join(" ");
}

/**
 * Ambil record TelegramConfig dari database dengan fallback aman ke raw query SQL
 */
export async function getTelegramConfigFromDb(): Promise<any | null> {
  try {
    if (typeof (prisma as any).telegramConfig?.findFirst === "function") {
      return await (prisma as any).telegramConfig.findFirst({
        orderBy: { id: "desc" },
      });
    }
  } catch {}

  try {
    const rows = await prisma.$queryRaw<any[]>`SELECT * FROM TelegramConfig ORDER BY id DESC LIMIT 1`;
    return rows && rows.length > 0 ? rows[0] : null;
  } catch (err: any) {
    console.warn("[Telegram DB] Raw query fallback failed:", err.message);
    return null;
  }
}

/**
 * Simpan atau perbarui record TelegramConfig ke database dengan fallback aman ke raw query SQL
 */
export async function saveTelegramConfigToDb(data: {
  botToken: string;
  chatId: string;
  enabled: boolean;
  notifyDevice: boolean;
  notifyVpnOnline: boolean;
  notifyVpnOffline: boolean;
}): Promise<any> {
  const existing = await getTelegramConfigFromDb();

  try {
    if (
      typeof (prisma as any).telegramConfig?.update === "function" &&
      typeof (prisma as any).telegramConfig?.create === "function"
    ) {
      if (existing && existing.id) {
        return await (prisma as any).telegramConfig.update({
          where: { id: existing.id },
          data,
        });
      } else {
        return await (prisma as any).telegramConfig.create({
          data,
        });
      }
    }
  } catch {}

  // Fallback ke raw query jika prisma client in-memory belum di-refresh
  const now = new Date();
  if (existing && existing.id) {
    await prisma.$executeRaw`
      UPDATE TelegramConfig 
      SET botToken = ${data.botToken}, 
          chatId = ${data.chatId}, 
          enabled = ${data.enabled ? 1 : 0}, 
          notifyDevice = ${data.notifyDevice ? 1 : 0}, 
          notifyVpnOnline = ${data.notifyVpnOnline ? 1 : 0}, 
          notifyVpnOffline = ${data.notifyVpnOffline ? 1 : 0}, 
          updatedAt = ${now} 
      WHERE id = ${existing.id}
    `;
    return { ...existing, ...data, updatedAt: now };
  } else {
    await prisma.$executeRaw`
      INSERT INTO TelegramConfig (botToken, chatId, enabled, notifyDevice, notifyVpnOnline, notifyVpnOffline, createdAt, updatedAt)
      VALUES (${data.botToken}, ${data.chatId}, ${data.enabled ? 1 : 0}, ${data.notifyDevice ? 1 : 0}, ${data.notifyVpnOnline ? 1 : 0}, ${data.notifyVpnOffline ? 1 : 0}, ${now}, ${now})
    `;
    const inserted = await prisma.$queryRaw<any[]>`SELECT * FROM TelegramConfig ORDER BY id DESC LIMIT 1`;
    return inserted && inserted.length > 0 ? inserted[0] : { ...data, createdAt: now, updatedAt: now };
  }
}

/**
 * Retrieve Telegram Settings from database, with fallback to environment variables
 */
export async function getTelegramConfig(): Promise<TelegramSettings> {
  try {
    const dbConfig = await getTelegramConfigFromDb();

    if (dbConfig) {
      return {
        id: dbConfig.id,
        botToken: dbConfig.botToken || process.env.TELEGRAM_BOT_TOKEN || "",
        chatId: dbConfig.chatId || process.env.TELEGRAM_CHAT_ID || "",
        enabled: Boolean(dbConfig.enabled),
        notifyDevice: Boolean(dbConfig.notifyDevice),
        notifyVpnOnline: Boolean(dbConfig.notifyVpnOnline),
        notifyVpnOffline: Boolean(dbConfig.notifyVpnOffline),
        updatedAt: dbConfig.updatedAt,
      };
    }
  } catch (err: any) {
    console.warn("[Telegram] Gagal membaca konfigurasi dari DB, menggunakan .env:", err.message);
  }

  return {
    botToken: process.env.TELEGRAM_BOT_TOKEN || "",
    chatId: process.env.TELEGRAM_CHAT_ID || "",
    enabled: Boolean(process.env.TELEGRAM_ENABLED !== "false" && process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
    notifyDevice: true,
    notifyVpnOnline: true,
    notifyVpnOffline: true,
  };
}

/**
 * Send raw HTML message to Telegram
 */
export async function sendTelegramMessage(
  htmlText: string,
  customToken?: string,
  customChatId?: string
): Promise<{ success: boolean; messageId?: number; error?: string }> {
  try {
    let token = customToken;
    let chatId = customChatId;

    if (!token || !chatId) {
      const cfg = await getTelegramConfig();
      if (!cfg.enabled && !customToken) {
        return { success: false, error: "Notifikasi Telegram sedang dinonaktifkan." };
      }
      token = token || cfg.botToken;
      chatId = chatId || cfg.chatId;
    }

    if (!token || !chatId) {
      return { success: false, error: "Bot Token atau Chat ID belum dikonfigurasi." };
    }

    const url = `https://api.telegram.org/bot${token.trim()}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text: htmlText,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.ok) {
      const errMsg = data.description || `HTTP ${response.status}: Gagal mengirim pesan ke Telegram`;
      console.error("[Telegram Error]:", errMsg);
      return { success: false, error: errMsg };
    }

    return { success: true, messageId: data.result?.message_id };
  } catch (err: any) {
    console.error("[Telegram Exception]:", err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Send alert for network device status change (Down / Recovery / SNMP Error)
 */
export async function sendDeviceStatusNotification(params: {
  name: string;
  ip: string;
  deviceType?: string;
  brand?: string;
  model?: string;
  location?: string;
  previousStatus: string;
  newStatus: "online" | "snmp_offline" | "offline";
  uptime?: string;
  error?: string;
}): Promise<void> {
  const cfg = await getTelegramConfig();
  if (!cfg.enabled || !cfg.notifyDevice) return;

  const typeLabelMap: Record<string, string> = {
    switch: "Switch Managed",
    router: "Core Router",
    home_router: "Home Router Wi-Fi",
    ap: "Access Point",
    server: "Server Host",
    nvr: "NVR / CCTV",
  };
  const typeLabel = typeLabelMap[params.deviceType || ""] || "Perangkat Jaringan";
  const timestamp = formatWitaTimestamp();

  let message = "";

  if (params.newStatus === "offline") {
    // 🚨 PERANGKAT MATI TOTAL
    message = [
      `🚨 <b>[ALERT] PERANGKAT JARINGAN DOWN</b>`,
      ``,
      `🏥 <b>RSUD NTB NOC TELEMETRY</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📦 <b>Perangkat:</b> ${escapeHtml(params.name)}`,
      `🏷️ <b>Tipe:</b> ${escapeHtml(typeLabel)} (${escapeHtml(params.brand || "Unknown")} ${escapeHtml(params.model || "")})`,
      `🌐 <b>IP Address:</b> <code>${escapeHtml(params.ip)}</code>`,
      params.location ? `📍 <b>Lokasi:</b> ${escapeHtml(params.location)}` : null,
      `⚠️ <b>Kondisi:</b> Host Unreachable (ICMP Ping & SNMP Timeout)`,
      params.error ? `🔍 <b>Diagnosa:</b> <i>${escapeHtml(params.error)}</i>` : null,
      `⏰ <b>Waktu Deteksi:</b> ${timestamp}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `<i>Harap segera periksa koneksi kabel, power adaptor, atau status uplink switch.</i>`,
    ].filter(Boolean).join("\n");
  } else if (params.previousStatus === "offline" && params.newStatus === "online") {
    // ✅ PERANGKAT PULIH KEMBALI
    message = [
      `✅ <b>[RECOVERED] PERANGKAT JARINGAN PULIH</b>`,
      ``,
      `🏥 <b>RSUD NTB NOC TELEMETRY</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📦 <b>Perangkat:</b> ${escapeHtml(params.name)}`,
      `🏷️ <b>Tipe:</b> ${escapeHtml(typeLabel)}`,
      `🌐 <b>IP Address:</b> <code>${escapeHtml(params.ip)}</code>`,
      params.location ? `📍 <b>Lokasi:</b> ${escapeHtml(params.location)}` : null,
      params.uptime && params.uptime !== "-" ? `⏱️ <b>Uptime:</b> <code>${escapeHtml(params.uptime)}</code>` : null,
      `🟢 <b>Status Sekarang:</b> UP / Online Normal (Ping & SNMP Aktif)`,
      `⏰ <b>Waktu Pulih:</b> ${timestamp}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `<i>Perangkat telah terhubung kembali dan telemetri termonitor normal.</i>`,
    ].filter(Boolean).join("\n");
  } else if (params.previousStatus === "online" && params.newStatus === "snmp_offline") {
    // ⚠️ SNMP TIDAK MERESPON (Ping hidup tapi port 161 mati)
    message = [
      `⚠️ <b>[WARNING] SNMP AGENT TIMEOUT</b>`,
      ``,
      `🏥 <b>RSUD NTB NOC TELEMETRY</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📦 <b>Perangkat:</b> ${escapeHtml(params.name)}`,
      `🌐 <b>IP Address:</b> <code>${escapeHtml(params.ip)}</code>`,
      `⚡ <b>Kondisi:</b> Host Hidup (Ping UP), tetapi SNMP Port 161 tidak merespon`,
      `⏰ <b>Waktu Deteksi:</b> ${timestamp}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `<i>Periksa service SNMP daemon atau ACL / community string pada perangkat.</i>`,
    ].join("\n");
  } else if (params.previousStatus === "snmp_offline" && params.newStatus === "online") {
    // 🟢 SNMP PULIH
    message = [
      `🟢 <b>[RESOLVED] SNMP MONITORING PULIH</b>`,
      ``,
      `🏥 <b>RSUD NTB NOC TELEMETRY</b>`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `📦 <b>Perangkat:</b> ${escapeHtml(params.name)} (<code>${escapeHtml(params.ip)}</code>)`,
      `🟢 <b>Status:</b> Agen SNMP telah merespon kembali secara normal.`,
      `⏰ <b>Waktu Pulih:</b> ${timestamp}`,
    ].join("\n");
  }

  if (message) {
    await sendTelegramMessage(message);
  }
}

/**
 * Send alert when a VPN user connects (Online)
 */
export async function sendVpnUserOnlineNotification(params: {
  username: string;
  fullName?: string;
  protocol: "wireguard" | "radius";
  vpnTypeDetail?: string; // SSTP, L2TP, IKEv2, WireGuard
  ip: string;
  nasOrRouter?: string;
  department?: string;
  endpoint?: string;
}): Promise<void> {
  const cfg = await getTelegramConfig();
  if (!cfg.enabled || !cfg.notifyVpnOnline) return;

  const timestamp = formatWitaTimestamp();
  const protocolBadge = params.protocol === "wireguard" ? "WireGuard" : (params.vpnTypeDetail || "RADIUS VPN");

  const message = [
    `🛡️ <b>[VPN ONLINE] PENGGUNA TERHUBUNG</b>`,
    ``,
    `🏥 <b>RSUD NTB VPN ACCESS GATEWAY</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Pengguna:</b> <b>${escapeHtml(params.username)}</b>${params.fullName ? ` (${escapeHtml(params.fullName)})` : ""}`,
    params.department ? `🏢 <b>Unit / Ruangan:</b> ${escapeHtml(params.department)}` : null,
    `⚡ <b>Protokol:</b> <code>${escapeHtml(protocolBadge)}</code>`,
    `🌐 <b>IP VPN Terdistribusi:</b> <code>${escapeHtml(params.ip)}</code>`,
    params.nasOrRouter ? `🖥️ <b>Server Gateway:</b> ${escapeHtml(params.nasOrRouter)}` : null,
    params.endpoint ? `📍 <b>Client Endpoint:</b> <code>${escapeHtml(params.endpoint)}</code>` : null,
    `⏰ <b>Waktu Terhubung:</b> ${timestamp}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<i>Sesi VPN aktif dan enkripsi tunnel berjalan lancar.</i>`,
  ].filter(Boolean).join("\n");

  await sendTelegramMessage(message);
}

/**
 * Send alert when a VPN user disconnects (Offline)
 */
export async function sendVpnUserOfflineNotification(params: {
  username: string;
  fullName?: string;
  protocol: "wireguard" | "radius";
  vpnTypeDetail?: string;
  ip: string;
  durationSeconds?: number;
  inputBytes?: number | bigint;
  outputBytes?: number | bigint;
  terminateCause?: string;
  nasOrRouter?: string;
}): Promise<void> {
  const cfg = await getTelegramConfig();
  if (!cfg.enabled || !cfg.notifyVpnOffline) return;

  const timestamp = formatWitaTimestamp();
  const protocolBadge = params.protocol === "wireguard" ? "WireGuard" : (params.vpnTypeDetail || "RADIUS VPN");
  const durationText = formatDuration(params.durationSeconds);
  const totalIn = formatBytes(params.inputBytes);
  const totalOut = formatBytes(params.outputBytes);

  const message = [
    `🔌 <b>[VPN OFFLINE] PENGGUNA TERPUTUS</b>`,
    ``,
    `🏥 <b>RSUD NTB VPN ACCESS GATEWAY</b>`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 <b>Pengguna:</b> <b>${escapeHtml(params.username)}</b>${params.fullName ? ` (${escapeHtml(params.fullName)})` : ""}`,
    `⚡ <b>Protokol:</b> <code>${escapeHtml(protocolBadge)}</code>`,
    `🌐 <b>IP VPN Terakhir:</b> <code>${escapeHtml(params.ip)}</code>`,
    `⏱️ <b>Durasi Online:</b> <code>${durationText}</code>`,
    params.inputBytes || params.outputBytes ? `📊 <b>Pemakaian Data:</b> ⬇️ ${totalOut} | ⬆️ ${totalIn}` : null,
    params.terminateCause ? `ℹ️ <b>Alasan Putus:</b> <i>${escapeHtml(params.terminateCause)}</i>` : null,
    params.nasOrRouter ? `🖥️ <b>Gateway:</b> ${escapeHtml(params.nasOrRouter)}` : null,
    `⏰ <b>Waktu Sesi Berakhir:</b> ${timestamp}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `<i>Sesi koneksi telah ditutup dan dialokasikan kembali.</i>`,
  ].filter(Boolean).join("\n");

  await sendTelegramMessage(message);
}
