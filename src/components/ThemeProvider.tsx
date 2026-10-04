"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "beeradius" | "beeradius-light";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "beeradius",
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("beeradius");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored === "beeradius-light" || stored === "beeradius") {
        setThemeState(stored);
        document.documentElement.setAttribute("data-theme", stored);
      } else {
        const current = document.documentElement.getAttribute("data-theme") as Theme | null;
        if (current === "beeradius-light" || current === "beeradius") {
          setThemeState(current);
        }
      }
    } catch {
      // Ignore localStorage access errors
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch {
      // Ignore
    }
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === "beeradius" ? "beeradius-light" : "beeradius";
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: theme === "beeradius",
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
