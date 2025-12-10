import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { ArticlesResponse, ArticlesData } from "../types";

export const getArticlesRequest = async (
  page: number,
  search: string,
  categoryId?: string
): Promise<ArticlesResponse> => {
  const queryParams = new URLSearchParams();

  if (page) {
    queryParams.append("page", page.toString());
  }

  if (search) {
    queryParams.append("search", search);
  }

  if (categoryId) {
    queryParams.append("categoryId", categoryId);
  }

  const { data } = await axiosInstance.get<Response<ArticlesData>>(
    `/articles?${queryParams.toString()}`
  );

  if (!data.data) {
    throw new Error(
      "Error al obtener los artículos, el servidor no contiene los datos esperados."
    );
  }

  return {
    data: data.data,
  };
};

export const deleteArticleRequest = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/articles/${id}`);
};
