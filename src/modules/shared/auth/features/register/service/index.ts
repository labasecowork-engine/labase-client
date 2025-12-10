import { axiosInstance } from "@/interceptors";
import type { RegisterData } from "../types";
import type { Response } from "@/types/services";

export const registerRequest = async (
  registerData: RegisterData
): Promise<Response> => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/register/request",
    registerData
  );
  return data;
};
