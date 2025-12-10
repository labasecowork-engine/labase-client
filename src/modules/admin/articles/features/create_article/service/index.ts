import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { ApiSuccessResponse, CreateArticleResponse } from "../types";

const createArticleRequest = async (
  payload: FormData,
): Promise<CreateArticleResponse> => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const { data } = await axiosInstance.post<ApiSuccessResponse>(
    "/articles",
    payload,
    config,
  );

  if (!data.data || !data.data.article) {
    throw new Error(
      "Error al crear el artículo, el servidor no contiene los datos del artículo creado.",
    );
  }
  return data.data.article;
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArticleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};
