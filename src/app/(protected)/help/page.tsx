"use client";

import { 
  FaUserCog, FaShieldAlt, FaWifi, FaUsers, 
  FaChartBar, FaKey, FaQuestionCircle,
  FaCheckCircle, FaExclamationTriangle,
  FaServer, FaCogs, FaBookOpen, FaUserTie,
  FaHospital, FaCalendarAlt, FaLightbulb, FaHeart,
  FaRocket, FaCodeBranch
} from "react-icons/fa";

export default function HelpPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl space-y-10 animate-fade-in">
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl bg-[#131b2e] border border-primary/20 p-8 md:p-12 shadow-2xl backdrop-blur-md">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary uppercase tracking-wider">
            <FaBookOpen className="text-cyan-400" />
            <span>Pusat Bantuan & Dokumentasi Sistem</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-base-content flex flex-wrap items-center gap-4">
            Pusat Bantuan <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">BeeRadius</span>
          </h1>
          
          <p className="text-base md:text-lg opacity-80 max-w-3xl leading-relaxed">
            Panduan komprehensif langkah demi langkah untuk mengelola autentikasi RADIUS, limitasi bandwidth, pemantauan sesi aktif, dan integrasi router di lingkungan RSUD Provinsi NTB.
          </p>
        </div>
        <FaQuestionCircle className="absolute -bottom-8 -right-8 text-primary/5 text-[220px] rotate-12 pointer-events-none select-none" />
      </div>

      {/* Profil Pengembang & Latar Belakang Pembuatan */}
      <section className="rounded-3xl bg-[#131b2e] border border-primary/20 p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
          <div className="space-y-4 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              <FaLightbulb />
              <span>Tentang Pengembang & Riwayat Sistem</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-base-content tracking-tight">
              Kisah di Balik <span className="text-cyan-400">BeeRadius</span>
            </h2>

            <p className="text-sm md:text-base opacity-85 leading-relaxed text-justify">
              Aplikasi <strong>BeeRadius</strong> dikembangkan secara khusus oleh <strong>Feldy Novanda Mulkan</strong> pada <strong>Oktober 2025</strong>. 
              Inisiatif pembangunan sistem ini berawal dari keresahan dan tantangan nyata dalam mengelola ribuan akun pengguna 
              <strong> Hotspot</strong> dan koneksi <strong>VPN</strong> di lingkungan <strong>RSUD Provinsi NTB</strong>. 
              Sebelum kehadiran sistem ini, pengelolaan akun jaringan dan pemantauan sesi aktif yang dilakukan secara manual atau terpisah 
              menimbulkan beban operasional, potensi inefisiensi, serta kendala sesi menggantung (<em>stale sessions</em>).
            </p>

            <p className="text-sm md:text-base opacity-85 leading-relaxed text-justify">
              BeeRadius hadir sebagai solusi terpusat (<em>unified single-pane-of-glass</em>) berbasis FreeRADIUS dan Next.js 15 
              yang menggabungkan manajemen kredensial, otomatisasi sinkronisasi atribut MikroTik, isolasi hak akses (RBAC), 
              serta telemetri jaringan berdensitas tinggi untuk memastikan seluruh layanan IT rumah sakit berjalan stabil dan handal.
            </p>
          </div>

          {/* Quick Facts Card */}
          <div className="w-full lg:w-80 shrink-0 bg-base-900/60 rounded-2xl border border-primary/10 p-5 space-y-4">
            <div className="text-xs uppercase tracking-wider font-bold text-primary/80 border-b border-primary/10 pb-2">
              Metadata Pembuatan
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary mt-0.5">
                  <FaUserTie className="text-sm" />
                </div>
                <div>
                  <div className="opacity-60 text-[11px]">Pengembang Utama</div>
                  <div className="font-bold text-sm text-base-content">Feldy Novanda Mulkan</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 mt-0.5">
                  <FaCalendarAlt className="text-sm" />
                </div>
                <div>
                  <div className="opacity-60 text-[11px]">Waktu Rilis Perdana</div>
                  <div className="font-bold text-sm text-base-content">Oktober 2025</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 mt-0.5">
                  <FaHospital className="text-sm" />
                </div>
                <div>
                  <div className="opacity-60 text-[11px]">Institusi Implementasi</div>
                  <div className="font-bold text-sm text-base-content">RSUD Provinsi NTB</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 mt-0.5">
                  <FaRocket className="text-sm" />
                </div>
                <div>
                  <div className="opacity-60 text-[11px]">Fokus Solusi</div>
                  <div className="font-semibold text-base-content">Hotspot & VPN RSUD NTB</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-primary/10">
              <div className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400 font-mono">
                <FaCodeBranch />
                <span>Next.js 15 • FreeRADIUS • Prisma</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorial Lengkap Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3 border-b border-primary/20 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-primary uppercase tracking-wider flex items-center gap-2">
            <FaBookOpen /> Tutorial Penggunaan Sistem
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Step 1: User Management */}
          <div className="card bg-[#131b2e] border border-primary/10 hover:border-primary/30 transition-all duration-300 shadow-xl">
            <div className="card-body p-6">
              <div className="badge badge-primary font-bold text-xs tracking-wider mb-2">LANGKAH 1</div>
              <h3 className="card-title flex items-center gap-2 text-primary text-lg">
                <FaUserCog /> Manajemen Pengguna
              </h3>
              <div className="divider my-1 opacity-20"></div>
              <ul className="steps steps-vertical space-y-4">
                <li className="step step-primary text-left">
                  <div className="ml-3">
                    <p className="font-bold text-sm">Pilih Tipe User</p>
                    <p className="text-xs opacity-70">Pilih "Hotspot" untuk akses WiFi lokal atau "VPN" untuk akses jaringan internal dari luar.</p>
                  </div>
                </li>
                <li className="step step-primary text-left">
                  <div className="ml-3">
                    <p className="font-bold text-sm">Input Data User</p>
                    <p className="text-xs opacity-70">Masukkan Username, Password, dan tetapkan Grup profil bandwidth yang sesuai.</p>
                  </div>
                </li>
                <li className="step step-primary text-left">
                  <div className="ml-3">
                    <p className="font-bold text-sm">Aktivasi & Setup</p>
                    <p className="text-xs opacity-70">Untuk user VPN, buka halaman detail user untuk melihat panduan setup OS (Windows/Mac/Linux).</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 2: Group & Bandwidth */}
          <div className="card bg-[#131b2e] border border-secondary/15 hover:border-secondary/30 transition-all duration-300 shadow-xl">
            <div className="card-body p-6">
              <div className="badge badge-secondary font-bold text-xs tracking-wider mb-2">LANGKAH 2</div>
              <h3 className="card-title flex items-center gap-2 text-secondary text-lg">
                <FaUsers /> Grup & Limitasi Bandwidth
              </h3>
              <div className="divider my-1 opacity-20"></div>
              <ul className="steps steps-vertical space-y-4">
                <li className="step step-secondary text-left">
                  <div className="ml-3">
                    <p className="font-bold text-sm">Buat Profil Grup</p>
                    <p className="text-xs opacity-70">Tentukan nama grup (misal: "Staf_Medis_5M") dan tentukan jenis layanannya.</p>
                  </div>
                </li>
                <li className="step step-secondary text-left">
                  <div className="ml-3">
                    <p className="font-bold text-sm">Atur Rate Limit</p>
                    <p className="text-xs opacity-70">Konfigurasikan atribut 'Mikrotik-Rate-Limit' untuk mengatur kuota kecepatan (Upload/Download).</p>
                  </div>
                </li>
                <li className="step step-secondary text-left">
                  <div className="ml-3">
                    <p className="font-bold text-sm">Terapkan Kebijakan</p>
                    <p className="text-xs opacity-70">Grup akan langsung disinkronkan ke router MikroTik begitu user melakukan login pertama kali.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Step 3: Monitoring & Reports */}
          <div className="card bg-[#131b2e] border border-cyan-500/15 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
            <div className="card-body p-6">
              <div className="badge badge-accent font-bold text-xs tracking-wider mb-2">LANGKAH 3</div>
              <h3 className="card-title flex items-center gap-2 text-accent text-lg">
                <FaChartBar /> Monitoring & Telemetri
              </h3>
              <div className="divider my-1 opacity-20"></div>
              <ul className="steps steps-vertical space-y-4">
                <li className="step step-accent text-left">
                  <div className="ml-3">
                    <p className="font-bold text-sm">Pantau Online Users</p>
                    <p className="text-xs opacity-70">Periksa user aktif secara real-time dan bersihkan sesi gantung melalui "Clear Stale Sessions".</p>
                  </div>
                </li>
                <li className="step step-accent text-left">
                  <div className="ml-3">
                    <p className="font-bold text-sm">Analisis Statistik</p>
                    <p className="text-xs opacity-70">Buka menu "Laporan" untuk meninjau tren Rx/Tx, distribusi grup, dan metrik login gagal.</p>
                  </div>
                </li>
                <li className="step step-accent text-left">
                  <div className="ml-3">
                    <p className="font-bold text-sm">Audit Aktivitas</p>
                    <p className="text-xs opacity-70">Pantau catatan riwayat perubahan admin di "Audit Log" untuk transparansi operasional.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Penjelasan Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="collapse collapse-arrow bg-[#131b2e] border border-primary/10 shadow-lg">
          <input type="radio" name="my-accordion-2" defaultChecked /> 
          <div className="collapse-title text-lg font-bold flex items-center gap-3 text-orange-400">
            <FaWifi className="shrink-0" /> Bagaimana Cara Kerja Hotspot?
          </div>
          <div className="collapse-content space-y-3 text-sm opacity-85">
            <p>Sistem BeeRadius terhubung dengan <b>Captive Portal</b> MikroTik. Saat user terhubung ke SSID WiFi RSUD NTB:</p>
            <ol className="list-decimal list-inside space-y-1.5 opacity-90 pl-1">
              <li>Router MikroTik mengirimkan paket autentikasi RADIUS Access-Request ke server.</li>
              <li>BeeRadius memverifikasi kecocokan username dan kata sandi di database MySQL.</li>
              <li>Jika terverifikasi, server membalas dengan <i>Access-Accept</i> beserta atribut limitasi bandwidth.</li>
              <li>User langsung terhubung ke internet sesuai kebijakan grup profilnya.</li>
            </ol>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-[#131b2e] border border-primary/10 shadow-lg">
          <input type="radio" name="my-accordion-2" /> 
          <div className="collapse-title text-lg font-bold flex items-center gap-3 text-cyan-400">
            <FaShieldAlt className="shrink-0" /> Panduan Koneksi VPN
          </div>
          <div className="collapse-content space-y-3 text-sm opacity-85">
            <p>Akses VPN di BeeRadius mendukung protokol <b>L2TP/IPSec</b> (standar bawaan OS) untuk kemudahan akses remote staf dan dokter.</p>
            <div className="alert bg-cyan-950/40 border border-cyan-500/20 py-2.5 text-xs text-cyan-200">
              <FaCheckCircle className="shrink-0 text-cyan-400" />
              <span><b>Tips Setup:</b> Buka halaman detail user VPN bersangkutan untuk menyalin konfigurasi IP gateway, pre-shared key, serta panduan langkah per sistem operasi.</span>
            </div>
            <ul className="list-disc list-inside space-y-1.5 opacity-90 pl-1">
              <li><b>Windows:</b> Apabila koneksi gagal karena NAT traversal, terapkan penyesuaian registry sesuai panduan di halaman detail.</li>
              <li><b>macOS & iOS:</b> Pilih tipe L2TP over IPSec dengan menyertakan Secret Key institusi.</li>
              <li><b>Android:</b> Gunakan aplikasi strongSwan atau klien bawaan yang mendukung L2TP/IPSec PSK.</li>
            </ul>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-[#131b2e] border border-primary/10 shadow-lg">
          <input type="radio" name="my-accordion-2" /> 
          <div className="collapse-title text-lg font-bold flex items-center gap-3 text-purple-400">
            <FaServer className="shrink-0" /> Apa itu NAS (Network Access Server)?
          </div>
          <div className="collapse-content space-y-3 text-sm opacity-85">
            <p>NAS adalah perangkat gateway/router (seperti MikroTik CCR/RB) yang menjadi gerbang utama koneksi jaringan.</p>
            <div className="alert bg-amber-950/40 border border-amber-500/20 py-2.5 text-xs text-amber-200">
              <FaExclamationTriangle className="shrink-0 text-amber-400" />
              <span><b>Penting:</b> IP router MikroTik wajib terdaftar di menu <b>NAS</b> dengan *Shared Secret* yang sama, jika tidak server FreeRADIUS akan otomatis me-reject koneksi.</span>
            </div>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-[#131b2e] border border-primary/10 shadow-lg">
          <input type="radio" name="my-accordion-2" /> 
          <div className="collapse-title text-lg font-bold flex items-center gap-3 text-emerald-400">
            <FaCogs className="shrink-0" /> Atribut RADIUS Khusus
          </div>
          <div className="collapse-content space-y-3 text-sm opacity-85">
            <p>Contoh atribut RADIUS yang umum dikonfigurasikan pada menu Manajemen Grup:</p>
            <ul className="space-y-2 text-xs font-mono">
              <li className="bg-base-950/60 p-2.5 rounded-lg border border-primary/10">
                <span className="text-cyan-400">Mikrotik-Rate-Limit</span> = 5M/5M (Upload / Download)
              </li>
              <li className="bg-base-950/60 p-2.5 rounded-lg border border-primary/10">
                <span className="text-emerald-400">Session-Timeout</span> = 3600 (Logout otomatis setelah 1 jam)
              </li>
              <li className="bg-base-950/60 p-2.5 rounded-lg border border-primary/10">
                <span className="text-amber-400">Idle-Timeout</span> = 600 (Logout jika tidak ada lalu lintas data 10 menit)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Security Info Card */}
      <div className="card bg-[#131b2e] border border-primary/20 shadow-2xl overflow-hidden">
        <div className="card-body p-6 md:p-8">
          <h2 className="card-title text-xl md:text-2xl flex items-center gap-3 text-primary">
            <FaKey className="text-amber-400" /> Tips Keamanan & Penanganan Masalah
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-2.5 p-4 rounded-xl bg-base-900/40 border border-primary/10">
              <h3 className="font-bold text-emerald-400 text-base flex items-center gap-2">
                <FaCheckCircle className="text-xs" /> Kebijakan Kata Sandi
              </h3>
              <p className="text-xs md:text-sm opacity-80 leading-relaxed">
                Gunakan format sandi yang kuat untuk user VPN. Anda dapat menggunakan fitur 
                <b> Reveal Password</b> (ikon mata) pada form user saat verifikasi kredensial pengguna.
              </p>
            </div>
            <div className="space-y-2.5 p-4 rounded-xl bg-base-900/40 border border-primary/10">
              <h3 className="font-bold text-rose-400 text-base flex items-center gap-2">
                <FaExclamationTriangle className="text-xs" /> Sesi Menggantung (Stale Sessions)
              </h3>
              <p className="text-xs md:text-sm opacity-80 leading-relaxed">
                Jika user terputus mendadak atau perangkat mati tanpa notifikasi logout, sesi mungkin masih terdata aktif. 
                Gunakan tombol <b>Clear Stale Sessions</b> atau tombol <b>Disconnect</b> untuk melepas sesi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="pt-6 pb-8 border-t border-primary/10 text-center space-y-2">
        <div className="text-xs font-mono opacity-60 uppercase tracking-widest">
          SISTEM MANAJEMEN RADIUS • RSUD PROVINSI NTB
        </div>
        <div className="text-xs opacity-75 flex items-center justify-center gap-1.5 flex-wrap">
          <span>Dikembangkan oleh</span>
          <strong className="text-primary font-semibold">Feldy Novanda Mulkan</strong>
          <span>(Oktober 2025)</span>
          <span>• Dibuat dengan</span>
          <FaHeart className="text-rose-500 inline text-[10px]" />
          <span>untuk keandalan jaringan rumah sakit.</span>
        </div>
      </div>
    </div>
  );
}
