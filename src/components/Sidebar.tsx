"use client";

import ActiveLink from "./ActiveLink";
import ThemeToggle from "./ThemeToggle";
import { useSession } from "next-auth/react";
import {
  FaHome,
  FaUsers,
  FaWifi,
  FaShieldAlt,
  FaUserPlus,
  FaLayerGroup,
  FaNetworkWired,
  FaServer,
  FaChartBar,
  FaHistory,
  FaQuestionCircle,
  FaCog,
  FaUserShield,
  FaProjectDiagram,
} from "react-icons/fa";
import type { ReactNode } from "react";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="px-3 pb-1 text-[10px] font-semibold tracking-[0.08em] uppercase text-slate-500 font-mono">
        {title}
      </p>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}

const icon = "h-4 w-4 shrink-0";

export default function Sidebar() {
  const { data: session } = useSession();
  const isSuperAdmin = (session?.user as any)?.role === "superadmin";

  return (
    <aside className="flex flex-col w-64 min-h-full bg-base-100/90 backdrop-blur-xl border-r border-primary/10 p-4 gap-6">
      <div className="flex items-center gap-3 px-2 pt-1">
        <div className="h-9 w-9 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white shadow-[0_0_16px_rgba(56,189,248,0.35)]">
          <FaNetworkWired className="h-4 w-4" />
        </div>
        <div className="leading-tight">
          <p className="font-semibold tracking-tight">BeeRadius</p>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">RSUD NTB</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto">
        <Section title="Utama">
          <li><ActiveLink href="/"><FaHome className={icon} />Dashboard</ActiveLink></li>
          <li><ActiveLink href="/reports"><FaChartBar className={icon} />Laporan</ActiveLink></li>
        </Section>

        <Section title="Pengguna">
          <li><ActiveLink href="/radius-users/type/hotspot"><FaWifi className={icon} />User Hotspot</ActiveLink></li>
          <li><ActiveLink href="/radius-users/type/vpn"><FaShieldAlt className={icon} />User VPN</ActiveLink></li>
          <li><ActiveLink href="/radius-users/online/hotspot"><FaUsers className={icon} />Online Hotspot</ActiveLink></li>
          <li><ActiveLink href="/radius-users/online/vpn"><FaUsers className={icon} />Online VPN</ActiveLink></li>
          <li><ActiveLink href="/radius-users/create/hotspot"><FaUserPlus className={icon} />Tambah Hotspot</ActiveLink></li>
          <li><ActiveLink href="/radius-users/create/vpn"><FaUserPlus className={icon} />Tambah VPN</ActiveLink></li>
        </Section>

        <Section title="Jaringan">
          <li><ActiveLink href="/radius-groups/hotspot"><FaLayerGroup className={icon} />Grup Hotspot</ActiveLink></li>
          <li><ActiveLink href="/radius-groups/vpn"><FaLayerGroup className={icon} />Grup VPN</ActiveLink></li>
          <li><ActiveLink href="/radius-pools"><FaNetworkWired className={icon} />IP Pools</ActiveLink></li>
          <li><ActiveLink href="/switches"><FaNetworkWired className={icon} />Switch &amp; VLAN</ActiveLink></li>
          <li><ActiveLink href="/topology"><FaProjectDiagram className={icon} />Topologi Jaringan</ActiveLink></li>
          {isSuperAdmin && (
            <li><ActiveLink href="/nas"><FaServer className={icon} />Perangkat</ActiveLink></li>
          )}
          <li><ActiveLink href="/wifi"><FaWifi className={icon} />WiFi RSUD NTB</ActiveLink></li>
        </Section>

        <Section title="Sistem">
          {isSuperAdmin && (
            <li><ActiveLink href="/audit-log"><FaHistory className={icon} />Audit Log</ActiveLink></li>
          )}
          <li><ActiveLink href="/settings/admin"><FaCog className={icon} />Profil Admin</ActiveLink></li>
          {isSuperAdmin && (
            <li><ActiveLink href="/settings/mikrotik"><FaServer className={icon} />Koneksi MikroTik</ActiveLink></li>
          )}
          {isSuperAdmin && (
            <li><ActiveLink href="/settings/admin/manage"><FaUserShield className={icon} />Daftar Admin</ActiveLink></li>
          )}
          <li><ActiveLink href="/help"><FaQuestionCircle className={icon} />Bantuan</ActiveLink></li>
        </Section>
      </nav>

      <div className="pt-3 border-t border-primary/10 flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Tampilan</span>
        <ThemeToggle />
      </div>
    </aside>
  );
}