import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { EditReminderFormData } from "../types";
import type { Reminder } from "@/types";

export const editReminderRequest = async (
  data: EditReminderFormData,
  id: string
) => {
  await axiosInstance.put<Response>(`/reminders/${id}`, data);
};

export const getReminderByIdRequest = async (id: string): Promise<Reminder> => {
  const { data } = await axiosInstance.get<Response<Reminder>>(
    `/reminders/${id}`
  );
  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene los datos del recordatorio."
    );
  }
  return data.data;
};
