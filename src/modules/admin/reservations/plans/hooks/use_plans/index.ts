import { useQuery } from "@tanstack/react-query";
import { getPlanStats, getPlans, getSpaceOptions } from "../../services";
import type { PlanFilters } from "../../types";

export const usePlans = (filters: PlanFilters) => {
  const plansQuery = useQuery({
    queryKey: ["plans", filters.search, filters.category, filters.page],
    queryFn: () => getPlans(filters),
  });

  const statsQuery = useQuery({
    queryKey: ["plans", "stats"],
    queryFn: getPlanStats,
  });

  return { plansQuery, statsQuery };
};

// Espacios disponibles para el selector del formulario.
export const useSpaceOptions = () =>
  useQuery({ queryKey: ["plans", "spaces"], queryFn: getSpaceOptions });
