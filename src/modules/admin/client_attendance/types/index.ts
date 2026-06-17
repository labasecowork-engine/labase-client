// Tipos de dominio de Asistencia de Clientes. Reflejan los modelos de Prisma
// (client_attendance) y los DTOs del backend (ver services/).
import type { Pagination } from "@/types";

export type AttendanceStatus = "present" | "exited";
export type AttendanceSource = "contract" | "reservation";

export interface AttendanceStats {
  present_now: number;
  entries_today: number;
  over_limit: number;
  total: number;
}

export interface ClientAttendance {
  id: string;
  date: string; // yyyy-mm-dd
  client_name: string;
  company: string | null;
  locker_ref: string | null;
  entry_time_1: string; // ISO
  exit_time_1: string | null;
  entry_time_2: string | null;
  exit_time_2: string | null;
  limit_time: string | null; // ISO
  total_minutes: number | null;
  status: AttendanceStatus;
  source: AttendanceSource;
  archived: boolean;
  observations: string | null;
}

// Resultado del buscador de clientes (trae datos de su reserva activa).
export interface ClientSearchResult {
  user_id: string;
  name: string;
  company: string | null;
  document: string | null;
  limit_time: string | null; // HH:mm derivado del fin de la reserva
  source: AttendanceSource;
}

export interface RegisterAttendanceInput {
  user_id?: string;
  client_name: string;
  company: string | null;
  date: string; // yyyy-mm-dd
  entry_time: string; // HH:mm
  limit_time: string | null; // HH:mm
  locker_ref: string | null;
  source: AttendanceSource;
  observations: string | null;
}

export interface RegisterExitInput {
  exit_time: string; // HH:mm
}

export interface EditAttendanceInput {
  client_name: string;
  company: string | null;
  entry_time_1: string; // HH:mm
  exit_time_1: string | null; // HH:mm
  limit_time: string | null; // HH:mm
  locker_ref: string | null;
  observations: string | null;
}

export interface RecordFilters {
  search?: string;
  date_from?: string;
  date_to?: string;
  archived?: boolean;
  page?: number;
}

export interface AttendanceRecordsResponse {
  records: ClientAttendance[];
  pagination: Pagination;
}

// Objetivo mínimo para el diálogo de salida (lo provee la tabla o el panel).
export interface ExitTarget {
  id: string;
  client_name: string;
}
