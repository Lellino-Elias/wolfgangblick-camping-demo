"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Native scrolling — no Lenis. Smooth-wheel hijacking (Lenis) was the cause of the
// "weird scroll" feel and it desynced reveal/lazy-load so images appeared late or not
// at all. Native scroll is smooth on modern devices; ScrollTrigger still drives any
// scroll-bound animation off the real scroll position. Anchor jumps fall back to
// element.scrollIntoView (see lib/scroll.ts) now that window.lenis is gone.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return <>{children}</>;
}
