import { useQuery } from "@tanstack/react-query";
import {
  getActiveDeliveries,
  getAssignments,
  getLockers,
  getLockerStats,
} from "../../services";

// Orquesta las lecturas de la pantalla de lockers. Cada recurso es un query
// independiente para poder invalidarlos por separado tras una mutación.
export const useLockers = () => {
  const lockersQuery = useQuery({
    queryKey: ["lockers"],
    queryFn: getLockers,
  });

  const statsQuery = useQuery({
    queryKey: ["lockers", "stats"],
    queryFn: getLockerStats,
  });

  const deliveriesQuery = useQuery({
    queryKey: ["lockers", "deliveries"],
    queryFn: getActiveDeliveries,
  });

  const assignmentsQuery = useQuery({
    queryKey: ["lockers", "assignments"],
    queryFn: getAssignments,
  });

  return { lockersQuery, statsQuery, deliveriesQuery, assignmentsQuery };
};
