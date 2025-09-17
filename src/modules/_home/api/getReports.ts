import { ReportStorage } from "@/src/storage";
import { useQuery } from "@tanstack/react-query";

export const useReportsQuery = () => {
  return useQuery({
    queryKey: ["report"],
    queryFn: ReportStorage.getReportsWithoutDetails,
    staleTime: 1000 * 60 * 5,
  });
};
