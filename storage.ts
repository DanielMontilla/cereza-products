import AsyncStorage from "@react-native-async-storage/async-storage";
import { z } from "zod";

export async function setItem<T>(key: string, item: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(item));
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