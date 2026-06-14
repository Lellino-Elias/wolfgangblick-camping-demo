import type { CampsiteConfig } from "../types";

/**
 * Camping Wolfgangblick — Seecamping der Familie Eisl, direkt am Wolfgangsee
 * in Abersee/St. Gilgen (Salzkammergut). Inhalte zu 100 % aus der eigenen
 * Quelle (raw/digest) abgeleitet; Bilder ausschließlich von diesem Platz.
 */
const IMG = "/campsites/wolfgangblick";

const wolfgangblick: CampsiteConfig = {
  name: "Camping Wolfgangblick",
  shortName: "Wolfgangblick",
  slug: "wolfgangblick",
  ort: "Abersee am Wolfgangsee",
  region: "Salzburg",
  brandKind: "Seecamping",
  see: "Wolfgangsee",
  regionLong: "Wolfgangsee · Salzkammergut · Salzburg",

  heroVariant: "center",

  claim: "Dein Sommer in erster Reihe am Wolfgangsee",
  claimEmphasis: "am Wolfgangsee",
  intro:
    "Sonnig und ruhig direkt am Ufer des Wolfgangsees: Bei Familie Eisl findest du einen flach abfallenden Badestrand, kristallklares Wasser und die Bergwelt des Salzkammerguts rund um deinen Stellplatz.",

  logo: { src: `${IMG}/logo-6129a646df.png`, alt: "Seecamping Wolfgangblick Logo" },

  statement: {
    text: "Von deinem Stellplatz bis ins kristallklare Wasser des Wolfgangsees sind es nur wenige Schritte.",
    emphasis: "wenige Schritte",
  },

  pillars: [
    {
      title: "Erste Reihe am Wasser",
      text: "Die Plätze der Kategorie A liegen direkt am Ufer — morgens öffnest du das Vorzelt und blickst auf den stillen See.",
      image: { src: `${IMG}/gallery-ae6c3b3b9a.webp`, alt: "Steg am Ufer des Wolfgangsees beim Camping Wolfgangblick" },
    },
    {
      title: "Stille Morgenstunden",
      text: "Wenn der Frühnebel über dem Wolfgangsee liegt, gehört der Uferweg am Platz fast dir allein.",
      image: { src: `${IMG}/gallery-ccbae2e71c.webp`, alt: "Morgennebel über dem Wolfgangsee am Camping Wolfgangblick" },
    },
    {
      title: "Persönlich bei Familie Eisl",
      text: "An der Rezeption wirst du persönlich beraten — von Ausflugstipps bis zum Fährfahrplan hinüber nach St. Wolfgang.",
      image: { src: `${IMG}/amenity-ef6c31b544.webp`, alt: "Willkommenstafel an der Rezeption des Camping Wolfgangblick" },
    },
  ],

  usps: [
    "Warmwasser & WLAN gratis",
    "Eigener Badestrand",
    "Kiosk, Shop & Gastgarten",
    "Direkt am Wolfgangsee",
    "Hunde willkommen",
    "ACSI-Partner",
  ],

  trust: {
    heading: "Was den Wolfgangblick ausmacht",
    headingEmphasis: "Wolfgangblick",
    intro:
      "Seit Jahren in Familienhand: ein gepflegter Seecampingplatz mit 80 Touristen- und 50 Dauerstellplätzen, kurzen Wegen zum Wasser, gratis Warmwasser und WLAN — und der Bergwelt des Salzkammerguts direkt vor dem Vorzelt.",
  },

  awards: [],

  saison: { von: "Mitte April", bis: "Ende September" },

  hero: {
    aerial: { src: `${IMG}/hero-3bedabdd3d.webp`, alt: "Luftaufnahme: Camping Wolfgangblick direkt am Wolfgangsee mit Bergpanorama" },
  },

  camping: {
    heading: "Der Platz am Wolfgangsee",
    intro:
      "Sonnige Wiesenstellplätze, ein eigener Badestrand und das Naturschutzgebiet Blinklingmoos gleich nebenan — bei uns liegt der Urlaubstag zwischen Seeufer und Bergpanorama.",
    features: [
      {
        title: "Direkt am Seeufer",
        text: "An der engsten Stelle des Wolfgangsees gelegen, mit Blick auf St. Wolfgang — 80 Touristen- und 50 Dauerstellplätze.",
        image: { src: `${IMG}/gallery-ca0d30a3d4.webp`, alt: "Wiesenstellplätze am Ufer des Wolfgangsees beim Camping Wolfgangblick" },
      },
      {
        title: "Eigener Badestrand",
        text: "Der flach abfallende Strand ist auch für Kinder ideal — kristallklares Wasser für Schwimmen und Wassersport direkt am Platz.",
        image: { src: `${IMG}/gallery-b4a190320c.webp`, alt: "Flach abfallender Badestrand am Wolfgangsee beim Camping Wolfgangblick" },
      },
      {
        title: "Schattige Stellplätze",
        text: "Hohe Bäume spenden im Hochsommer Schatten über den Plätzen — Strom, gratis Warmwasser und WLAN gehören selbstverständlich dazu.",
        image: { src: `${IMG}/amenity-50f0211bbb.webp`, alt: "Schattige Stellplätze unter Bäumen am Camping Wolfgangblick" },
      },
    ],
  },

  anreise: {
    heading: "Dein Weg an den Wolfgangsee",
    modes: [
      {
        title: "Mit dem Auto",
        text: "Über die A1 (Westautobahn) bis Mondsee oder Thalgau, dann auf der B158 nach Abersee/St. Gilgen — die Seestraße führt direkt an den Platz.",
      },
      {
        title: "Mit Bahn & Bus",
        text: "Bis Salzburg Hauptbahnhof, weiter mit dem Postbus 150 entlang des Wolfgangsees bis Abersee.",
      },
      {
        title: "Per Schiff & Fähre",
        text: "Vom Platz bringt dich die Bootsfähre in wenigen Minuten hinüber nach St. Wolfgang; im Sommer verbindet die Wolfgangseeschifffahrt die Orte rund um den See.",
      },
    ],
  },

  galerie: {
    heading: "Ein Sommer am Wolfgangsee",
    headingEmphasis: "Wolfgangsee",
    intro: "Seeluft, Bergpanorama und lange Abende am Wasser — ein paar Eindrücke vom Platz und seinem Ufer.",
    tag: "Mitte April bis Ende September",
    images: [
      { src: `${IMG}/gallery-79c2e74603.webp`, alt: "Luftaufnahme des Camping Wolfgangblick mit Blick auf St. Wolfgang" },
      { src: `${IMG}/gallery-94e0350ef5.webp`, alt: "Seeufer mit Bootshütten beim Camping Wolfgangblick" },
      { src: `${IMG}/gallery-d00c3b63f0.webp`, alt: "Abendsonne über den Stellplätzen am Wolfgangsee" },
      { src: `${IMG}/hero-482b7366a8.webp`, alt: "Luftbild des Seecampingplatzes Wolfgangblick am Wolfgangsee" },
    ],
  },

  booking: {
    heading: "Bereit für deinen Platz am See?",
    headingEmphasis: "am See",
    intro:
      "Wähle Zeitraum und Kategorie — Familie Eisl bestätigt deine Anfrage persönlich per E-Mail. Reservierungen ab 3 Nächten.",
    pricesArePlaceholder: false,
    priceNote: "ab-Preise Nebensaison · Stellplatz inkl. 2 Erwachsene & Ortstaxe · Strom € 0,90/kWh extra",
    categories: [
      { id: "see1", label: "1. Reihe am See", perNight: 48, perExtraGuest: 14 },
      { id: "see2", label: "2. & 3. Reihe", perNight: 46, perExtraGuest: 14 },
      { id: "wiese", label: "Kategorie B · Wiese", perNight: 45, perExtraGuest: 14 },
    ],
    highlight: {
      title: "ACSI-Tarif",
      text: "In Vor- & Nachsaison ab € 27 / Nacht (2 Erw., Hund, 4 kWh) — exkl. Ortstaxe.",
    },
  },

  kontakt: {
    coords: { lat: 47.73682, lng: 13.432395 },
    tel: "+43 650 5934297",
    telHref: "tel:+436505934297",
    mail: "camping@wolfgangblick.at",
    adresse: "Seestraße 115 · 5342 Abersee · Salzburg",
  },

  languages: ["DE", "EN"],

  nav: [
    { label: "Der Platz", href: "#camping" },
    { label: "Galerie", href: "#galerie" },
    { label: "Lage & Anreise", href: "#anreise" },
    { label: "Preise", href: "#booking" },
  ],
};

export default wolfgangblick;
