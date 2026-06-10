"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Img from "@/components/ui/Img";
import Words from "@/components/ui/Words";
import { campsite } from "@/content/campsite.config";
import { NavLink } from "@/components/ui/Placeholder";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const { claim, claimEmphasis } = campsite;
  // indexOf statt split: verschluckt nichts, wenn die Emphasis mehrfach im Claim vorkommt.
  const emphAt = claimEmphasis ? claim.indexOf(claimEmphasis) : -1;
  const before = emphAt >= 0 ? claim.slice(0, emphAt) : claim;
  const after = emphAt >= 0 ? claim.slice(emphAt + claimEmphasis.length) : "";
  const hero = campsite.hero.aerial;
  const left = campsite.heroVariant === "left";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-bg2">
      {/* Media */}
      <div ref={mediaRef} className="absolute inset-0 z-0 will-change-transform">
        <Img src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        {left ? (
          // mobil deckt ein vertikaler Verlauf die volle Textbreite ab; ab md der linke Band-Scrim
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/15 md:bg-gradient-to-r md:from-black/60 md:via-black/25 md:to-transparent" />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 72% 62% at 50% 48%, rgba(0,0,0,0.52), transparent 75%)" }}
          />
        )}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content — zentriert (Default) oder linksbündig (heroVariant: "left") */}
      <div className={`reveal reveal-soft relative z-10 mx-auto flex h-full max-w-[1320px] flex-col justify-center px-5 md:px-8 ${left ? "items-start text-left" : "items-center text-center"}`}>
        <h1
          className={`font-display text-[clamp(2rem,9vw,5.5rem)] font-extrabold leading-[1.04] md:leading-[0.98] tracking-tight text-white [text-wrap:balance] ${left ? "max-w-3xl" : "mx-auto max-w-4xl"}`}
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}
        >
          <Words text={claim} emphasis={emphAt >= 0 ? claimEmphasis : undefined} emphasisClass="font-serif italic font-normal" emphasisStyle={{ color: "var(--hero-emph)" }} />
        </h1>

        <p
          className={`mt-6 max-w-xl text-base text-white md:text-lg ${left ? "" : "mx-auto"}`}
          style={{ textShadow: "0 1px 18px rgba(0,0,0,0.6)" }}
        >
          {campsite.intro}
        </p>

        <div className={`mt-7 flex w-full flex-col items-stretch gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 ${left ? "justify-start" : "justify-center"}`}>
          <Magnetic className="w-full justify-center sm:w-auto">
            <NavLink
              href="#booking"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gold py-2 pl-7 pr-2 text-sm font-semibold text-white transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-gold-soft active:scale-[0.98] sm:w-auto"
            >
              Jetzt anfragen
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                <svg width="15" height="15" viewBox="0 0 14 14"><path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            </NavLink>
          </Magnetic>
          <a
            href={campsite.kontakt.telHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 w-full justify-center sm:w-auto whitespace-nowrap"
          >
            <svg width="15" height="15" viewBox="0 0 16 16"><path d="M3 3.5c0 5 4.5 9.5 9.5 9.5l1.5-2.5-3-1.5-1.5 1.5C8 9.5 6.5 8 5.5 6.5L7 5 5.5 2 3 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
            {campsite.kontakt.tel}
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 md:bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2.5 text-white/85">
        <span className="text-[11px] uppercase tracking-[0.28em]">Scroll</span>
        <svg className="scroll-bob h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 9.5 12 16l7-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
