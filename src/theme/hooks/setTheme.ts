import { ThemeStorage } from "@/src/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSetThemeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ThemeStorage.setTheme,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes("theme"),
      });
    },
  });
};
