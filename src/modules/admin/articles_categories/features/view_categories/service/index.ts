import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { CategoriesResponse, GetCategoriesParams } from "../types";
import type { ArticleCategory } from "../../../types";

export const getCategoriesRequest = async (
  params?: GetCategoriesParams
): Promise<CategoriesResponse> => {
  const { data } = await axiosInstance.get<Response<ArticleCategory[]>>(
    "/articles/categories",
    {
      params,
    }
  );

  if (!data.data) {
    throw new Error(
      "Error al obtener las categorías, el servidor no contiene los datos esperados."
    );
  }

  return {
    categories: data.data,
    total: data.data.length,
  };
};

export const deleteCategoryRequest = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/articles/categories/${id}`);
};
