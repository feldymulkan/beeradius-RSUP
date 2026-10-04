"use client";

import { FaWindows, FaApple, FaLinux } from "react-icons/fa";

type Props = {
  username: string;
  password?: string;
};

export default function VpnConfigScripts({ username, password = "" }: Props) {
  const dns = "remote.rsudntb.id";
  const psk = "12345";

  return (
    <div className="space-y-6 mt-8">
      <div className="divider text-primary font-bold uppercase tracking-wider text-sm">Panduan Konfigurasi Manual VPN (L2TP/IPSec)</div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Windows Section */}
        <div className="card bg-base-200 shadow-sm border border-info/20">
          <div className="card-body p-5">
            <h3 className="card-title text-md flex items-center gap-2 mb-2 text-info">
              <FaWindows /> Windows 10 / 11
            </h3>
            <ol className="text-xs space-y-2 list-decimal list-inside opacity-90">
              <li>Buka <b>Settings</b> &gt; <b>Network & Internet</b> &gt; <b>VPN</b>.</li>
              <li>Klik <b>Add a VPN connection</b>.</li>
              <li><b>VPN Provider:</b> Windows (built-in).</li>
              <li><b>Connection name:</b> RSUD-VPN.</li>
              <li><b>Server name or address:</b> <code className="text-primary font-bold">{dns}</code></li>
              <li><b>VPN type:</b> L2TP/IPsec with pre-shared key.</li>
              <li><b>Pre-shared key:</b> <code className="text-primary font-bold">{psk}</code></li>
              <li><b>Username:</b> <code className="text-success font-bold">{username}</code></li>
              <li><b>Password:</b> <code className="text-success font-bold">{password}</code></li>
              <li>Simpan dan klik <b>Connect</b> pada daftar VPN.</li>
            </ol>
          </div>
        </div>

        {/* macOS Section */}
        <div className="card bg-base-200 shadow-sm border border-neutral/20">
          <div className="card-body p-5">
            <h3 className="card-title text-md flex items-center gap-2 mb-2 text-neutral-content">
              <FaApple /> macOS
            </h3>
            <ol className="text-xs space-y-2 list-decimal list-inside opacity-90">
              <li>Buka <b>System Settings</b> &gt; <b>Network</b>.</li>
              <li>Klik ikon <b>(...)</b> atau <b>Add Service</b> di pojok kanan bawah.</li>
              <li><b>Interface:</b> VPN, <b>VPN Type:</b> L2TP over IPSec.</li>
              <li><b>Service Name:</b> RSUD-VPN.</li>
              <li><b>Server Address:</b> <code className="text-primary font-bold">{dns}</code></li>
              <li><b>Account Name:</b> <code className="text-success font-bold">{username}</code></li>
              <li>Klik <b>Authentication Settings</b>:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li><b>Password:</b> <code className="text-success font-bold">{password}</code></li>
                  <li><b>Shared Secret:</b> <code className="text-primary font-bold">{psk}</code></li>
                </ul>
              </li>
              <li>Klik <b>Apply</b> lalu <b>Connect</b>.</li>
            </ol>
          </div>
        </div>

        {/* Linux Section */}
        <div className="card bg-base-200 shadow-sm border border-success/20">
          <div className="card-body p-5">
            <h3 className="card-title text-md flex items-center gap-2 mb-2 text-success">
              <FaLinux /> Linux (Ubuntu/Debian)
            </h3>
            <ol className="text-xs space-y-2 list-decimal list-inside opacity-90">
              <li>Instal l2tp: <code className="bg-black p-1 rounded text-[10px]">sudo apt install network-manager-l2tp-gnome</code></li>
              <li>Buka <b>Network Settings</b> &gt; Klik <b>(+)</b> pada VPN.</li>
              <li>Pilih <b>Layer 2 Tunneling Protocol (L2TP)</b>.</li>
              <li><b>Name:</b> RSUD-VPN, <b>Gateway:</b> <code className="text-primary font-bold">{dns}</code></li>
              <li><b>User name:</b> <code className="text-success font-bold">{username}</code></li>
              <li>Klik <b>IPsec Settings</b>:
                <ul className="list-disc list-inside ml-4 mt-1">
                  <li>Centang <b>Enable IPsec tunnel</b>.</li>
                  <li><b>Pre-shared key:</b> <code className="text-primary font-bold">{psk}</code></li>
                </ul>
              </li>
              <li>Simpan dan aktifkan VPN.</li>
            </ol>
          </div>
        </div>

      </div>

      <div className="alert alert-info shadow-sm py-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <div>
          <h3 className="font-bold text-xs uppercase">Catatan Penting (Windows)</h3>
          <p className="text-[10px]">Jika koneksi gagal, pastikan fitur <b>Split Tunneling</b> diaktifkan atau restart komputer untuk memastikan perubahan registry NAT Traversal aktif secara otomatis oleh sistem.</p>
        </div>
      </div>
    </div>
  );
}
