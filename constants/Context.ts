import { createContext } from "react";
import { Product, ThemeContextObject, Transformers } from "@/types";
import { DEFAULT_THEME_CONTEXT_OBJ, DEFAULT_TRANSFORMER_CONTEXT_OBJ } from "./Default";

export const TransformersContext = createContext<Transformers>(DEFAULT_TRANSFORMER_CONTEXT_OBJ);
export const ProductsContext = createContext<Product[]>([]);
export const FavoritesContext = createContext<Set<number>>(new Set());
export const BoughtContext = createContext<Set<number>>(new Set());
export const ThemeContext = createContext<ThemeContextObject>(DEFAULT_THEME_CONTEXT_OBJ);