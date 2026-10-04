"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const name = session?.user?.name || "Admin";
  const role = (session?.user as any)?.role as string | undefined;

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 h-16 px-4 lg:px-8 bg-base-200/80 backdrop-blur-xl border-b border-primary/10">
      <label htmlFor="my-drawer-2" className="btn btn-ghost btn-square btn-sm lg:hidden" aria-label="Buka menu">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </label>

      <Link href="/" className="lg:hidden font-semibold tracking-tight">BeeRadius</Link>

      <div className="flex-1" />

      <ThemeToggle />

      <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-500/10 border border-emerald-500/30 rounded px-2 py-1">
        <span className="status-dot" />
        FreeRADIUS Online
      </div>

      {session?.user && (
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-primary/5 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-linear-to-br from-primary to-secondary text-white flex items-center justify-center text-sm font-semibold">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-medium">{name}</p>
              {role && <p className="text-[10px] uppercase tracking-wider text-slate-500 font-mono">{role}</p>}
            </div>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-10 p-2 w-52 rounded-box shadow-xl">
            <li><Link href="/settings/admin">Profil &amp; Pengaturan</Link></li>
            <li><button onClick={() => signOut({ callbackUrl: "/login" })}>Keluar</button></li>
          </ul>
        </div>
      )}
    </header>
  );
}