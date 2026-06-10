"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Img from "@/components/ui/Img";
import { campsite } from "@/content/campsite.config";

/**
 * Breather — ein einziges Full-Bleed-Bild als Atempause zwischen den Karten-Sektionen
 * (bricht die Container-Monotonie). Sanfter Parallax wie im Hero. Rendert NUR, wenn das
 * Config ein `breather`-Bild liefert (ehrliche Degradierung). Spacing-neutral: eigene,
 * in sich geschlossene Sektion — das kanonische Sektions-Spacing bleibt unberührt.
 */
export default function Breather() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const breather = campsite.breather;

  useEffect(() => {
    if (!breather) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mediaRef.current,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [breather]);

  if (!breather) return null;

  return (
    <section ref={sectionRef} className="relative h-[44svh] min-h-[320px] w-full overflow-hidden md:h-[58svh]">
      {/* leichte Überhöhe für den Parallax-Weg */}
      <div ref={mediaRef} className="absolute -inset-y-[10%] inset-x-0 will-change-transform">
        <Img src={breather.image.src} alt={breather.image.alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/45 to-transparent" />
      {breather.line && (
        <p
          className="absolute bottom-7 left-5 max-w-[26ch] font-serif text-xl italic leading-snug text-white md:bottom-10 md:left-10 md:text-3xl"
          style={{ textShadow: "0 1px 18px rgba(0,0,0,0.55)" }}
        >
          {breather.line}
        </p>
      )}
    </section>
  );
}
