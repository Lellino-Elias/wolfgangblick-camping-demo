// German currency formatting — every price renders as €24,30 / €50 / €1.250,50 (never "€24.3").
// Integers show no decimals (€50); non-integers show exactly two (€24,30).
export function eur(n: number | string | null | undefined): string {
  const x = typeof n === "string" ? parseFloat(n) : n;
  if (x == null || Number.isNaN(x)) return "";
  return "€" + new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: Number.isInteger(x) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(x);
}
