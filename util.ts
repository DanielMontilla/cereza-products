import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormatNumberOptions, createIntl } from '@formatjs/intl';
import { z } from "zod";

export async function setItem<T>(key: string, item: T): Promise<void> {
  let data = '';
  if (item instanceof Set) {
    data = JSON.stringify([...item]);
  } else {
    data = JSON.stringify(item);
  }
  await AsyncStorage.setItem(key, data);
}

export async function getItem<T>(key: string, schema: z.Schema<T>, defaultValue: T): Promise<T> {
  const rawValue = await AsyncStorage.getItem(key);

  if (rawValue === null) return defaultValue;

  const result = schema.safeParse(JSON.parse(rawValue));

  if (!result.success) {
    await setItem(key, defaultValue);
    return defaultValue;
  } else {
    return result.data;
  }
}

export const isUnique = (arr: any[]) => new Set(arr).size === arr.length;

const moneyFormatter = createIntl({
  locale: 'en-US',
});

export const useNumber = (n: number, options?: FormatNumberOptions) => moneyFormatter.formatNumber(n, options);


export function splitPrice(price: number) {
  const parts = price.toFixed(2).split('.');
  return {dollars: parts[0], cents: parts[1]};
}