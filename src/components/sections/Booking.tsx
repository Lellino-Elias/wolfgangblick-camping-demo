"use client";

import { useEffect, useRef, useState } from "react";
import { campsite } from "@/content/campsite.config";
import { usePlaceholderToast } from "@/components/ui/Placeholder";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import Magnetic from "@/components/ui/Magnetic";
import { eur } from "@/lib/format";

/** Tween a number toward `target` whenever it changes. */
function useTween(target: number, duration = 650) {
  const [val, setVal] = useState(target);
  const prev = useRef(target);
  const raf = useRef(0);
  useEffect(() => {
    const from = prev.current;
    const start = performance.now();
    cancelAnimationFrame(raf.current);
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (target - from) * e));
      if (p < 1) raf.current = requestAnimationFrame(step);
      else prev.current = target;
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return val;
}

function nightsBetween(a: string, b: string) {
  const d1 = new Date(a).getTime();
  const d2 = new Date(b).getTime();
  if (!d1 || !d2 || d2 <= d1) return 1;
  return Math.max(1, Math.round((d2 - d1) / 86400000));
}

/** ISO date `days` days from now (client-side, after mount → no hydration mismatch). */
const isoInDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export default function Booking() {
  const { heading, headingEmphasis, intro, categories, priceNote, highlight, pricesArePlaceholder } = campsite.booking;
  const notify = usePlaceholderToast();

  // Heading aus dem Config; optionaler serif-kursiver Akzent (wörtlicher Teilstring).
  const emphAt = headingEmphasis ? heading.indexOf(headingEmphasis) : -1;

  // Demo-Daten relativ zu heute (statt hartkodiert) — gesetzt nach Mount, damit der statische
  // Export nie veraltete Vergangenheits-Daten zeigt.
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  useEffect(() => {
    setArrival(isoInDays(21));
    setDeparture(isoInDays(28));
  }, []);
  const [guests, setGuests] = useState(2);
  const [catId, setCatId] = useState(categories[0]?.id ?? "");

  const cat = categories.find((c) => c.id === catId) ?? categories[0];
  const nights = nightsBetween(arrival, departure);
  const extra = Math.max(0, guests - 2) * (cat?.perExtraGuest ?? 0);
  // Ohne perNight (Quelle nennt keine lesbaren Preise) gibt es keine Summe — ehrlich „auf Anfrage".
  const priceKnown = cat?.perNight != null;
  const total = priceKnown ? ((cat?.perNight ?? 0) + extra) * nights : 0;
  const animatedTotal = useTween(total);

  const field = "w-full rounded-xl border border-line bg-bg2 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold/60";

  return (
    <section id="booking" className="scroll-mt-24 bg-bg">
      {/* Booking heading — static, well-formatted (no word animation) */}
      <div className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="tl-glow" style={{ width: "44rem", height: "44rem", left: "-12%", top: "-30%", background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 48%, transparent), transparent 70%)" }} />
          <div className="tl-glow" style={{ width: "40rem", height: "40rem", right: "-14%", bottom: "-34%", background: "radial-gradient(circle, color-mix(in oklab, var(--lake) 32%, transparent), transparent 70%)" }} />
        </div>
        <div className="relative mx-auto max-w-3xl px-5 pt-20 text-center md:px-8 md:pt-28">
          <Reveal soft>
            <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-ink">
              <Words text={heading} emphasis={emphAt >= 0 ? headingEmphasis : undefined} />
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{intro}</p>
            <div className="mx-auto mt-9 h-px w-40 bg-gold/40" />
          </Reveal>
        </div>
      </div>

      {/* Widget */}
      <div id="booking-widget" className="mx-auto max-w-[1320px] scroll-mt-24 px-5 pb-24 pt-12 md:px-8 md:pb-32 md:pt-16">
        <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
          {/* Widget — Double-Bezel: äußere Schale + innerer Kern (haptische Tiefe am Conversion-Moment) */}
          <Reveal>
            <div className="h-full rounded-[2.4rem] bg-ink/[0.045] p-2 ring-1 ring-ink/10">
            <div className="rounded-[calc(2.4rem-0.5rem)] border border-line bg-surface/80 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.55)] md:p-9">
              {/* Inputs */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Anreise</span>
                  <input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} className={field} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Abreise</span>
                  <input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} className={field} />
                </label>
              </div>

              {/* Guests */}
              <div className="mt-4">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Personen</span>
                <div className="flex items-center gap-4 rounded-xl border border-line bg-bg2 px-4 py-2.5">
                  <button
                    aria-label="weniger"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-line text-lg text-ink transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    −
                  </button>
                  <span className="font-display min-w-6 text-center text-lg font-bold text-ink">{guests}</span>
                  <button
                    aria-label="mehr"
                    onClick={() => setGuests((g) => Math.min(8, g + 1))}
                    className="flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-line text-lg text-ink transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    +
                  </button>
                  <span className="ml-auto text-xs text-muted">{nights} {nights === 1 ? "Nacht" : "Nächte"}</span>
                </div>
              </div>

              {/* Category selector — animated price cards */}
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {categories.map((c) => {
                  const active = c.id === catId;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCatId(c.id)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        active ? "border-gold bg-gold/10" : "border-line bg-bg2 hover:border-ink/30"
                      }`}
                    >
                      <span className="block text-sm font-semibold text-ink">{c.label}</span>
                      <span className="mt-1 block text-xs text-muted">
                        {c.perNight != null ? (
                          <>ab <span className="font-display text-base font-bold text-gold">{eur(c.perNight)}</span> / Nacht</>
                        ) : (
                          <span className="font-display text-base font-bold text-gold">auf Anfrage</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Price + CTAs */}
              <div className="mt-7 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted">
                    Gesamt · {cat?.label ?? "Anfrage"} · {guests} Pers. · {nights} {nights === 1 ? "Nacht" : "Nächte"}
                  </span>
                  <div className="font-display mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
                    {priceKnown ? eur(animatedTotal) : "auf Anfrage"}
                  </div>
                  <span className="mt-1 block text-xs leading-snug text-muted">{pricesArePlaceholder ? "Unverbindlicher Richtpreis · noch nicht final bestätigt" : priceNote}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Magnetic>
                    <button
                      onClick={() => notify("Buchungsanfrage wird per E-Mail gesendet (Demo).")}
                      className="group inline-flex items-center gap-3 rounded-full bg-gold py-2 pl-6 pr-2 text-sm font-semibold text-white transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-gold-soft active:scale-[0.98]"
                    >
                      Jetzt buchen
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:scale-105">
                        <svg width="15" height="15" viewBox="0 0 14 14"><path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                    </button>
                  </Magnetic>
                  <button
                    onClick={() => notify("Anfrage wird per E-Mail gesendet (Demo).")}
                    className="rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-ink/40 hover:bg-white/5 active:scale-[0.98]"
                  >
                    Anfrage senden
                  </button>
                </div>
              </div>
            </div>
            </div>
          </Reveal>

          {/* Sidebar — gleiche Double-Bezel-Schale wie das Widget */}
          <Reveal delay={120}>
            <div className="h-full rounded-[2.4rem] bg-ink/[0.045] p-2 ring-1 ring-ink/10">
            <div className="flex h-full flex-col gap-5 rounded-[calc(2.4rem-0.5rem)] border border-line bg-bg2 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] md:p-8">
              {campsite.saison && (<>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Saison</span>
                <p className="font-display mt-1 text-xl font-bold text-ink">
                  {campsite.saison.von} – {campsite.saison.bis}
                </p>
              </div>
              <div className="h-px bg-line" />
              </>)}
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Inklusive</span>
                <ul className="mt-3 space-y-2">
                  {campsite.usps.slice(0, 4).map((u) => (
                    <li key={u} className="flex items-center gap-2.5 text-sm text-ink/85">
                      <svg width="15" height="15" viewBox="0 0 16 16" className="shrink-0 text-gold">
                        <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto rounded-2xl bg-gold/10 p-4">
                <p className="text-sm font-semibold text-gold">{highlight.title}</p>
                <p className="mt-1 text-xs text-muted">{highlight.text}</p>
              </div>
              <a href={campsite.kontakt.telHref} className="flex items-center gap-2.5 text-sm text-ink/85 transition-colors hover:text-gold">
                <svg width="15" height="15" viewBox="0 0 16 16" className="shrink-0 text-gold"><path d="M3 3.5c0 5 4.5 9.5 9.5 9.5l1.5-2.5-3-1.5-1.5 1.5C8 9.5 6.5 8 5.5 6.5L7 5 5.5 2 3 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
                {campsite.kontakt.tel}
              </a>
              <a href={`mailto:${campsite.kontakt.mail}`} className="-mt-3 flex items-center gap-2.5 break-all text-sm text-ink/85 transition-colors hover:text-gold">
                <svg width="15" height="15" viewBox="0 0 16 16" className="shrink-0 text-gold"><path d="M2 4.5h12v7H2v-7Zm0 .5 6 4.5L14 5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
                {campsite.kontakt.mail}
              </a>
            </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
