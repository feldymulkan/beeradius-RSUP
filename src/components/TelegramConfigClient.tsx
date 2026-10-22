"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  FaTelegramPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPaperPlane,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaBell,
  FaInfoCircle,
  FaQuestionCircle,
  FaShieldAlt,
  FaNetworkWired,
  FaUserCheck,
  FaUserTimes,
  FaSearch,
  FaSync,
} from "react-icons/fa";

interface TelegramConfigData {
  id?: number;
  botToken: string;
  chatId: string;
  enabled: boolean;
  notifyDevice: boolean;
  notifyVpnOnline: boolean;
  notifyVpnOffline: boolean;
  updatedAt?: string;
}

export default function TelegramConfigClient() {
  const [config, setConfig] = useState<TelegramConfigData>({
    botToken: "",
    chatId: "",
    enabled: true,
    notifyDevice: true,
    notifyVpnOnline: true,
    notifyVpnOffline: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [testResult, setTestResult] = useState<{
    success?: boolean;
    message?: string;
    messageId?: number;
  } | null>(null);

  const [previewTab, setPreviewTab] = useState<"device_down" | "device_up" | "vpn_online" | "vpn_offline">("device_down");
  const [vpnWorkerStatus, setVpnWorkerStatus] = useState<{
    started?: boolean;
    radiusCount?: number;
    wireguardCount?: number;
  }>({ started: true, radiusCount: 0, wireguardCount: 0 });
  const [isScanningVpn, setIsScanningVpn] = useState(false);

  useEffect(() => {
    fetchConfig();
    fetchVpnStatus();
  }, []);

  const fetchVpnStatus = async () => {
    try {
      const res = await fetch("/api/vpn/monitor/poll");
      const data = await res.json();
      if (data.success && data.status) {
        setVpnWorkerStatus(data.status);
      }
    } catch {}
  };

  const handleManualScanVpn = async () => {
    try {
      setIsScanningVpn(true);
      const res = await fetch("/api/vpn/monitor/poll", { method: "POST" });
      const data = await res.json();
      if (data.success && data.status) {
        setVpnWorkerStatus(data.status);
        toast.success(
          `Pemindaian VPN selesai: ${data.status.wireguardCount || 0} WireGuard aktif, ${data.status.radiusCount || 0} RADIUS aktif.`
        );
      }
    } catch (err: any) {
      toast.error("Gagal memindai sesi VPN: " + err.message);
    } finally {
      setIsScanningVpn(false);
    }
  };

  const fetchConfig = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/settings/telegram");
      if (!res.ok) throw new Error("Gagal mengambil konfigurasi Telegram");
      const data = await res.json();
      if (data) {
        setConfig({
          id: data.id,
          botToken: data.botToken || "",
          chatId: data.chatId || "",
          enabled: data.enabled !== false,
          notifyDevice: data.notifyDevice !== false,
          notifyVpnOnline: data.notifyVpnOnline !== false,
          notifyVpnOffline: data.notifyVpnOffline !== false,
          updatedAt: data.updatedAt,
        });
      }
    } catch (err: any) {
      toast.error(err.message || "Gagal memuat pengaturan Telegram");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.botToken.trim()) {
      toast.error("Bot Token wajib diisi!");
      return;
    }
    if (!config.chatId.trim()) {
      toast.error("Chat ID / Group ID wajib diisi!");
      return;
    }

    try {
      setIsSaving(true);
      const res = await fetch("/api/settings/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan konfigurasi");

      toast.success("Konfigurasi notifikasi Telegram berhasil disimpan!");
      if (data.config) {
        setConfig((prev) => ({ ...prev, ...data.config }));
      }
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan saat menyimpan");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestNotification = async () => {
    if (!config.botToken.trim() || !config.chatId.trim()) {
      toast.error("Masukkan Bot Token dan Chat ID terlebih dahulu untuk menguji kirim pesan.");
      return;
    }

    try {
      setIsTesting(true);
      setTestResult(null);

      const res = await fetch("/api/settings/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "test",
          botToken: config.botToken.trim(),
          chatId: config.chatId.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setTestResult({
          success: false,
          message: data.message || "Gagal mengirim pesan tes.",
        });
        toast.error("Gagal mengirim pesan tes. Periksa Bot Token & Chat ID.");
      } else {
        setTestResult({
          success: true,
          message: data.message || "Pesan tes berhasil dikirim ke grup/chat Telegram!",
          messageId: data.messageId,
        });
        toast.success("Pesan tes berhasil dikirim! Silakan periksa Telegram Anda.");
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err.message || "Kesalahan koneksi jaringan",
      });
      toast.error("Error: " + err.message);
    } finally {
      setIsTesting(false);
    }
  };

  const handleDetectChatId = async () => {
    if (!config.botToken.trim()) {
      toast.error("Masukkan Bot Token terlebih dahulu!");
      return;
    }

    try {
      setIsDetecting(true);
      const res = await fetch("/api/settings/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "detectChatId",
          botToken: config.botToken.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        toast.error(data.message || "Gagal mendeteksi Chat ID.", { duration: 6000 });
      } else {
        setConfig((prev) => ({ ...prev, chatId: data.chatId }));
        toast.success(`Ditemukan Chat ID: ${data.chatId} (${data.chatTitle})`, { duration: 5000 });
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setIsDetecting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-sm font-medium text-base-content/70">Memuat konfigurasi notifikasi Telegram...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="card bg-base-100 border border-base-300 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center text-2xl shrink-0">
              <FaTelegramPlane />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-base-content">
                  Notifikasi Bot Telegram NOC
                </h1>
                {config.enabled ? (
                  <span className="badge badge-success badge-sm gap-1 text-[11px] font-semibold text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Aktif
                  </span>
                ) : (
                  <span className="badge badge-neutral badge-sm text-[11px] font-semibold">
                    Nonaktif
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-base-content/70 mt-1">
                Peringatan otomatis telemetri perangkat jaringan mati/pulih serta notifikasi real-time pengguna VPN (RADIUS & WireGuard).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleManualScanVpn}
              disabled={isScanningVpn}
              className="btn btn-outline btn-sm gap-2 border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              title="Pindai live sesi WireGuard dan RADIUS sekarang"
            >
              <FaSync className={`text-xs ${isScanningVpn ? "animate-spin" : ""}`} />
              Cek Sesi VPN ({vpnWorkerStatus.wireguardCount || 0} WG / {vpnWorkerStatus.radiusCount || 0} RADIUS)
            </button>
            <button
              type="button"
              onClick={handleTestNotification}
              disabled={isTesting || !config.botToken || !config.chatId}
              className="btn btn-outline btn-sm gap-2 border-sky-500/30 hover:bg-sky-500/10 text-sky-500"
            >
              {isTesting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <FaPaperPlane className="text-xs" />
              )}
              Kirim Pesan Tes
            </button>
          </div>
        </div>
      </div>

      {/* Test Result Alert */}
      {testResult && (
        <div
          className={`alert ${
            testResult.success
              ? "alert-success bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
              : "alert-error bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400"
          } text-sm flex items-start gap-3 shadow-sm`}
        >
          {testResult.success ? (
            <FaCheckCircle className="text-lg shrink-0 mt-0.5" />
          ) : (
            <FaExclamationTriangle className="text-lg shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <span className="font-semibold">
              {testResult.success ? "Verifikasi Berhasil!" : "Verifikasi Gagal!"}
            </span>{" "}
            {testResult.message}
            {testResult.messageId && (
              <span className="block text-xs opacity-80 mt-1 font-mono">
                Message ID: #{testResult.messageId}
              </span>
            )}
          </div>
          <button
            onClick={() => setTestResult(null)}
            className="btn btn-ghost btn-xs btn-circle"
          >
            ✕
          </button>
        </div>
      )}

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Configuration Form) */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          {/* Card 1: Kredensial Bot */}
          <div className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-base-200 pb-3">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-sky-500" />
                <h2 className="text-base font-semibold text-base-content">
                  Kredensial & Autentikasi Bot
                </h2>
              </div>
              <label className="label cursor-pointer gap-2 p-0">
                <span className="label-text text-xs font-medium text-base-content/80">
                  Master Switch
                </span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary toggle-sm"
                  checked={config.enabled}
                  onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                />
              </label>
            </div>

            {/* Bot Token */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium text-xs text-base-content/90 flex items-center gap-1.5">
                  Telegram Bot Token <span className="text-error">*</span>
                </span>
                <span className="label-text-alt text-[11px] text-base-content/60">
                  Diberikan oleh @BotFather
                </span>
              </label>
              <div className="relative">
                <input
                  type={showToken ? "text" : "password"}
                  placeholder="Contoh: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                  className="input input-bordered input-sm w-full font-mono text-xs pr-10 focus:border-sky-500"
                  value={config.botToken}
                  onChange={(e) => setConfig({ ...config, botToken: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content p-1"
                >
                  {showToken ? <FaEyeSlash className="text-xs" /> : <FaEye className="text-xs" />}
                </button>
              </div>
              <p className="text-[11px] text-base-content/60 mt-1">
                Token API rahasia bot Telegram Anda. Token disimpan aman di database.
              </p>
            </div>

            {/* Chat ID */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-medium text-xs text-base-content/90 flex items-center gap-1.5">
                  Chat ID / Group ID Tujuan <span className="text-error">*</span>
                </span>
                <span className="label-text-alt text-[11px] text-base-content/60">
                  Grup diawali tanda minus (-)
                </span>
              </label>
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="Contoh: -1001234567890 (Grup) atau 987654321 (Pribadi)"
                  className="input input-bordered input-sm join-item w-full font-mono text-xs focus:border-sky-500"
                  value={config.chatId}
                  onChange={(e) => setConfig({ ...config, chatId: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={handleDetectChatId}
                  disabled={isDetecting || !config.botToken}
                  className="btn btn-sm btn-outline join-item border-base-300 text-xs shrink-0 text-sky-500 hover:bg-sky-500/10 gap-1.5"
                  title="Deteksi Chat ID otomatis dari pesan terbaru di bot"
                >
                  {isDetecting ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <FaSearch className="text-xs" />
                  )}
                  Deteksi Otomatis
                </button>
              </div>
              <p className="text-[11px] text-base-content/60 mt-1">
                Kirim pesan sembarang (misal: "tes") ke bot Anda di Telegram atau di grup NOC, lalu klik tombol <b>Deteksi Otomatis</b>.
              </p>
            </div>
          </div>

          {/* Card 2: Pemicu Notifikasi (Notification Triggers) */}
          <div className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-base-200 pb-3">
              <FaBell className="text-amber-500" />
              <h2 className="text-base font-semibold text-base-content">
                Pemicu Notifikasi (Alert Triggers)
              </h2>
            </div>

            <div className="space-y-3">
              {/* Trigger 1: Deteksi Perangkat Mati / Pulih */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-base-200/50 border border-base-300/50 hover:border-base-300 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-rose-500/10 text-rose-500 text-sm mt-0.5 shrink-0">
                    <FaNetworkWired />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-base-content">
                      Deteksi Perangkat Jaringan (Mati & Pulih)
                    </h3>
                    <p className="text-[11px] text-base-content/70 mt-0.5 leading-relaxed">
                      Kirim alert saat Switch Managed, Router Core, Home Router, atau Access Point mati (ICMP Ping & SNMP timeout) atau kembali online.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-error toggle-sm mt-1"
                  checked={config.notifyDevice}
                  onChange={(e) => setConfig({ ...config, notifyDevice: e.target.checked })}
                />
              </div>

              {/* Trigger 2: Deteksi User VPN Online */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-base-200/50 border border-base-300/50 hover:border-base-300 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-500 text-sm mt-0.5 shrink-0">
                    <FaUserCheck />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-base-content">
                      Deteksi Pengguna VPN Terhubung (Online)
                    </h3>
                    <p className="text-[11px] text-base-content/70 mt-0.5 leading-relaxed">
                      Kirim notifikasi saat pengguna terhubung ke jaringan VPN rumah sakit via FreeRADIUS (SSTP, L2TP, IKEv2) maupun WireGuard (MikroTik).
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-success toggle-sm mt-1"
                  checked={config.notifyVpnOnline}
                  onChange={(e) => setConfig({ ...config, notifyVpnOnline: e.target.checked })}
                />
              </div>

              {/* Trigger 3: Deteksi User VPN Offline */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-base-200/50 border border-base-300/50 hover:border-base-300 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-amber-500/10 text-amber-500 text-sm mt-0.5 shrink-0">
                    <FaUserTimes />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-base-content">
                      Deteksi Pengguna VPN Terputus (Offline)
                    </h3>
                    <p className="text-[11px] text-base-content/70 mt-0.5 leading-relaxed">
                      Kirim laporan sesi saat pengguna disconnect, mencakup durasi waktu aktif, pemakaian total kuota data (Rx/Tx), dan alasan terminasi sesi.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-warning toggle-sm mt-1"
                  checked={config.notifyVpnOffline}
                  onChange={(e) => setConfig({ ...config, notifyVpnOffline: e.target.checked })}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary btn-sm gap-2 shadow-md shadow-primary/20 text-white min-w-[150px]"
            >
              {isSaving ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <FaSave className="text-xs" />
              )}
              Simpan Konfigurasi
            </button>
          </div>
        </form>

        {/* Right Column (Guide & Interactive Preview) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Guide Card */}
          <div className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-3.5">
            <div className="flex items-center gap-2 border-b border-base-200 pb-2.5">
              <FaQuestionCircle className="text-sky-500 text-sm" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-base-content">
                Panduan Cepat Setup Bot Telegram
              </h2>
            </div>

            <ol className="text-xs text-base-content/80 space-y-2.5 list-decimal list-inside leading-relaxed">
              <li>
                Buka Telegram dan hubungi akun resmi{" "}
                <code className="text-[11px] px-1 py-0.5 rounded bg-base-200 text-primary font-mono font-bold">
                  @BotFather
                </code>
                .
              </li>
              <li>
                Kirim perintah <code className="text-[11px] font-mono">/newbot</code>, tentukan nama bot (misal: <i>NOC RSUD NTB Bot</i>) dan username bot.
              </li>
              <li>
                Salin <b>HTTP API Token</b> yang diberikan lalu tempelkan ke kolom <b>Telegram Bot Token</b> di samping.
              </li>
              <li>
                Buat Grup Telegram NOC baru atau buka grup yang sudah ada, lalu <b>Tambahkan Bot Anda sebagai Anggota / Administrator</b> grup.
              </li>
              <li>
                Untuk mendapatkan <b>Chat ID Grup</b>, tambahkan bot{" "}
                <code className="text-[11px] font-mono">@userinfobot</code> atau{" "}
                <code className="text-[11px] font-mono">@RawDataBot</code> ke grup tersebut, atau forward pesan grup ke bot tersebut. ID grup Telegram diawali tanda minus (contoh:{" "}
                <code className="text-[11px] font-mono">-1002481928371</code>).
              </li>
              <li>
                Klik tombol <b>Kirim Pesan Tes</b> untuk mengonfirmasi bahwa bot dapat mengirim pesan dengan sukses.
              </li>
            </ol>
          </div>

          {/* Interactive Preview of Alert Messages */}
          <div className="card bg-base-100 border border-base-300 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-base-200 pb-2">
              <div className="flex items-center gap-2">
                <FaInfoCircle className="text-primary text-xs" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-base-content">
                  Simulasi Tampilan Pesan Telegram
                </h3>
              </div>
            </div>

            {/* Segmented Tabs */}
            <div className="flex items-center gap-1 p-1 bg-base-200 rounded-lg text-[11px]">
              <button
                type="button"
                onClick={() => setPreviewTab("device_down")}
                className={`flex-1 py-1 px-2 rounded-md font-medium transition-all text-center ${
                  previewTab === "device_down"
                    ? "bg-base-100 text-rose-500 shadow-xs font-bold"
                    : "text-base-content/70 hover:text-base-content"
                }`}
              >
                🚨 Down
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab("device_up")}
                className={`flex-1 py-1 px-2 rounded-md font-medium transition-all text-center ${
                  previewTab === "device_up"
                    ? "bg-base-100 text-emerald-500 shadow-xs font-bold"
                    : "text-base-content/70 hover:text-base-content"
                }`}
              >
                ✅ Pulih
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab("vpn_online")}
                className={`flex-1 py-1 px-2 rounded-md font-medium transition-all text-center ${
                  previewTab === "vpn_online"
                    ? "bg-base-100 text-sky-500 shadow-xs font-bold"
                    : "text-base-content/70 hover:text-base-content"
                }`}
              >
                🛡️ VPN In
              </button>
              <button
                type="button"
                onClick={() => setPreviewTab("vpn_offline")}
                className={`flex-1 py-1 px-2 rounded-md font-medium transition-all text-center ${
                  previewTab === "vpn_offline"
                    ? "bg-base-100 text-amber-500 shadow-xs font-bold"
                    : "text-base-content/70 hover:text-base-content"
                }`}
              >
                🔌 VPN Out
              </button>
            </div>

            {/* Telegram Bubble Mockup */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 font-sans text-xs shadow-inner space-y-2 leading-relaxed">
              {previewTab === "device_down" && (
                <>
                  <div className="font-bold text-rose-400 flex items-center gap-1.5">
                    <span>🚨</span> [ALERT] PERANGKAT JARINGAN DOWN
                  </div>
                  <div className="text-[11px] text-slate-400">🏥 RSUD NTB NOC TELEMETRY</div>
                  <div className="border-t border-slate-800 my-1"></div>
                  <div>📦 <b>Perangkat:</b> SW-ACCESS-LANTAI-3</div>
                  <div>🏷️ <b>Tipe:</b> Switch Managed (Ruijie Networks RG-NBS3100-24GT4SFP)</div>
                  <div>🌐 <b>IP Address:</b> <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-300 font-mono">10.9.2.45</code></div>
                  <div>📍 <b>Lokasi:</b> Gedung Rawat Inap Lt. 3</div>
                  <div className="text-amber-300">⚠️ <b>Kondisi:</b> Host Unreachable (ICMP Ping & SNMP Timeout)</div>
                  <div>⏰ <b>Waktu Deteksi:</b> 22 Okt 2026, 10:45:12 WITA</div>
                  <div className="border-t border-slate-800 my-1"></div>
                  <div className="text-[10px] text-slate-400 italic">
                    Harap segera periksa koneksi kabel, power adaptor, atau status uplink switch.
                  </div>
                </>
              )}

              {previewTab === "device_up" && (
                <>
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>✅</span> [RECOVERED] PERANGKAT JARINGAN PULIH
                  </div>
                  <div className="text-[11px] text-slate-400">🏥 RSUD NTB NOC TELEMETRY</div>
                  <div className="border-t border-slate-800 my-1"></div>
                  <div>📦 <b>Perangkat:</b> SW-ACCESS-LANTAI-3</div>
                  <div>🏷️ <b>Tipe:</b> Switch Managed</div>
                  <div>🌐 <b>IP Address:</b> <code className="bg-slate-800 px-1 py-0.5 rounded text-sky-300 font-mono">10.9.2.45</code></div>
                  <div>📍 <b>Lokasi:</b> Gedung Rawat Inap Lt. 3</div>
                  <div>⏱️ <b>Uptime:</b> <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-emerald-300">0d 00:04:18</code></div>
                  <div className="text-emerald-300">🟢 <b>Status Sekarang:</b> UP / Online Normal (Ping & SNMP Aktif)</div>
                  <div>⏰ <b>Waktu Pulih:</b> 22 Okt 2026, 10:52:05 WITA</div>
                  <div className="border-t border-slate-800 my-1"></div>
                  <div className="text-[10px] text-slate-400 italic">
                    Perangkat telah terhubung kembali dan telemetri termonitor normal.
                  </div>
                </>
              )}

              {previewTab === "vpn_online" && (
                <>
                  <div className="font-bold text-sky-400 flex items-center gap-1.5">
                    <span>🛡️</span> [VPN ONLINE] PENGGUNA TERHUBUNG
                  </div>
                  <div className="text-[11px] text-slate-400">🏥 RSUD NTB VPN ACCESS GATEWAY</div>
                  <div className="border-t border-slate-800 my-1"></div>
                  <div>👤 <b>Pengguna:</b> <b>dr. Budi Santoso, Sp.A</b></div>
                  <div>🏢 <b>Unit / Ruangan:</b> Instalasi Rawat Inap Anak</div>
                  <div>⚡ <b>Protokol:</b> <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-sky-300">WireGuard</code></div>
                  <div>🌐 <b>IP VPN Terdistribusi:</b> <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-emerald-300">10.9.3.220</code></div>
                  <div>🖥️ <b>Server Gateway:</b> CCR1009-RSUD (10.9.1.3)</div>
                  <div>📍 <b>Client Endpoint:</b> <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-slate-300">182.253.12.98:51820</code></div>
                  <div>⏰ <b>Waktu Terhubung:</b> 22 Okt 2026, 11:15:30 WITA</div>
                  <div className="border-t border-slate-800 my-1"></div>
                  <div className="text-[10px] text-slate-400 italic">
                    Sesi VPN aktif dan enkripsi tunnel berjalan lancar.
                  </div>
                </>
              )}

              {previewTab === "vpn_offline" && (
                <>
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <span>🔌</span> [VPN OFFLINE] PENGGUNA TERPUTUS
                  </div>
                  <div className="text-[11px] text-slate-400">🏥 RSUD NTB VPN ACCESS GATEWAY</div>
                  <div className="border-t border-slate-800 my-1"></div>
                  <div>👤 <b>Pengguna:</b> <b>dr. Budi Santoso, Sp.A</b></div>
                  <div>⚡ <b>Protokol:</b> <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-sky-300">WireGuard</code></div>
                  <div>🌐 <b>IP VPN Terakhir:</b> <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-slate-300">10.9.3.220</code></div>
                  <div>⏱️ <b>Durasi Online:</b> <code className="bg-slate-800 px-1 py-0.5 rounded font-mono text-amber-300">1j 42m 15d</code></div>
                  <div>📊 <b>Pemakaian Data:</b> ⬇️ 42.15 MB | ⬆️ 12.80 MB</div>
                  <div>ℹ️ <b>Alasan Putus:</b> <i>Handshake Idle Timeout (&gt;15 menit)</i></div>
                  <div>⏰ <b>Waktu Sesi Berakhir:</b> 22 Okt 2026, 12:57:45 WITA</div>
                  <div className="border-t border-slate-800 my-1"></div>
                  <div className="text-[10px] text-slate-400 italic">
                    Sesi koneksi telah ditutup dan dialokasikan kembali.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
