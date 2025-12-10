import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { WorkArea } from "@/types/employee";

export const getAreas = async (): Promise<WorkArea[]> => {
  const { data } = await axiosInstance.get<Response<WorkArea[]>>("/workarea");
  if (!data.data) {
    throw new Error("No se pudo obtener las áreas");
  }
  return data.data;
};
