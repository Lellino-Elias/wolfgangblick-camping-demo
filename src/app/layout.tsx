import type { Metadata } from "next";
import { Bricolage_Grotesque, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { campsite } from "@/content/campsite.config";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: campsite.see
    ? `${campsite.name} — Camping am ${campsite.see} | ${campsite.region}`
    : `${campsite.name} — Camping in ${campsite.ort} | ${campsite.region}`,
  description: campsite.intro,
  // Demo/Akquise-Seite: nicht von Suchmaschinen indexieren.
  robots: { index: false, follow: false },
  openGraph: {
    title: `${campsite.name} — ${campsite.region}`,
    description: campsite.intro,
    images: [{ url: campsite.hero.aerial.src }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${serif.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Reveal bootstrap — runs before paint, no React needed. Arms the
            hidden→animate state, reveals on scroll, and force-shows everything
            after 3.5s so content is never stuck invisible on slow hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var d=document;d.documentElement.classList.add('reveal-js');function s(e){e.classList.add('is-in')}function init(){var els=d.querySelectorAll('.reveal');if(!('IntersectionObserver' in window)){els.forEach(s);return}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){s(e.target);io.unobserve(e.target)}})},{threshold:0.12,rootMargin:'0px 0px -6% 0px'});els.forEach(function(e){io.observe(e)});setTimeout(function(){d.querySelectorAll('.reveal:not(.is-in)').forEach(s)},1200)}if(d.readyState==='loading'){d.addEventListener('DOMContentLoaded',init)}else{init()}})();",
          }}
        />
        {children}
      </body>
    </html>
  );
}
