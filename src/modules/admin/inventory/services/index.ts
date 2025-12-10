import { axiosInstance } from "@/interceptors";
import type { CreateBrandForm } from "../types";
import type { Response } from "@/types";
import type { Brand } from "@/types/inventory";

export const getBrands = async () => {
  const { data } = await axiosInstance.get<Response<Brand[]>>(
    "/inventory/products/brands"
  );
  if (!data.data) {
    throw new Error("No se encontraron marcas");
  }
  return data.data;
};

export const createBrand = async (data: CreateBrandForm) => {
  await axiosInstance.post("/inventory/products/brands", data);
};

export const updateBrand = async (id: string, data: CreateBrandForm) => {
  await axiosInstance.put(`/inventory/products/brands/${id}`, data);
};

export const deleteBrand = async (id: string) => {
  await axiosInstance.delete(`/inventory/products/brands/${id}`);
};
