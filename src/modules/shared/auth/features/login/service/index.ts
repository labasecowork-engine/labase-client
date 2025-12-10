import { axiosInstance } from "@/interceptors";
import type { LoginCredentials, LoginResponse } from "../types";
import type { Response } from "@/types/services";

export const loginRequest = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<Response<LoginResponse>>(
    "/auth/login",
    credentials
  );
  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene los datos esperados."
    );
  }
  return data.data;
};
