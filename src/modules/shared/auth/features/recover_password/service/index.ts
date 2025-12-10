import { axiosInstance } from "@/interceptors";
import type { ForgotPasswordData } from "../types";
import type { Response } from "@/types/services";

export const requestPasswordResetRequest = async (
  resetData: ForgotPasswordData
): Promise<Response> => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/password-reset/request",
    resetData
  );
  return data;
};
