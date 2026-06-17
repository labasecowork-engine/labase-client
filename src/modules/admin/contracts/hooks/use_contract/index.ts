import { useQuery } from "@tanstack/react-query";
import { getContract } from "../../services";

export const useContract = (id: string) =>
  useQuery({
    queryKey: ["contracts", "detail", id],
    queryFn: () => getContract(id),
    enabled: !!id,
  });
