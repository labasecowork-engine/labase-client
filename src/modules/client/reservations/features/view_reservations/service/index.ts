import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { MyReservationsResponse } from "../types";
import type { DateRange } from "react-day-picker";

export const getMyReservationsRequest = async (
  spaceIdFilter?: string,
  statusFilter?: string,
  dateRange?: DateRange,
  page?: number
): Promise<MyReservationsResponse> => {
  const queryParams = new URLSearchParams();

  if (spaceIdFilter) {
    queryParams.append("space_id", spaceIdFilter);
  }

  if (statusFilter) {
    queryParams.append("status", statusFilter);
  }

  if (dateRange?.from) {
    queryParams.append("date_from", dateRange.from.toISOString());
  }

  if (dateRange?.to) {
    queryParams.append("date_to", dateRange.to.toISOString());
  }

  if (page) {
    queryParams.append("page", page.toString());
  }

  const { data } = await axiosInstance.get<Response<MyReservationsResponse>>(
    `/reservations/me?limit=9&${queryParams.toString()}`
  );
  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene la lista de reservas."
    );
  }
  return data.data;
};

export const cancelReservationRequest = async (
  reservationId: string,
  reason?: string
) => {
  return await axiosInstance.patch(`/reservations/${reservationId}/cancel`, {
    reason,
  });
};
