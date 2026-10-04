"use client";

import ActiveLink from "./ActiveLink";
import { useSession } from "next-auth/react";

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197" />
  </svg>
);

const GroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ListIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const OnlineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.556C11.332 13.335 12.668 13.335 15.889 16.556m-11.778-3.535C9.553 10.579 14.447 10.579 17.667 13.021M2.556 9.486c4.667-4.667 11.333-4.667 16 0" />
  </svg>
);

const HotspotIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.556c3.221-3.221 4.557-3.221 7.778 0M5.333 13.021c5.037-5.037 10.297-5.037 15.334 0m-18.667-3.535c6.667-6.667 15.333-6.667 22 0M12 19h.01" />
  </svg>
);

const VPNIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const PoolIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3zm0 5h16m-9 5h2" />
  </svg>
);

const RouterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const HelpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AuditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default function Sidebar() {
  const { data: session } = useSession();
  const isSuperAdmin = (session?.user as any)?.role === "superadmin";

  return (
    <ul className="menu p-4 w-60 min-h-full bg-gray-800 text-gray-200">
      <li className="menu-title text-white">Menu</li>

      <li>
        <ActiveLink href="/">
          <HomeIcon />
          Dashboard
        </ActiveLink>
      </li>
      <li>
        <details open>
          <summary>
            <UsersIcon />
            Management User
          </summary>
          <ul className="menu-dropdown">
            <li>
              <ActiveLink href="/radius-users/type/hotspot">
                <ListIcon />
                User Hotspot
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/radius-users/type/vpn">
                <ListIcon />
                User VPN
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/radius-users/create/hotspot">
                <HotspotIcon />
                Tambah Hotspot
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/radius-users/create/vpn">
                <VPNIcon />
                Tambah VPN
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/radius-users/online/hotspot">
                <OnlineIcon />
                Online Hotspot
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/radius-users/online/vpn">
                <OnlineIcon />
                Online VPN
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/vpn-wireguard">
                <VPNIcon />
                VPN Wireguard
              </ActiveLink>
            </li>
            </ul>
            </details>
            </li>

            <li>
            <details open>
            <summary>
            <GroupIcon />
            Management Grup
            </summary>
            <ul className="menu-dropdown">
            <li>
              <ActiveLink href="/radius-groups/hotspot">
                <HotspotIcon />
                Grup Hotspot
              </ActiveLink>
            </li>
            <li>
              <ActiveLink href="/radius-groups/vpn">
                <VPNIcon />
                Grup VPN
              </ActiveLink>
            </li>
            </ul>
            </details>
            </li>

            <li>
            <details open>
            <summary>
            <PoolIcon />
            IP Management
            </summary>
            <ul className="menu-dropdown">
            <li>
            <ActiveLink href="/radius-pools">
            <PoolIcon />
            IP Pools
            </ActiveLink>
            </li>

            {isSuperAdmin && (
              <li>
                <ActiveLink href="/nas">
                  <RouterIcon />
                  Manajemen Perangkat
                </ActiveLink>
              </li>
            )}
            </ul>
            </details>
            </li>

            <li>
            <ActiveLink href="/reports">
            <ReportIcon />
            Laporan
            </ActiveLink>
            </li>

            {isSuperAdmin && (
            <li>
            <ActiveLink href="/audit-log">
            <AuditIcon />
            Audit Log
            </ActiveLink>
            </li>
            )}

            <li>
            <ActiveLink href="/wifi">
            <HotspotIcon />
            Wifi RSUD NTB
            </ActiveLink>
            </li>

            <li>
            <ActiveLink href="/help">
            <HelpIcon />
            Bantuan
            </ActiveLink>
            </li>

            <li>
            <details>
            <summary>Pengaturan</summary>
            <ul className="menu-dropdown">
            <li>
              <ActiveLink href="/settings/admin">Profil Admin</ActiveLink>
            </li>
            {isSuperAdmin && (
              <li>
                <ActiveLink href="/settings/mikrotik">Koneksi Mikrotik</ActiveLink>
              </li>
            )}
            {isSuperAdmin && (
              <li>
                <ActiveLink href="/settings/admin/manage">Daftar Admin</ActiveLink>
              </li>
            )}
            </ul>
            </details>
            </li>
            </ul>
            );
            }