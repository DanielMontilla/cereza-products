import { z } from "zod";
import { productSchema } from "./constants/Schema";

export type Product = z.infer<typeof productSchema>;

export type Completed<T> = { state: 'completed', value: T }
export type Loading = { state: 'loading' }
export type Error = { state: 'error', errors: string[] }

export type Data<T> = Completed<T> | Loading | Error;

export type AppData = {
  products: Product[],
  favorites: number[],
  bought: number[],
}

export type AppDataTransformers = {
  addFavorite(id: number): boolean,
  removeFavorite(id: number): boolean,
  addBought(id: number): boolean,
  removeBought(id: number): boolean,
  clear(): void,
}

export type AppContextObject = AppData & AppDataTransformers;

export type ThemeType = "dark" | "light";

export type ThemeData = {
  text: string,
  invalidText: string,
  void: string,
  background: string,
  accent: string,
}

export type ThemeTransformers = {
  switchTo(to: ThemeType): void
}

export type ThemeContextObject = { type: ThemeType } & ThemeData & ThemeTransformers;