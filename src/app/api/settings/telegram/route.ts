import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import {
  getTelegramConfig,
  saveTelegramConfigToDb,
  sendTelegramMessage,
  formatWitaTimestamp,
  escapeHtml,
} from "@/lib/telegram";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    try {
      const { startVpnMonitorWorker } = await import("@/lib/vpnMonitor");
      startVpnMonitorWorker();
    } catch {}

    const config = await getTelegramConfig();
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();

    // 1. Aksi Kirim Pesan Tes
    if (body.action === "test") {
      const testToken = (body.botToken || "").trim();
      const testChatId = (body.chatId || "").trim();

      if (!testToken || !testChatId) {
        return NextResponse.json(
          { message: "Bot Token dan Chat ID wajib diisi untuk melakukan tes." },
          { status: 400 }
        );
      }

      const timestamp = formatWitaTimestamp();
      const adminName = (session.user as any)?.username || "Admin NOC";

      const testHtml = [
        `🤖 <b>[KONEKSI BERHASIL] BOT NOTIFIKASI BEERADIUS</b>`,
        ``,
        `🏥 <b>RSUD Provinsi NTB - Network Operation Center</b>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `✅ <i>Integrasi bot Telegram BeeRadius berhasil diverifikasi!</i>`,
        ``,
        `👤 <b>Penguji:</b> ${escapeHtml(adminName)}`,
        `⏰ <b>Waktu Tes:</b> ${timestamp}`,
        `📢 <b>Channel / Chat ID:</b> <code>${escapeHtml(testChatId)}</code>`,
        `━━━━━━━━━━━━━━━━━━━━`,
        `Sistem ini sekarang siap mengirimkan notifikasi instan untuk:`,
        `• 🚨 <b>Deteksi Perangkat Jaringan Mati / Down & Pulih</b>`,
        `• 🛡️ <b>Deteksi Pengguna VPN Terhubung (Online)</b>`,
        `• 🔌 <b>Deteksi Pengguna VPN Terputus (Offline)</b>`,
      ].join("\n");

      const result = await sendTelegramMessage(testHtml, testToken, testChatId);
      if (!result.success) {
        return NextResponse.json(
          { message: result.error || "Gagal mengirim pesan tes ke Telegram." },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Pesan tes berhasil dikirim ke Telegram!",
        messageId: result.messageId,
      });
    }

    // 2. Aksi Deteksi Chat ID Otomatis dari getUpdates
    if (body.action === "detectChatId") {
      const token = (body.botToken || "").trim();
      if (!token) {
        return NextResponse.json(
          { message: "Bot Token wajib diisi terlebih dahulu." },
          { status: 400 }
        );
      }

      try {
        const url = `https://api.telegram.org/bot${token}/getUpdates`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data.ok || !Array.isArray(data.result) || data.result.length === 0) {
          return NextResponse.json({
            success: false,
            message: "Belum ada pesan terbaru di bot. Kirim satu pesan apa saja (misal: 'tes' atau '/start') ke bot Anda di Telegram, lalu klik tombol ini lagi.",
          });
        }

        // Ambil update terakhir yang memiliki objek pesan atau chat
        const lastUpdate = data.result[data.result.length - 1];
        const chat = lastUpdate?.message?.chat || lastUpdate?.my_chat_member?.chat || lastUpdate?.channel_post?.chat;

        if (!chat || !chat.id) {
          return NextResponse.json({
            success: false,
            message: "Gagal menemukan Chat ID dari data update bot Telegram.",
          });
        }

        const chatTitle = chat.title || [chat.first_name, chat.last_name].filter(Boolean).join(" ") || chat.username || "Pribadi";

        return NextResponse.json({
          success: true,
          chatId: String(chat.id),
          chatTitle,
          chatType: chat.type,
          message: `Berhasil mendeteksi Chat ID: ${chat.id} (${chatTitle})`,
        });
      } catch (err: any) {
        return NextResponse.json(
          { message: "Gagal menghubungi Telegram API: " + err.message },
          { status: 500 }
        );
      }
    }

    // 3. Simpan / Perbarui Konfigurasi
    const botToken = (body.botToken || "").trim();
    const chatId = (body.chatId || "").trim();
    const enabled = body.enabled !== false;
    const notifyDevice = body.notifyDevice !== false;
    const notifyVpnOnline = body.notifyVpnOnline !== false;
    const notifyVpnOffline = body.notifyVpnOffline !== false;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { message: "Bot Token dan Chat ID wajib diisi." },
        { status: 400 }
      );
    }

    const savedConfig = await saveTelegramConfigToDb({
      botToken,
      chatId,
      enabled,
      notifyDevice,
      notifyVpnOnline,
      notifyVpnOffline,
    });

    await logAudit("UPDATE_TELEGRAM_CONFIG", "system", "Telegram Notification", {
      chatId,
      enabled,
      notifyDevice,
      notifyVpnOnline,
      notifyVpnOffline,
    });

    return NextResponse.json({
      success: true,
      message: "Konfigurasi Telegram berhasil disimpan.",
      config: savedConfig,
    });
  } catch (error: any) {
    console.error("[Settings Telegram POST Error]:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
