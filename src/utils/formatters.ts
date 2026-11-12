import { Currency } from '../types/tour';
import { CURRENCY_RATES } from '../data/toursData';

export function formatCurrency(amountKES: number, currency: Currency): string {
  const rate = CURRENCY_RATES[currency] || 1;
  const converted = Math.round(amountKES * rate);

  if (currency === 'KES') {
    return `KES ${converted.toLocaleString()}`;
  }
  if (currency === 'USD') {
    return `$${converted.toLocaleString()}`;
  }
  if (currency === 'EUR') {
    return `€${converted.toLocaleString()}`;
  }
  return `${converted.toLocaleString()}`;
}
