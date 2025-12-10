import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { EditCategoryPayload, EditCategoryResponse } from "../types";
import type { ArticleCategory } from "../../../types";

export const updateCategoryRequest = async (
  id: string,
  payload: EditCategoryPayload
): Promise<EditCategoryResponse> => {
  const { data } = await axiosInstance.put<Response<EditCategoryResponse>>(
    `/articles/categories/${id}`,
    payload
  );

  if (!data.data) {
    throw new Error(
      "Error al actualizar la categoría, el servidor no contiene los datos esperados."
    );
  }

  return data.data;
};

export const getCategory = async (id: string): Promise<ArticleCategory> => {
  const { data } = await axiosInstance.get<Response<ArticleCategory>>(
    `/articles/categories/${id}`
  );
  if (!data.data) {
    throw new Error(
      "Error al obtener la categoría, el servidor no contiene los datos esperados."
    );
  }
  return data.data;
};
