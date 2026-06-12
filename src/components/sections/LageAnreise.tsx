"use client";

import dynamic from "next/dynamic";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import { campsite } from "@/content/campsite.config";

const MapClient = dynamic(() => import("@/components/ui/MapClient"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-bg2" />,
});

/* Minimal-Linien-Icons, per Titel-Keyword gewählt (Auto/Bahn/Flug/Default-Pin). */
function ModeIcon({ title }: { title: string }) {
  const t = title.toLowerCase();
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (/auto|pkw|wagen|wohnmobil/.test(t))
    return <svg width="20" height="20" viewBox="0 0 24 24"><path d="M4 15.5 5.4 10c.3-1 1-1.5 2-1.5h9.2c1 0 1.7.5 2 1.5l1.4 5.5M4 15.5h16M4 15.5V18m16-2.5V18M7.5 13h.01M16.5 13h.01" {...common} /></svg>;
  if (/bahn|zug|bus|öffi|öffentlich/.test(t))
    return <svg width="20" height="20" viewBox="0 0 24 24"><path d="M7 4.5h10c1 0 1.5.5 1.5 1.5v8c0 1-.5 1.5-1.5 1.5H7c-1 0-1.5-.5-1.5-1.5V6c0-1 .5-1.5 1.5-1.5Zm-1.5 6h13M9 18l-1.5 2M15 18l1.5 2M9 12.8h.01M15 12.8h.01" {...common} /></svg>;
  if (/flug|flieger/.test(t))
    return <svg width="20" height="20" viewBox="0 0 24 24"><path d="M10.5 13.5 4 11l1.5-1.5L11 10l4.5-4.5c.6-.6 1.6-.6 2 0 .4.4.4 1.4 0 2L13 12l.5 5.5L12 19l-2.5-6.5Z" {...common} /></svg>;
  return <svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 20s6-5.5 6-10a6 6 0 1 0-12 0c0 4.5 6 10 6 10Zm0-8.2a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z" {...common} /></svg>;
}

export default function LageAnreise() {
  const { heading, modes } = campsite.anreise;
  const { coords, adresse } = campsite.kontakt;
  const name = campsite.name;

  return (
    <section id="anreise" className="scroll-mt-24 py-16 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1320px] items-stretch gap-8 px-5 md:px-8 lg:grid-cols-2 lg:gap-12">
        {/* Map (or, without coords, an address-only card) */}
        <Reveal>
          <div className="relative h-[300px] sm:h-[360px] overflow-hidden rounded-[2rem] lg:h-full lg:min-h-[460px]">
            {coords ? (
              <>
                <MapClient lat={coords.lat} lng={coords.lng} label={name} approx={!!coords.approx} />
                <div className="pointer-events-none absolute bottom-4 left-4 right-4 max-w-[calc(100%-2rem)] leading-snug z-[1000] rounded-full border border-line bg-bg/80 px-4 py-2 text-xs text-ink backdrop-blur-md">
                  {coords.approx ? `Ungefähre Lage · ${adresse}` : adresse}
                </div>
                <a
                  href={coords.approx
                    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${adresse}`)}`
                    : `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-3 z-[1000] inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-[13px] min-h-[44px] md:right-4 md:top-4 md:py-2 md:text-xs md:min-h-0 font-semibold text-white shadow-lg transition-colors hover:bg-gold-soft"
                >
                  Auf Google Maps ansehen
                  <svg width="13" height="13" viewBox="0 0 14 14"><path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-bg2 p-8 text-center">
                <p className="font-display text-lg font-bold text-ink">{name}</p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{adresse}</p>
              </div>
            )}
          </div>
        </Reveal>

        {/* Anreise modes — Icon-Karten (bewusst anderes Modul als die Kinder-Liste) */}
        <div className="flex flex-col justify-center">
          <Reveal soft>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
              <Words text={heading} />
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3.5">
            {modes.map((m, i) => (
              <Reveal key={m.title} delay={i * 90}>
                <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface/70 p-5 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset] transition-colors duration-500 hover:border-gold/40">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold">
                    <ModeIcon title={m.title} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{m.title}</h3>
                    <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
