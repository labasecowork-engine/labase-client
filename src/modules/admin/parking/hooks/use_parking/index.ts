import { useQuery } from "@tanstack/react-query";
import { getRecords, getSpaces } from "../../services";
import type { RecordFilters } from "../../types";

// Panel de espacios (pantalla de registro).
export const useSpaces = () =>
  useQuery({
    queryKey: ["parking", "spaces"],
    queryFn: getSpaces,
  });

// Tabla de registros (pantalla principal), según filtros.
export const useRecords = (filters: RecordFilters) =>
  useQuery({
    queryKey: [
      "parking",
      "records",
      filters.search,
      filters.date_from,
      filters.date_to,
      filters.archived,
      filters.page,
    ],
    queryFn: () => getRecords(filters),
  });
