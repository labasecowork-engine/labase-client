import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { CreateReminderFormData } from "../types";

export const createReminderRequest = async (data: CreateReminderFormData) => {
  await axiosInstance.post<Response>("/reminders", data);
};
