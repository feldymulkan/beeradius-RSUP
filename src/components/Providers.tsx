"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./ThemeProvider";
import TopProgressBar from "./TopProgressBar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <TopProgressBar />
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}