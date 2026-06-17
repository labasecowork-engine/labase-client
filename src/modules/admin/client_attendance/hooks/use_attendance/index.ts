import { useQuery } from "@tanstack/react-query";
import { getPresent, getRecords, getStats } from "../../services";
import type { RecordFilters } from "../../types";

// Métricas de cabecera (pantalla principal).
export const useStats = () =>
  useQuery({
    queryKey: ["client-attendance", "stats"],
    queryFn: getStats,
  });

// Panel "presentes ahora" (pantalla de registro).
export const usePresent = () =>
  useQuery({
    queryKey: ["client-attendance", "present"],
    queryFn: getPresent,
  });

// Historial (pantalla principal), según filtros.
export const useRecords = (filters: RecordFilters) =>
  useQuery({
    queryKey: [
      "client-attendance",
      "records",
      filters.search,
      filters.date_from,
      filters.date_to,
      filters.archived,
      filters.page,
    ],
    queryFn: () => getRecords(filters),
  });
