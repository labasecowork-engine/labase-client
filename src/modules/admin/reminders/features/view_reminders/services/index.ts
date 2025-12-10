import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { RemindersResponse } from "../types";

export const getReminders = async (
  page: number,
  search?: string,
  status?: string
): Promise<RemindersResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("page", page.toString());
  queryParams.append("limit", "12");
  if (search) {
    queryParams.append("search", search);
  }
  if (status) {
    const isActive = status === "active" ? 1 : 0;
    queryParams.append("is_active", isActive.toString());
  }
  const { data } = await axiosInstance.get<Response<RemindersResponse>>(
    `/reminders?${queryParams.toString()}`
  );
  if (!data.data) {
    throw new Error("No se encontraron recordatorios");
  }
  return data.data;
};

export const removeReminderRequest = async (id: string) => {
  await axiosInstance.delete<Response>(`/reminders/${id}`);
};

export const deactivateReminderRequest = async (id: string) => {
  await axiosInstance.patch<Response>(`/reminders/deactivate/${id}`);
};

export const activateReminderRequest = async (id: string) => {
  await axiosInstance.patch<Response>(`/reminders/activate/${id}`);
};
