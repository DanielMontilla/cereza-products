import { ThemeData, ThemeType } from "@/types";

export const THEMES = {
  light: {
    text: "#1A1A1A",
    invalidText: "#8B8B8B",
    background: "#E6E6E6",
    void: "#CCCCCC",
    accent: "#2F85DC",
  },
  dark: {
    text: "#E6E6E6",
    invalidText: "#4E4E4E",
    background: "#1E1E1E",
    void: "#171717",
    accent: "#FFF",
  },
} satisfies Record<ThemeType, ThemeData>;