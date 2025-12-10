import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { ConfirmPasswordPayload } from "../types";

export const confirmNewPasswordRequest = async (
  payload: ConfirmPasswordPayload
): Promise<Response> => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/password-reset/confirm",
    payload
  );
  return data;
};
