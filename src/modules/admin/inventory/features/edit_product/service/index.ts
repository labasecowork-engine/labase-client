import { axiosInstance } from "@/interceptors";
import type { Product, Response } from "@/types";

export const updateProductRequest = async (id: string, payload: FormData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  await axiosInstance.patch(`/inventory/products/${id}`, payload, config);
};

export const getProductRequest = async (id: string): Promise<Product> => {
  const { data } = await axiosInstance.get<Response<Product>>(
    `/inventory/products/${id}`
  );
  if (!data.data) {
    throw new Error(
      "Error al obtener el producto, el servidor no contiene los datos del producto."
    );
  }
  return data.data;
};
