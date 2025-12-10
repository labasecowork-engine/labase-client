import type { ProductResponse } from "../types";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";

export const getProductsRequest = async (
  page: number
): Promise<ProductResponse> => {
  const { data } = await axiosInstance.get<Response<ProductResponse>>(
    `/inventory/products?page=${page}&limit=15`
  );
  if (!data.data) {
    throw new Error("No se encontraron productos");
  }
  return data.data;
};

export const deleteProductRequest = async (id: string) => {
  await axiosInstance.delete(`/inventory/products/${id}`);
};
