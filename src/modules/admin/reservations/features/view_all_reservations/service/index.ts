import { axiosInstance } from "@/interceptors";
import type { ReservationResponse } from "../types";
import type { Response } from "@/types/services";

export const getReservationsRequest = async (
  page: number,
  spaceId: string | undefined,
  status: string | undefined,
  dateRange: { from?: string; to?: string } | undefined,
  search: string | undefined
): Promise<ReservationResponse> => {
  const queryParams = new URLSearchParams();

  if (spaceId) {
    queryParams.append("spaceId", spaceId);
  }

  if (status) {
    queryParams.append("status", status);
  }

  if (dateRange?.from) {
    queryParams.append("from", dateRange.from);
  }

  if (dateRange?.to) {
    queryParams.append("to", dateRange.to);
  }

  if (search) {
    queryParams.append("search", search);
  }

  const { data } = await axiosInstance.get<Response<ReservationResponse>>(
    `/reservations?${queryParams.toString()}&page=${page}&limit=10`
  );
  if (!data.data) {
    throw new Error("No se encontraron reservas");
  }
  return data.data;
};
