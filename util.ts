import { FormatNumberOptions, createIntl } from '@formatjs/intl';

export const isUnique = (arr: any[]) => new Set(arr).size === arr.length;

const moneyFormatter = createIntl({
  locale: 'en-US',
});

export const useNumber = (n: number, options?: FormatNumberOptions) => moneyFormatter.formatNumber(n, options);

export function splitPrice(price: number) {
  const parts = price.toFixed(2).split('.');
  return {dollars: parts[0], cents: parts[1]};
}

export function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}