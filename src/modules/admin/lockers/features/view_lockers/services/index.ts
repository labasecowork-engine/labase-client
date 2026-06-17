import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type {
  DeliverKeyInput,
  Locker,
  LockerAssignment,
  LockerDelivery,
  LockerPerson,
  LockerStats,
} from "../../../types";

// Extrae `data` de la envoltura estándar de la API y falla si falta, para que
// React Query lo trate como error.
const unwrap = <T>(response: Response<T>, errorMessage: string): T => {
  if (response.data === undefined) throw new Error(errorMessage);
  return response.data;
};

export const getLockers = async (): Promise<Locker[]> => {
  const { data } = await axiosInstance.get<Response<Locker[]>>("/lockers");
  return unwrap(data, "No se pudieron obtener los lockers");
};

export const getLockerStats = async (): Promise<LockerStats> => {
  const { data } =
    await axiosInstance.get<Response<LockerStats>>("/lockers/stats");
  return unwrap(data, "No se pudieron obtener las métricas de lockers");
};

export const getActiveDeliveries = async (): Promise<LockerDelivery[]> => {
  const { data } =
    await axiosInstance.get<Response<LockerDelivery[]>>("/lockers/deliveries");
  return unwrap(data, "No se pudieron obtener las entregas activas");
};

export const getAssignments = async (): Promise<LockerAssignment[]> => {
  const { data } =
    await axiosInstance.get<Response<LockerAssignment[]>>("/lockers/assignments");
  return unwrap(data, "No se pudieron obtener las asignaciones");
};

export const searchPeople = async (query: string): Promise<LockerPerson[]> => {
  const term = query.trim();
  if (!term) return [];
  const params = new URLSearchParams({ search: term });
  const { data } = await axiosInstance.get<Response<LockerPerson[]>>(
    `/lockers/people?${params.toString()}`
  );
  return unwrap(data, "No se pudieron buscar personas");
};

export const deliverKey = async (
  input: DeliverKeyInput
): Promise<LockerDelivery> => {
  const { data } = await axiosInstance.post<Response<LockerDelivery>>(
    "/lockers/deliveries",
    input
  );
  return unwrap(data, "No se pudo entregar la llave");
};

export const returnKey = async (deliveryId: string): Promise<void> => {
  await axiosInstance.patch(`/lockers/deliveries/${deliveryId}/return`);
};
