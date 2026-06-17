// Tipos de dominio de Contratos. Reflejan 1:1 los DTOs del backend
// (contract + contract_payment); el estado/pendiente/progreso se derivan de
// `payments` contra `rent_amount` en el front.
import type { Pagination } from "@/types";

export type PaymentStatus = "paid" | "pending" | "partial";

export interface ContractPayment {
  id: string;
  amount: number;
  paid_at: string; // ISO
  note: string | null;
}

export interface Contract {
  id: string;
  client_name: string;
  company: string | null;
  responsible: string | null;
  document: string | null; // DNI/RUC
  phone: string | null;
  address: string | null;
  follow_up: string | null;
  plan: string | null;
  contract_type: string | null;
  space_name: string | null;
  rent_reference_start: string | null; // yyyy-mm-dd
  start_date: string; // yyyy-mm-dd
  end_date: string; // yyyy-mm-dd
  rent_amount: number;
  monthly_payment: number | null;
  invoice_number: string | null;
  wifi: string | null;
  locker_ref: string | null;
  num_users: number | null;
  payments: ContractPayment[];
  archived: boolean;
  created_at: string; // yyyy-mm-dd
}

// Lo que el formulario envía al servicio (crear/editar).
export interface ContractInput {
  client_name: string;
  company: string | null;
  responsible: string | null;
  document: string | null;
  phone: string | null;
  address: string | null;
  follow_up: string | null;
  plan: string | null;
  contract_type: string | null;
  space_name: string | null;
  rent_reference_start: string | null;
  start_date: string;
  end_date: string;
  rent_amount: number;
  monthly_payment: number | null;
  invoice_number: string | null;
  wifi: string | null;
  locker_ref: string | null;
  num_users: number | null;
}

export interface PayInput {
  amount: number;
  note: string | null;
}

export interface ContractStats {
  total: number;
  pending: number;
  expired: number;
  expiring_soon: number;
  expiring: { id: string; client_name: string; days: number; space_name: string | null }[];
}

export interface ContractFilters {
  search?: string;
  archived?: boolean;
  page?: number;
}

export interface ContractsResponse {
  contracts: Contract[];
  pagination: Pagination;
}
