import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { VerifyParams } from "../types";

export const verifyAccountRequest = async ({
  code,
  email,
}: VerifyParams): Promise<Response> => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/register/verify-code",
    {
      code,
      email,
    }
  );
  return data;
};
