import { useQuery } from "@tanstack/react-query";
import { getContracts, getPlans, getStats } from "../../services";
import type { ContractFilters } from "../../types";

export const useContracts = (filters: ContractFilters) => {
  const contractsQuery = useQuery({
    queryKey: ["contracts", filters.search, filters.archived, filters.page],
    queryFn: () => getContracts(filters),
  });

  const statsQuery = useQuery({
    queryKey: ["contracts", "stats"],
    queryFn: getStats,
  });

  return { contractsQuery, statsQuery };
};

// Planes guardados para el autocomplete del formulario.
export const usePlans = () =>
  useQuery({ queryKey: ["contracts", "plans"], queryFn: getPlans });
