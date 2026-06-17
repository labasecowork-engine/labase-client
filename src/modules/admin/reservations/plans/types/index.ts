// Tipos de dominio de Planes (catálogo de membresías). Reflejan 1:1 los DTOs
// que devolverá el backend en Fase 2.
import type { Pagination } from "@/types";

export type PlanCategory = "individual" | "team" | "office" | "shared_space";

export type BillingPeriod = "day" | "week" | "month" | "year";

export type PlanLabelColor =
  | "gold"
  | "blue"
  | "green"
  | "purple"
  | "rose"
  | "stone";

// Espacio incluido en un plan (subconjunto del `space` real).
export interface PlanSpace {
  id: string;
  name: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number | null; // null = "A medida"
  category: PlanCategory;
  billing_period: BillingPeriod;
  target_audience: string | null;
  label_color: PlanLabelColor;
  description: string | null;
  features: string[];
  spaces: PlanSpace[];
  created_at: string; // ISO
}

// Lo que el formulario envía al servicio (crear/editar).
export interface PlanInput {
  name: string;
  price: number | null;
  category: PlanCategory;
  billing_period: BillingPeriod;
  target_audience: string | null;
  label_color: PlanLabelColor;
  description: string | null;
  features: string[];
  space_ids: string[];
}

export interface PlanStats {
  total: number;
  individual: number;
  team: number;
  office: number;
  shared_space: number;
}

export interface PlanFilters {
  search?: string;
  category?: PlanCategory;
  page?: number;
}

export interface PlansResponse {
  plans: Plan[];
  pagination: Pagination;
}
