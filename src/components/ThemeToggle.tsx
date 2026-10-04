"use client";

import { useTheme } from "./ThemeProvider";
import { FaSun, FaMoon } from "react-icons/fa";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = "", showLabel = true }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`btn btn-sm btn-ghost gap-2 border border-base-300 hover:border-primary/40 transition-all duration-200 cursor-pointer ${className}`}
      title={isDark ? "Beralih ke Mode Terang (Light Mode)" : "Beralih ke Mode Gelap (Dark Mode)"}
      aria-label="Toggle Dark/Light Mode"
    >
      {isDark ? (
        <>
          <FaSun className="h-3.5 w-3.5 text-amber-400" />
          {showLabel && <span className="text-xs font-mono">Light</span>}
        </>
      ) : (
        <>
          <FaMoon className="h-3.5 w-3.5 text-sky-500" />
          {showLabel && <span className="text-xs font-mono">Dark</span>}
        </>
      )}
    </button>
  );
}
