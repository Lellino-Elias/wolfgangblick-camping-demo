type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Nur Opacity-Fade, kein Block-Shift — für Hosts, deren Inhalt (Words/Media) selbst choreografiert. */
  soft?: boolean;
};

/**
 * Scroll-reveal wrapper. Visual logic is handled by a vanilla inline bootstrap
 * (see app/layout.tsx) so reveals work the instant the page is interactive —
 * independent of (and not blocked by) React hydration. `delay` staggers the
 * animation via CSS transition-delay.
 */
export default function Reveal({ children, className = "", delay = 0, soft = false }: Props) {
  return (
    <div
      className={`reveal ${soft ? "reveal-soft " : ""}${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
