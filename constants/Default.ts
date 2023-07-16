import { ThemeContextObject, ThemeType, Transformers } from "@/types";
import { THEMES } from "@/constants/Themes";

const NOOP = () => {};
const BOOL_NOOP = (id: number) => false;

export const DEFAULT_TRANSFORMER_CONTEXT_OBJ: Transformers = {
  addBought: BOOL_NOOP,
  addFavorite: BOOL_NOOP,
  removeFavorite: BOOL_NOOP,
  removeBought: BOOL_NOOP,
  clear: NOOP,
};

export const DEFAULT_THEME_CONTEXT_OBJ: ThemeContextObject = {
  type: "dark",
  switchTo: (to: ThemeType) => null,
  ...THEMES["dark"],
}

export const FAVORITES_STORAGE_KEY = "cereza@favorites" as const;
export const BOUGHT_STORAGE_KEY = "cereza@bought" as const;