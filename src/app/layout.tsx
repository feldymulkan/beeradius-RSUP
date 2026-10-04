import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "BeeRadius Admin",
  description: "RADIUS Management Panel",
};

// Tema dinamis (beeradius / beeradius-light) dengan pencegahan flash (FOUC)
const ThemeLoaderScript = () => {
  const script = `
    (function() {
      try {
        var stored = localStorage.getItem('theme');
        var theme = (stored === 'beeradius-light') ? 'beeradius-light' : 'beeradius';
        document.documentElement.setAttribute('data-theme', theme);
      } catch (e) {
        document.documentElement.setAttribute('data-theme', 'beeradius');
      }
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

// Skrip otomatis menangani ChunkLoadError pasca-deploy
const ChunkErrorRecoveryScript = () => {
  const script = `
    (function() {
      function triggerReload() {
        var lastReload = sessionStorage.getItem('chunk_error_reload');
        var now = Date.now();
        if (!lastReload || (now - parseInt(lastReload, 10)) > 10000) {
          sessionStorage.setItem('chunk_error_reload', now.toString());
          window.location.reload();
        }
      }

      window.addEventListener('error', function(event) {
        var target = event.target || event.srcElement;
        var isScript = target && target.tagName === 'SCRIPT';
        var src = (isScript && target.src) || '';
        var msg = event.message || '';
        
        if (src.includes('_next/static/chunks/') || msg.includes('Loading chunk') || msg.includes('ChunkLoadError')) {
          triggerReload();
        }
      }, true);

      window.addEventListener('unhandledrejection', function(event) {
        var reason = event && event.reason;
        var msg = (reason && (reason.message || reason.name || String(reason))) || '';
        if (msg.includes('Loading chunk') || msg.includes('ChunkLoadError')) {
          triggerReload();
        }
      });
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-theme="beeradius" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} ${inter.className}`}>
        <ThemeLoaderScript />
        <ChunkErrorRecoveryScript />

        <Toaster position="top-center" reverseOrder={false} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}