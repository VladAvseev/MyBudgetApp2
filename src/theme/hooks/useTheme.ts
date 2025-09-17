import { ThemeStorage } from "@/src/storage";
import { useQuery } from "@tanstack/react-query";

const useThemeQuery = () => {
  return useQuery({
    queryKey: ["theme"],
    queryFn: ThemeStorage.getTheme,
    staleTime: 1000 * 60 * 5,
  });
};

export const useTheme = () => {
  const { data = "light" } = useThemeQuery();
  return data;
};
