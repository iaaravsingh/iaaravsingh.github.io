"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export default function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }

    if (lenis) {
      const timeoutId = setTimeout(() => {
        const hash = window.location.hash;
        
        if (hash) {
          lenis.scrollTo(hash, { immediate: true });
          return; 
        }
        
        lenis.scrollTo(0, { immediate: true });
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [pathname, lenis]);

  return null;
}