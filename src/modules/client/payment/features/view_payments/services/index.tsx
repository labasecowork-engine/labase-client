import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { PaymentResponse } from "../types";

export const getPayments = async (): Promise<PaymentResponse[]> => {
  const { data } = await axiosInstance.get<Response<PaymentResponse[]>>(
    "/payment/result"
  );
  if (!data.data) {
    throw new Error("No se encontraron pagos");
  }
  return data.data;
};
