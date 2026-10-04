"use client";

import { 
  FaUserCog, FaShieldAlt, FaWifi, FaUsers, 
  FaChartBar, FaKey, FaQuestionCircle,
  FaCheckCircle, FaExclamationTriangle,
  FaServer, FaCogs, FaBookOpen
} from "react-icons/fa";

export default function HelpPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-6xl space-y-12 animate-fade-in">
      {/* Hero Header */}
      <div className="bg-primary text-primary-content rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-4">
            <FaBookOpen className="text-accent" /> Pusat Bantuan BeeRadius
          </h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Panduan lengkap langkah demi langkah untuk mengelola infrastruktur RADIUS Anda dengan efisien.
          </p>
        </div>
        <FaQuestionCircle className="absolute -bottom-10 -right-10 text-white/10 text-[250px] rotate-12" />
      </div>

      {/* Tutorial Lengkap Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3 border-b-2 border-primary pb-2">
            <h2 className="text-2xl font-bold text-primary uppercase tracking-wider">Tutorial Penggunaan</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Step 1: User Management */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                    <div className="badge badge-primary font-bold mb-2">LANGKAH 1</div>
                    <h3 className="card-title flex items-center gap-2 text-primary">
                        <FaUserCog /> Manajemen Pengguna
                    </h3>
                    <div className="divider my-1"></div>
                    <ul className="steps steps-vertical space-y-4">
                        <li className="step step-primary text-left">
                            <div className="ml-4">
                                <p className="font-bold">Pilih Tipe User</p>
                                <p className="text-xs opacity-60">Pilih "Hotspot" untuk akses WiFi biasa atau "VPN" untuk akses jaringan internal.</p>
                            </div>
                        </li>
                        <li className="step step-primary text-left">
                            <div className="ml-4">
                                <p className="font-bold">Input Data User</p>
                                <p className="text-xs opacity-60">Masukkan Username, Password, dan pilih Grup yang sesuai dengan limitasi yang diinginkan.</p>
                            </div>
                        </li>
                        <li className="step step-primary text-left">
                            <div className="ml-4">
                                <p className="font-bold">Aktivasi & Setup</p>
                                <p className="text-xs opacity-60">Untuk VPN, buka halaman detail user untuk melihat panduan setup manual (Windows/Mac/Linux).</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Step 2: Group & Bandwidth */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                    <div className="badge badge-secondary font-bold mb-2">LANGKAH 2</div>
                    <h3 className="card-title flex items-center gap-2 text-secondary">
                        <FaUsers /> Grup & Limitasi
                    </h3>
                    <div className="divider my-1"></div>
                    <ul className="steps steps-vertical space-y-4">
                        <li className="step step-secondary text-left">
                            <div className="ml-4">
                                <p className="font-bold">Buat Profil Grup</p>
                                <p className="text-xs opacity-60">Tentukan nama grup (misal: "Staf_5Mbps") dan tipe layanannya.</p>
                            </div>
                        </li>
                        <li className="step step-secondary text-left">
                            <div className="ml-4">
                                <p className="font-bold">Atur Bandwidth</p>
                                <p className="text-xs opacity-60">Gunakan atribut 'Mikrotik-Rate-Limit' untuk mengatur kecepatan (Upload/Download).</p>
                            </div>
                        </li>
                        <li className="step step-secondary text-left">
                            <div className="ml-4">
                                <p className="font-bold">Assign User</p>
                                <p className="text-xs opacity-60">Masukkan user ke dalam grup ini agar kebijakan limitasi otomatis diterapkan oleh router.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Step 3: Monitoring & Reports */}
            <div className="card bg-base-100 shadow-xl border border-base-200">
                <div className="card-body">
                    <div className="badge badge-accent font-bold mb-2">LANGKAH 3</div>
                    <h3 className="card-title flex items-center gap-2 text-accent">
                        <FaChartBar /> Monitoring & Laporan
                    </h3>
                    <div className="divider my-1"></div>
                    <ul className="steps steps-vertical space-y-4">
                        <li className="step step-accent text-left">
                            <div className="ml-4">
                                <p className="font-bold">Cek Status Online</p>
                                <p className="text-xs opacity-60">Lihat siapa saja yang sedang terkoneksi di menu "Online Users".</p>
                            </div>
                        </li>
                        <li className="step step-accent text-left">
                            <div className="ml-4">
                                <p className="font-bold">Analisis Statistik</p>
                                <p className="text-xs opacity-60">Buka menu "Laporan" untuk melihat tren bandwidth harian/bulanan.</p>
                            </div>
                        </li>
                        <li className="step step-accent text-left">
                            <div className="ml-4">
                                <p className="font-bold">Audit Aktivitas</p>
                                <p className="text-xs opacity-60">Pantau log login dan percobaan gagal untuk mendeteksi masalah koneksi user.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* Detail Penjelasan Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="collapse collapse-arrow bg-base-200 shadow-sm border border-base-300">
            <input type="radio" name="my-accordion-2" defaultChecked /> 
            <div className="collapse-title text-xl font-bold flex items-center gap-3">
                <FaWifi className="text-orange-500" /> Bagaimana Cara Kerja Hotspot?
            </div>
            <div className="collapse-content space-y-3 text-sm">
                <p>Sistem BeeRadius terhubung dengan <b>Captive Portal</b> MikroTik. Saat user terhubung ke WiFi:</p>
                <ol className="list-decimal list-inside space-y-1 opacity-80">
                    <li>MikroTik meminta verifikasi ke server RADIUS.</li>
                    <li>Sistem mengecek kecocokan username dan password di database.</li>
                    <li>Jika cocok, RADIUS mengirimkan balasan <i>Access-Accept</i> beserta profil bandwidthnya.</li>
                    <li>User diizinkan berinternet sesuai limitasi grupnya.</li>
                </ol>
            </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200 shadow-sm border border-base-300">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-bold flex items-center gap-3">
                <FaShieldAlt className="text-blue-500" /> Panduan Khusus VPN
            </div>
            <div className="collapse-content space-y-3 text-sm">
                <p>Akses VPN di BeeRadius menggunakan protokol <b>L2TP/IPSec</b> (Standard) dan <b>WireGuard</b> (Modern).</p>
                <div className="alert alert-info py-2 text-xs">
                    <FaCheckCircle /> <b>Penting:</b> Fitur WireGuard membutuhkan MikroTik dengan <b>RouterOS v7.1 ke atas</b>. Jika router Anda versi 6, gunakan L2TP/IPSec.
                </div>
                <ul className="list-disc list-inside space-y-2 opacity-80">
                    <li><b>Windows User (L2TP):</b> Harus menjalankan script REGISTRY yang tersedia di halaman detail user jika koneksi gagal (NAT Traversal).</li>
                    <li><b>WireGuard:</b> Lebih cepat dan stabil, namun pastikan port WireGuard sudah di-<i>allow</i> di firewall router.</li>
                    <li><b>Detail User:</b> Klik tombol "Detail" pada daftar user VPN untuk melihat panduan setup visual per sistem operasi.</li>
                </ul>
            </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200 shadow-sm border border-base-300">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-bold flex items-center gap-3">
                <FaServer className="text-purple-500" /> Apa itu NAS (Network Access Server)?
            </div>
            <div className="collapse-content space-y-3 text-sm">
                <p>NAS adalah perangkat router (seperti MikroTik) yang menjadi pintu masuk bagi user.</p>
                <div className="alert alert-warning py-2 text-xs">
                    <FaExclamationTriangle /> Tanpa mendaftarkan IP MikroTik ke dalam menu <b>NAS</b>, server RADIUS akan menolak semua permintaan autentikasi dari router tersebut meskipun data user sudah benar.
                </div>
            </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200 shadow-sm border border-base-300">
            <input type="radio" name="my-accordion-2" /> 
            <div className="collapse-title text-xl font-bold flex items-center gap-3">
                <FaCogs className="text-info" /> Atribut Radius Khusus
            </div>
            <div className="collapse-content space-y-3 text-sm">
                <p>Gunakan atribut berikut di menu Manajemen Grup untuk kontrol lebih dalam:</p>
                <ul className="space-y-2 text-xs font-mono">
                    <li className="bg-base-300 p-2 rounded">Mikrotik-Rate-Limit = 5M/5M</li>
                    <li className="bg-base-300 p-2 rounded">Session-Timeout = 3600 (User logout otomatis dalam 1 jam)</li>
                    <li className="bg-base-300 p-2 rounded">Idle-Timeout = 600 (Logout jika tidak ada aktifitas selama 10 menit)</li>
                </ul>
            </div>
        </div>
      </div>

      {/* Security Info Card */}
      <div className="card bg-neutral text-neutral-content shadow-2xl">
        <div className="card-body">
          <h2 className="card-title text-2xl flex items-center gap-3">
            <FaKey className="text-warning" /> Tips Keamanan & Troubleshooting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div className="space-y-3">
              <h3 className="font-bold text-success text-lg">Manajemen Password</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Selalu gunakan metode <b>Cleartext-Password</b> untuk kemudahan integrasi dengan MikroTik. 
                Gunakan fitur <b>Reveal Password</b> (ikon mata) pada form user jika Anda lupa password yang telah dibuat.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-error text-lg">Koneksi Terputus?</h3>
              <p className="text-sm opacity-80 leading-relaxed">
                Jika user melaporkan tidak bisa login padahal username benar, cek menu <b>Online Users</b>. 
                Terkadang sesi user masih "menggantung" di router. Gunakan tombol <b>Disconnect</b> untuk mereset sesi tersebut.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="divider opacity-50">SISTEM MANAJEMEN RADIUS v1.0</div>
      <div className="text-center text-xs opacity-50 pb-10">
        Dikembangkan khusus untuk infrastruktur IT RSUD Provinsi NTB.
      </div>
    </div>
  );
}
