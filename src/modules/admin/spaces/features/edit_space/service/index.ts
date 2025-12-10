import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { Space } from "@/types";

export const getSpaceByIdRequest = async (id: string): Promise<Space> => {
  const { data } = await axiosInstance.get<Response<Space>>(`/spaces/${id}`);
  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene los datos del espacio."
    );
  }
  return data.data;
};

export const updateSpaceRequest = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  await axiosInstance.put(`/spaces/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
