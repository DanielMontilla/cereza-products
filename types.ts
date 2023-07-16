import { z } from "zod";
import { productSchema } from "./constants/Schema";

export type Product = z.infer<typeof productSchema>;

export type Completed<T> = { state: 'completed', value: T }
export type Loading = { state: 'loading' }
export type Error = { state: 'error', errors: string[] }

export type Data<T = undefined> = Completed<T> | Loading | Error;

export type Transformers = {
  addFavorite(id: number): void,
  removeFavorite(id: number): void,
  addBought(id: number): void,
  removeBought(id: number): void,
  clear(): void,
}

export type ThemeType = "dark" | "light";

export type ThemeData = {
  text: string,
  invalidText: string,
  void: string,
  background: string,
  neutral: string,
  good: string,
  bad: string,
}

export type ThemeTransformers = {
  switchTo(to: ThemeType): void
}

export type ThemeContextObject = { type: ThemeType } & ThemeData & ThemeTransformers;