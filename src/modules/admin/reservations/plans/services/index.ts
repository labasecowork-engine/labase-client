import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type {
  Plan,
  PlanFilters,
  PlanInput,
  PlanSpace,
  PlanStats,
  PlansResponse,
} from "../types";

// Tamaño de página de la grilla (3 columnas × 3 filas). El backend usa
// DEFAULT_LIMIT distinto, por eso se envía `limit` explícito.
const PAGE_SIZE = 9;

// Extrae `data` de la envoltura estándar de la API y falla si falta, para que
// React Query lo trate como error.
const unwrap = <T>(response: Response<T>, errorMessage: string): T => {
  if (response.data === undefined) throw new Error(errorMessage);
  return response.data;
};

export const getPlans = async (
  filters: PlanFilters = {}
): Promise<PlansResponse> => {
  const params = new URLSearchParams();
  if (filters.search) params.append("search", filters.search);
  if (filters.category) params.append("category", filters.category);
  params.append("page", String(filters.page ?? 1));
  params.append("limit", String(PAGE_SIZE));

  const { data } = await axiosInstance.get<Response<PlansResponse>>(
    `/reservations/plans?${params.toString()}`
  );
  return unwrap(data, "No se pudieron obtener los planes");
};

export const getPlanStats = async (): Promise<PlanStats> => {
  const { data } = await axiosInstance.get<Response<PlanStats>>(
    "/reservations/plans/stats"
  );
  return unwrap(data, "No se pudieron obtener las estadísticas");
};

export const getSpaceOptions = async (): Promise<PlanSpace[]> => {
  const { data } = await axiosInstance.get<Response<PlanSpace[]>>(
    "/reservations/plans/spaces"
  );
  return unwrap(data, "No se pudieron obtener los espacios");
};

export const getPlan = async (id: string): Promise<Plan> => {
  const { data } = await axiosInstance.get<Response<Plan>>(
    `/reservations/plans/${id}`
  );
  return unwrap(data, "El plan no existe");
};

export const createPlan = async (input: PlanInput): Promise<Plan> => {
  const { data } = await axiosInstance.post<Response<Plan>>(
    "/reservations/plans",
    input
  );
  return unwrap(data, "No se pudo crear el plan");
};

export const updatePlan = async (
  id: string,
  input: PlanInput
): Promise<Plan> => {
  const { data } = await axiosInstance.patch<Response<Plan>>(
    `/reservations/plans/${id}`,
    input
  );
  return unwrap(data, "No se pudo actualizar el plan");
};

export const deletePlan = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/reservations/plans/${id}`);
};
