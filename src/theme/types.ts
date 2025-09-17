export interface ITheme {
  color: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

export interface IStyles {
  text: {
    fontSize: {
      sm: number;
      md: number;
      lg: number;
    };
  };
  spacing: {
    sm: number;
    md: number;
    lg: number;
  };
}

export interface IThemeMap {
  palette: {
    light: ITheme;
    dark: ITheme;
  };
  styles: IStyles;
}

export type TThemeList = keyof IThemeMap["palette"];
