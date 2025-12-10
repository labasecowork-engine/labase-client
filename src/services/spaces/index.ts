import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { Space } from "@/types/spaces";

export const getSpacesRequest = async (): Promise<Space[]> => {
  const { data } =
    await axiosInstance.get<Response<Space[]>>("/spaces?status=all");
  if (!data.data) {
    throw new Error("Error al obtener los espacios");
  }
  return data.data;
};
