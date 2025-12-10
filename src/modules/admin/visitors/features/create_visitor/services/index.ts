import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { CreateVisitorFormData, SearchVisitorResponse } from "../types";

export const searchVisitorByDNI = async (
  dni: string
): Promise<SearchVisitorResponse> => {
  const { data } = await axiosInstance.get<Response<SearchVisitorResponse>>(
    `/visitors/lookup?dni=${dni}`
  );
  if (!data.data) {
    throw new Error("No se encontró el visitante");
  }
  return data.data;
};

export const createVisitor = async (visitor: CreateVisitorFormData) => {
  const { data } = await axiosInstance.post("/visitors", visitor);
  if (!data.data) {
    throw new Error("No se pudo crear el visitante");
  }
  return data.data;
};
