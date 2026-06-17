import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type {
  ParkingPerson,
  ParkingRecord,
  ParkingRecordsResponse,
  ParkingSpace,
  RecordFilters,
  RegisterEntryInput,
  RegisterExitInput,
} from "../types";

// Extrae `data` de la envoltura estándar de la API y falla si falta, para que
// React Query lo trate como error.
const unwrap = <T>(response: Response<T>, errorMessage: string): T => {
  if (response.data === undefined) throw new Error(errorMessage);
  return response.data;
};

export const getSpaces = async (): Promise<ParkingSpace[]> => {
  const { data } =
    await axiosInstance.get<Response<ParkingSpace[]>>("/parking/spaces");
  return unwrap(data, "No se pudieron obtener los espacios");
};

export const getRecords = async (
  filters: RecordFilters = {}
): Promise<ParkingRecordsResponse> => {
  const params = new URLSearchParams();
  if (filters.search) params.append("search", filters.search);
  if (filters.date_from) params.append("date_from", filters.date_from);
  if (filters.date_to) params.append("date_to", filters.date_to);
  params.append("archived", String(filters.archived ?? false));
  params.append("page", String(filters.page ?? 1));

  const { data } = await axiosInstance.get<Response<ParkingRecordsResponse>>(
    `/parking/records?${params.toString()}`
  );
  return unwrap(data, "No se pudieron obtener los registros");
};

export const searchPeople = async (query: string): Promise<ParkingPerson[]> => {
  const term = query.trim();
  if (!term) return [];
  const params = new URLSearchParams({ search: term });
  const { data } = await axiosInstance.get<Response<ParkingPerson[]>>(
    `/parking/people?${params.toString()}`
  );
  return unwrap(data, "No se pudieron buscar personas");
};

export const registerEntry = async (
  input: RegisterEntryInput
): Promise<ParkingRecord> => {
  const { data } = await axiosInstance.post<Response<ParkingRecord>>(
    "/parking/records",
    input
  );
  return unwrap(data, "No se pudo registrar el ingreso");
};

export const registerExit = async (
  id: string,
  input: RegisterExitInput
): Promise<ParkingRecord> => {
  const { data } = await axiosInstance.patch<Response<ParkingRecord>>(
    `/parking/records/${id}/exit`,
    input
  );
  return unwrap(data, "No se pudo registrar la salida");
};

export const reenter = async (id: string): Promise<ParkingRecord> => {
  const { data } = await axiosInstance.patch<Response<ParkingRecord>>(
    `/parking/records/${id}/reenter`
  );
  return unwrap(data, "No se pudo registrar el reingreso");
};

export const archiveRecord = async (id: string): Promise<void> => {
  await axiosInstance.patch(`/parking/records/${id}/archive`);
};
