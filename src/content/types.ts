/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CAMPSITE TEMPLATE — Typen (Datenvertrag)
 * ─────────────────────────────────────────────────────────────────────────
 *  Das Design liest AUSSCHLIESSLICH aus einem CampsiteConfig-Objekt. Kein
 *  hartkodierter, platz-spezifischer Text in den Komponenten. Für einen neuen
 *  Campingplatz: nur ein Config-Objekt unter content/campsites/<slug>.ts +
 *  die Bilder unter /public/campsites/<slug>/ anlegen — Design bleibt gleich.
 *
 *  Optionale Felder (mit `?`) blenden ihre Sektion/ihr Element automatisch
 *  aus oder degradieren ehrlich, wenn die Daten fehlen.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type ImageRef = { src: string; alt: string };

export type Feature = { title: string; text: string; image: ImageRef };

export type Accommodation = {
  name: string;
  kind: string;
  text: string;
  image: ImageRef;
  priceFrom?: number;
  features?: string[];
};

export type Activity = { title: string; text: string; image: ImageRef };

export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export type BookingCategory = {
  id: string;
  label: string;
  /** Preis pro Nacht (Basis, 2 Personen) — mit Kunde bestätigen.
   *  Fehlt (Quelle nennt keine lesbaren Preise) → Widget zeigt ehrlich „auf Anfrage". */
  perNight?: number;
  /** Aufpreis je weiterer Person/Nacht */
  perExtraGuest?: number;
};

export type StoryChapter = {
  no: string;
  kicker: string;
  title: string;
  text: string;
  /** Kapitel-Bild. Nur wenn JEDES Kapitel ein Bild hat, wird die Story-Sektion gerendert. */
  image?: ImageRef;
};

/** Hervorhebbare Headline: `emphasis` muss ein wörtlicher Teilstring von `text` sein. */
export type EmphText = { text: string; emphasis: string };

export interface CampsiteConfig {
  name: string;
  shortName: string;
  slug: string;
  ort: string;
  region: string;
  /** Kuratierte Farbwelt der Demo. Fehlt → "editorial" (heutiger Default-Look). */
  theme?: "editorial" | "alpin" | "schiefer" | "cinematic";
  /** Hero-Komposition: zentriert (Default) oder linksbündig. */
  heroVariant?: "center" | "left";
  /** Untertitel der Wortmarke, z. B. "FKK-Camping", "Pension & Camping". */
  brandKind: string;
  /** Optional: See/Gewässer am Platz. Fehlt → keine "am See"-Rahmung. */
  see?: string;
  regionLong: string;
  claim: string;
  claimEmphasis: string; // Wort/Phrase im Headline, das hervorgehoben (serif italic) wird
  intro: string;
  /** Cold-Mail-Personalisierung (nicht im UI gerendert): Nominalphrase für den fixen
   *  Mail-1-Satz "… hängen geblieben: {emailDetail} ist mir sofort aufgefallen."
   *  Regeln siehe pipeline/BUILD-CAGED.md. */
  emailDetail?: string;
  /** Logo des Platzes (Footer). Fehlt → Wortmarke statt Bild. */
  logo?: ImageRef;
  /** Markenaussage über dem Pillar-Block (BrandStatement). */
  statement: EmphText;
  pillars: { title: string; text: string; image: ImageRef }[];
  usps: string[];
  /** Vertrauens-Band: Überschrift + ehrlicher Einleitungstext. */
  trust: { heading: string; headingEmphasis: string; intro: string };
  awards: { label: string; image?: ImageRef }[];
  saison?: { von: string; bis: string };   // optional — manche Quellen nennen keine Saison (nichts erfinden!)
  hero: { aerial: ImageRef; sunset?: ImageRef };
  /** Optional: EIN starkes, sonst ungenutztes Querformat-Bild als Full-Bleed-Atempause
   *  zwischen den Sektionen (+ optional eine kurze, belegte Zeile). Fehlt → keine Sektion. */
  breather?: { image: ImageRef; line?: string };
  camping: { heading: string; intro: string; features: Feature[] };
  mobilheime?: { heading: string; intro: string; items: Accommodation[] };
  kinder?: { heading: string; intro: string; features: Feature[] };
  aktivitaeten?: { heading: string; intro: string; items: Activity[] };
  anreise: { heading: string; modes: { title: string; text: string }[] };
  galerie: {
    heading: string;
    headingEmphasis: string;
    intro: string;
    tag: string;
    /** Zahl weiterer Fotos für die "+N"-Kachel. Fehlt → keine Zahl. */
    moreCount?: number;
    images: ImageRef[];
  };
  booking: {
    heading: string;
    /** Optional: wörtlicher Teilstring von `heading`, der serif-kursiv hervorgehoben wird. */
    headingEmphasis?: string;
    intro: string;
    categories: BookingCategory[];
    pricesArePlaceholder: boolean;
    /** Kleingedruckter Preis-Hinweis unter dem Gesamtpreis. */
    priceNote: string;
    /** Hervorgehobener Vorteil in der Buchungs-Sidebar. */
    highlight: { title: string; text: string };
  };
  kontakt: {
    tel: string;
    telHref: string;
    mail: string;
    facebook?: string;
    adresse: string;
    /** Fehlt → Karte wird ausgeblendet, nur Adresse wird gezeigt.
     *  approx: Orts- statt Punkt-Genauigkeit → Umgebungs-Karte mit Kreis statt Pin (nie falscher Pin). */
    coords?: { lat: number; lng: number; approx?: boolean };
  };
  story?: { kicker: string; heading: string; intro: string; chapters: StoryChapter[] };
  languages: string[];
  nav: NavItem[];
}
