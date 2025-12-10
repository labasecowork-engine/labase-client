import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { VerifyParams } from "../types";

export const verifyPasswordResetRequest = async ({
  code,
  email,
}: VerifyParams): Promise<Response> => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/password-reset/verify-code",
    {
      code,
      email,
    }
  );
  return data;
};
