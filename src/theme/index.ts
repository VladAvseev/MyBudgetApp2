import { DARK_THEME } from "./dark";
import { LIGHT_THEME } from "./light";
import { IThemeMap } from "./types";

export const THEME: IThemeMap = {
  palette: {
    light: LIGHT_THEME,
    dark: DARK_THEME,
  },
  styles: {
    text: {
      fontSize: {
        sm: 14,
        md: 18,
        lg: 24,
      },
    },
    spacing: {
      sm: 8,
      md: 16,
      lg: 24,
    },
  },
};

export { useTheme } from "./hooks/useTheme";
export { useSetThemeMutation } from "./hooks/setTheme";
