import { ThemeData, ThemeType } from "@/types";

export const THEMES = {
  light: {
    text: "#1A1A1A",
    invalidText: "#8B8B8B",
    background: "#cccccc",
    void: "#E5E5E5",
    neutral: "#595959",
    good: "#33A151",
    bad: "#BA4C4C"
  },
  dark: {
    text: "#E6E6E6",
    invalidText: "#4E4E4E",
    background: "#1E1E1E",
    void: "#171717",
    neutral: "#FFF",
    good: "#1C8C3A",
    bad: "#781a1a",
  },
} satisfies Record<ThemeType, ThemeData>;