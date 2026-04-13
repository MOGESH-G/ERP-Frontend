export type Currency = {
  symbol: string; // e.g., ₹, $, €
  code?: string; // e.g., INR, USD, EUR
  locale?: string; // e.g., 'en-IN', 'en-US' for formatting
};

export function formatAmount(
  amount: number,
  currency: Currency = { symbol: "₹", locale: "en-IN" },
  showCode: boolean = false,
): string {
  const formatted = new Intl.NumberFormat(currency.locale || "en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  if (showCode && currency.code) {
    return `${currency.symbol} ${formatted} ${currency.code}`;
  }

  return `${currency.symbol} ${formatted}`;
}
