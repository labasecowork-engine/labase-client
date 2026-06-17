import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type {
  AttendanceRecordsResponse,
  AttendanceStats,
  ClientAttendance,
  ClientSearchResult,
  EditAttendanceInput,
  RecordFilters,
  RegisterAttendanceInput,
  RegisterExitInput,
} from "../types";

// Extrae `data` de la envoltura estándar de la API y falla si falta, para que
// React Query lo trate como error.
const unwrap = <T>(response: Response<T>, errorMessage: string): T => {
  if (response.data === undefined) throw new Error(errorMessage);
  return response.data;
};

export const getStats = async (): Promise<AttendanceStats> => {
  const { data } = await axiosInstance.get<Response<AttendanceStats>>(
    "/client-attendance/stats"
  );
  return unwrap(data, "No se pudieron obtener las métricas");
};

export const getPresent = async (): Promise<ClientAttendance[]> => {
  const { data } = await axiosInstance.get<Response<ClientAttendance[]>>(
    "/client-attendance/present"
  );
  return unwrap(data, "No se pudieron obtener los clientes presentes");
};

export const getRecords = async (
  filters: RecordFilters = {}
): Promise<AttendanceRecordsResponse> => {
  const params = new URLSearchParams();
  if (filters.search) params.append("search", filters.search);
  if (filters.date_from) params.append("date_from", filters.date_from);
  if (filters.date_to) params.append("date_to", filters.date_to);
  params.append("archived", String(filters.archived ?? false));
  params.append("page", String(filters.page ?? 1));

  const { data } = await axiosInstance.get<Response<AttendanceRecordsResponse>>(
    `/client-attendance/records?${params.toString()}`
  );
  return unwrap(data, "No se pudo obtener el historial");
};

export const searchClients = async (
  query: string
): Promise<ClientSearchResult[]> => {
  const term = query.trim();
  if (!term) return [];
  const params = new URLSearchParams({ search: term });
  const { data } = await axiosInstance.get<Response<ClientSearchResult[]>>(
    `/client-attendance/clients?${params.toString()}`
  );
  return unwrap(data, "No se pudieron buscar clientes");
};

export const registerEntry = async (
  input: RegisterAttendanceInput
): Promise<ClientAttendance> => {
  const { data } = await axiosInstance.post<Response<ClientAttendance>>(
    "/client-attendance/records",
    input
  );
  return unwrap(data, "No se pudo registrar el ingreso");
};

export const registerExit = async (
  id: string,
  input: RegisterExitInput
): Promise<ClientAttendance> => {
  const { data } = await axiosInstance.patch<Response<ClientAttendance>>(
    `/client-attendance/records/${id}/exit`,
    input
  );
  return unwrap(data, "No se pudo registrar la salida");
};

export const reenter = async (id: string): Promise<ClientAttendance> => {
  const { data } = await axiosInstance.patch<Response<ClientAttendance>>(
    `/client-attendance/records/${id}/reenter`
  );
  return unwrap(data, "No se pudo registrar el reingreso");
};

export const updateRecord = async (
  id: string,
  input: EditAttendanceInput
): Promise<ClientAttendance> => {
  const { data } = await axiosInstance.patch<Response<ClientAttendance>>(
    `/client-attendance/records/${id}`,
    input
  );
  return unwrap(data, "No se pudo actualizar el registro");
};

export const archiveRecord = async (id: string): Promise<void> => {
  await axiosInstance.patch(`/client-attendance/records/${id}/archive`);
};

export const deleteRecord = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/client-attendance/records/${id}`);
};
