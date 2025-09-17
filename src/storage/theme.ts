import AsyncStorage from "@react-native-async-storage/async-storage";
import { TThemeList } from "../theme/types";

const getTheme = async (): Promise<TThemeList> => {
  const res = await AsyncStorage.getItem("theme");
  return res ? (JSON.parse(res) as TThemeList) : "light";
};

const setTheme = async (theme: TThemeList): Promise<void> => {
  AsyncStorage.setItem("theme", JSON.stringify(theme));
};

export const ThemeStorage = { getTheme, setTheme };
