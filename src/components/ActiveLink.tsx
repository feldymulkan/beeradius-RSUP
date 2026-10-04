"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LinkProps } from "next/link";
import type { ReactNode } from "react";

type ActiveLinkProps = LinkProps & {
  children: ReactNode;
};

export default function ActiveLink({ href, children, ...rest }: ActiveLinkProps) {
  const pathname = usePathname();
  const target = href.toString();
  const isActive = target === "/" ? pathname === "/" : pathname === target || pathname.startsWith(`${target}/`);

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all border-l-2 ${
        isActive
          ? "bg-primary/10 text-primary border-primary font-medium"
          : "text-slate-400 border-transparent hover:bg-primary/5 hover:text-slate-100"
      }`}
      {...rest}
    >
      {children}
    </Link>
  );
}
