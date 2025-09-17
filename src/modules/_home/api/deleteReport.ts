import { ReportStorage } from "@/src/storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteReportMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ReportStorage.deleteReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes("report"),
      });
    },
  });
};
