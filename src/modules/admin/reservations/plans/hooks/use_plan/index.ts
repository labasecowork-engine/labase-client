import { useQuery } from "@tanstack/react-query";
import { getPlan } from "../../services";

export const usePlan = (id: string) =>
  useQuery({
    queryKey: ["plans", "detail", id],
    queryFn: () => getPlan(id),
    enabled: !!id,
  });
