type Numeric = number | string | { toString(): string };

export function formatPrice(amount: Numeric): string {
  const num = parseFloat(String(amount));
  const currency = process.env.CURRENCY ?? "DZD";

  if (currency === "EUR") {
    return `${num.toFixed(2).replace(".", ",")} €`;
  }
  // DZD default
  return `${Math.round(num).toLocaleString("fr-FR")} DA`;
}

export function getCurrencySymbol(): string {
  const currency = process.env.CURRENCY ?? "DZD";
  return currency === "EUR" ? "€" : "DA";
}
