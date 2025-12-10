import { axiosInstance } from "@/interceptors";
import type { EditVisitorFormData } from "../types";

export const editVisitor = async (id: string, visitor: EditVisitorFormData) => {
  const { data } = await axiosInstance.put(`/visitors/${id}`, visitor);
  if (!data.data) {
    throw new Error("No se pudo editar el visitante");
  }
  return data.data;
};

export const getVisitorDetails = async (id: string) => {
  const { data } = await axiosInstance.get(`/visitors/${id}`);
  if (!data.data) {
    throw new Error("No se encontró el visitante");
  }
  return data.data;
};
