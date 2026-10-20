"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function TopProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Selesaikan animasi loading setiap kali pathname atau searchParams berubah
  useEffect(() => {
    if (isVisible) {
      setProgress(100);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, isVisible]);

  useEffect(() => {
    // Intersep klik pada tag <a> untuk memicu animasi loading navigasi
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target || target.target === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey) {
        return;
      }

      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
        return;
      }

      const currentUrl = window.location.pathname + window.location.search;
      if (href !== currentUrl) {
        startProgress();
      }
    };

    // Intersep perubahan history (router.push / router.replace)
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      setTimeout(startProgress, 0);
      return originalPushState.apply(this, args);
    };

    window.history.replaceState = function (...args) {
      setTimeout(startProgress, 0);
      return originalReplaceState.apply(this, args);
    };

    document.addEventListener("click", handleAnchorClick, true);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);

  const startProgress = () => {
    setIsVisible(true);
    setProgress(20);

    const step1 = setTimeout(() => setProgress(50), 100);
    const step2 = setTimeout(() => setProgress(75), 300);
    const step3 = setTimeout(() => setProgress(88), 600);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  };

  if (!isVisible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-99999 pointer-events-none transition-opacity duration-200"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Glow effect */}
      <div
        className="h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-all ease-out shadow-[0_0_10px_rgba(56,189,248,0.7)]"
        style={{
          width: `${progress}%`,
          transitionDuration: progress === 100 ? "150ms" : "300ms",
        }}
      />
    </div>
  );
}

export default function TopProgressBar() {
  return (
    <Suspense fallback={null}>
      <TopProgressBarInner />
    </Suspense>
  );
}
