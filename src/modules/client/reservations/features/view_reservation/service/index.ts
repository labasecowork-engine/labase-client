import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { ResolveReservationResponse } from "../types";

const resolveReservationRequest = async (
  id: string
): Promise<ResolveReservationResponse> => {
  const { data } = await axiosInstance.get<
    Response<ResolveReservationResponse>
  >(`/reservations/${id}`);

  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene los datos de la reserva."
    );
  }

  return data.data;
};

export const useResolveReservation = (id: string) => {
  return useQuery({
    queryKey: ["reservation", id],
    queryFn: () => resolveReservationRequest(id),
    enabled: !!id,
  });
};
