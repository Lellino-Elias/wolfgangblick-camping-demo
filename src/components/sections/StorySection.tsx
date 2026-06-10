"use client";

import { useEffect, useRef, useState } from "react";
import { campsite } from "@/content/campsite.config";
import Img from "@/components/ui/Img";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";

/**
 * Story — sticky Split: links scrollen die Kapitel, rechts blendet das gepinnte
 * Kapitelbild über. Rendert NUR, wenn die Story 3+ Kapitel hat und JEDES Kapitel
 * ein eigenes Bild mitbringt (ehrliche Degradierung: sonst keine Sektion).
 */
export default function StorySection() {
  const story = campsite.story;
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const chapters = story?.chapters ?? [];
  const complete = chapters.length >= 3 && chapters.every((c) => c.image?.src);

  useEffect(() => {
    if (!complete) return;
    const els = blockRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [complete]);

  if (!story || !complete) return null;

  return (
    <section id="story" className="relative scroll-mt-24 py-16 md:py-32">
      {/* Intro */}
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal soft>
          <div className="mb-10 max-w-2xl md:mb-20">
            <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
              <Words text={story.heading} />
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">{story.intro}</p>
          </div>
        </Reveal>
      </div>

      {/* DESKTOP — left text scrolls, right media is pinned & cross-fades */}
      <div className="mx-auto hidden max-w-[1320px] grid-cols-2 gap-16 px-8 lg:grid">
        <div>
          {chapters.map((c, i) => (
            <div
              key={c.no}
              data-idx={i}
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
              className="flex min-h-screen flex-col justify-center"
            >
              <div
                className={`max-w-md transition-all duration-500 ${
                  active === i ? "opacity-100" : "opacity-30"
                }`}
              >
                <span className="font-display block text-5xl font-extrabold text-gold/30">{c.no}</span>
                <h3 className="font-display mt-4 text-4xl font-bold leading-tight tracking-tight text-ink">
                  {c.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative aspect-square w-full overflow-hidden rounded-[2.2rem] bg-bg2 shadow-2xl ring-1 ring-black/5">
              {chapters.map((c, i) => (
                <div
                  key={c.no}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Img src={c.image!.src} alt={c.image!.alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-5 left-6 flex items-center gap-2">
                {chapters.map((c, i) => (
                  <span
                    key={c.no}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      active === i ? "w-8 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE — stacked cards */}
      <div className="mx-auto max-w-xl space-y-12 px-5 md:space-y-16 lg:hidden">
        {chapters.map((c) => (
          <Reveal key={c.no}>
            <div>
              <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-bg2 shadow-xl ring-1 ring-black/5">
                <Img src={c.image!.src} alt={c.image!.alt} fill sizes="100vw" className="object-cover" />
              </div>
              <div className="mt-5">
                <span className="font-display text-3xl font-extrabold text-gold/40">{c.no}</span>
                <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-ink">{c.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{c.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
