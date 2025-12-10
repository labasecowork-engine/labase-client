import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { VisitorsResponse } from "../types";
import type { DateRange } from "react-day-picker";

export const getVisitors = async (
  page: number,
  search?: string,
  spaceId?: string,
  dateRange?: DateRange,
  userId?: string
): Promise<VisitorsResponse> => {
  const queryParams = new URLSearchParams();
  if (search) {
    queryParams.append("search", search);
  }
  if (spaceId) {
    queryParams.append("space_id", spaceId);
  }
  if (dateRange?.from) {
    queryParams.append("date_from", dateRange.from.toISOString());
  }
  if (dateRange?.to) {
    queryParams.append("date_to", dateRange.to.toISOString());
  }
  if (userId) {
    queryParams.append("user_id", userId);
  }
  const { data } = await axiosInstance.get<Response<VisitorsResponse>>(
    `/visitors?${queryParams.toString()}&page=${page}&limit=10`
  );
  if (data.data === undefined) {
    throw new Error("No se encontraron visitantes");
  }
  return data.data;
};

export const deleteVisitor = async (id: string) => {
  await axiosInstance.delete(`/visitors/${id}`);
};
