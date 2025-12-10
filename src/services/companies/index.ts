import { axiosInstance } from "@/interceptors";
import type { Company } from "@/types/employee";
import type { Response } from "@/types";

export const getCompanies = async (): Promise<Company[]> => {
  const { data } = await axiosInstance.get<Response<Company[]>>("/company");
  if (!data.data) {
    throw new Error("No se pudo obtener las empresas");
  }
  return data.data;
};
