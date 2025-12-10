import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { Article } from "../../view_articles/types";
import axios from "axios";

export const updateArticleRequest = async (
  id: string,
  payload: FormData
): Promise<Article> => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const { data } = await axiosInstance.patch<Response<Article>>(
    `/articles/${id}`,
    payload,
    config
  );

  if (!data.data) {
    throw new Error(
      "Error al actualizar el artículo, el servidor no contiene los datos esperados."
    );
  }

  return data.data;
};

export const getContentArticleRequest = async (url: string) => {
  const { data } = await axios.get(url);
  return data;
};

export const getArticleRequest = async (id: string): Promise<Article> => {
  const { data } = await axiosInstance.get<Response<Article>>(
    `/articles/${id}`
  );

  if (!data.data) {
    throw new Error(
      "Error al obtener el artículo, el servidor no contiene los datos esperados."
    );
  }

  return data.data;
};
