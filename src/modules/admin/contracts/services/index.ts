import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type {
  Contract,
  ContractFilters,
  ContractInput,
  ContractStats,
  ContractsResponse,
  PayInput,
} from "../types";

// Tamaño de página de la grilla (3 columnas × 3 filas).
const PAGE_SIZE = 9;

// Extrae `data` de la envoltura estándar de la API y falla si falta, para que
// React Query lo trate como error.
const unwrap = <T>(response: Response<T>, errorMessage: string): T => {
  if (response.data === undefined) throw new Error(errorMessage);
  return response.data;
};

export const getContracts = async (
  filters: ContractFilters = {}
): Promise<ContractsResponse> => {
  const params = new URLSearchParams();
  if (filters.search) params.append("search", filters.search);
  params.append("archived", String(filters.archived ?? false));
  params.append("page", String(filters.page ?? 1));
  params.append("limit", String(PAGE_SIZE));

  const { data } = await axiosInstance.get<Response<ContractsResponse>>(
    `/contracts?${params.toString()}`
  );
  return unwrap(data, "No se pudieron obtener los contratos");
};

export const getStats = async (): Promise<ContractStats> => {
  const { data } =
    await axiosInstance.get<Response<ContractStats>>("/contracts/stats");
  return unwrap(data, "No se pudieron obtener las estadísticas");
};

export const getPlans = async (): Promise<string[]> => {
  const { data } =
    await axiosInstance.get<Response<string[]>>("/contracts/plans");
  return unwrap(data, "No se pudieron obtener los planes");
};

export const getContract = async (id: string): Promise<Contract> => {
  const { data } = await axiosInstance.get<Response<Contract>>(
    `/contracts/${id}`
  );
  return unwrap(data, "El contrato no existe");
};

export const createContract = async (
  input: ContractInput
): Promise<Contract> => {
  const { data } = await axiosInstance.post<Response<Contract>>(
    "/contracts",
    input
  );
  return unwrap(data, "No se pudo crear el contrato");
};

export const updateContract = async (
  id: string,
  input: ContractInput
): Promise<Contract> => {
  const { data } = await axiosInstance.patch<Response<Contract>>(
    `/contracts/${id}`,
    input
  );
  return unwrap(data, "No se pudo actualizar el contrato");
};

export const deleteContract = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/contracts/${id}`);
};

export const payContract = async (
  id: string,
  input: PayInput
): Promise<Contract> => {
  const { data } = await axiosInstance.post<Response<Contract>>(
    `/contracts/${id}/pay`,
    input
  );
  return unwrap(data, "No se pudo registrar el pago");
};

export const renewContract = async (id: string): Promise<Contract> => {
  const { data } = await axiosInstance.post<Response<Contract>>(
    `/contracts/${id}/renew`
  );
  return unwrap(data, "No se pudo renovar el contrato");
};
