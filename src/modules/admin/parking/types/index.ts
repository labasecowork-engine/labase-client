// Tipos de dominio de Estacionamiento. Su forma replica los futuros modelos de
// Prisma (parking_space, parking_record) para que cablear la API sea solo
// cambiar el origen de datos (ver services/).
import type { Pagination } from "@/types";

export type ParkingSpaceStatus = "free" | "occupied";
export type ParkingRecordStatus = "active" | "exited";

export interface ParkingSpace {
  id: string;
  code: string;
  status: ParkingSpaceStatus;
  // Ocupante actual (si está ocupado), para mostrarlo en el panel.
  current: { record_id: string; client_name: string; plate: string } | null;
}

export interface ParkingRecord {
  id: string;
  date: string; // yyyy-mm-dd
  client_name: string;
  company: string | null;
  plate: string;
  space_code: string;
  entry_time_1: string; // ISO
  exit_time_1: string | null;
  entry_time_2: string | null;
  exit_time_2: string | null;
  total_minutes: number | null;
  status: ParkingRecordStatus;
  archived: boolean;
  observations: string | null;
}

export interface ParkingPerson {
  id: string;
  name: string;
  document: string | null;
  company: string | null;
}

// Lo que el formulario de ingreso envía al servicio.
export interface RegisterEntryInput {
  user_id?: string;
  client_name: string;
  company: string | null;
  plate: string;
  space_id: string;
  date: string; // yyyy-mm-dd
  entry_time: string; // HH:mm
  observations: string | null;
}

export interface RegisterExitInput {
  exit_time: string; // HH:mm
}

// Datos mínimos para el diálogo de salida (los provee la tabla o el panel).
export interface ExitTarget {
  id: string;
  client_name: string;
  space_code: string;
}

export interface RecordFilters {
  search?: string;
  date_from?: string;
  date_to?: string;
  archived?: boolean;
  page?: number;
}

export interface ParkingRecordsResponse {
  records: ParkingRecord[];
  pagination: Pagination;
}
