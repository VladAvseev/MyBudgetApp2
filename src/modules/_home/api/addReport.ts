import { ReportStorage } from "@/src/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddreportMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ReportStorage.addReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes("report"),
      });
    },
  });
};
