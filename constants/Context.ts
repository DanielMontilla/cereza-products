import { createContext } from "react";
import { AppContextObject, ThemeContextObject } from "@/types";
import { DEFAULT_APP_CONTEXT_OBJ, DEFAULT_THEME_CONTEXT_OBJ } from "./Default";


export const AppContext = createContext<AppContextObject>(DEFAULT_APP_CONTEXT_OBJ);
export const ThemeContext = createContext<ThemeContextObject>(DEFAULT_THEME_CONTEXT_OBJ);