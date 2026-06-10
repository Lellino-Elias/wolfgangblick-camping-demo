import type { CSSProperties, ReactNode } from "react";

type Props = {
  text: string;
  /** Wörtlicher Teilstring von `text`, der serif-kursiv akzentuiert wird (wortbündig). */
  emphasis?: string;
  emphasisClass?: string;
  emphasisStyle?: CSSProperties;
};

/**
 * Wort-Masken-Reveal für Headlines: jedes Wort in einer eigenen Overflow-Maske,
 * gestaffelt animiert via CSS (--wi, siehe globals.css .wsplit). Server-gerendert,
 * hydration-sicher, ohne JS sofort sichtbar. Muss in einem `.reveal`-Host liegen.
 */
export default function Words({ text, emphasis, emphasisClass = "font-serif italic font-normal text-gold", emphasisStyle }: Props) {
  const at = emphasis ? text.indexOf(emphasis) : -1;
  const end = at >= 0 ? at + (emphasis as string).length : -1;
  const out: ReactNode[] = [];
  let pos = 0;
  let wi = 0;
  for (const word of text.split(" ")) {
    const start = pos;
    pos += word.length + 1;
    if (!word) continue;
    const isEmph = at >= 0 && start >= at && start < end;
    out.push(
      <span key={`${start}-${word}`} className="w">
        <span
          className={isEmph ? emphasisClass : undefined}
          style={{ ...( { "--wi": wi } as CSSProperties), ...(isEmph ? emphasisStyle : undefined) }}
        >
          {word}
        </span>
      </span>,
      " ",
    );
    wi += 1;
  }
  return <span className="wsplit">{out}</span>;
}
