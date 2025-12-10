import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { AdminResolveReservationResponse } from "../types";

export const resolveReservationRequest = async (
  code: string
): Promise<AdminResolveReservationResponse> => {
  const { data } = await axiosInstance.post<
    Response<AdminResolveReservationResponse>
  >("/reservations/resolve", { code });

  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene los datos de la reserva."
    );
  }
  return data.data;
};
