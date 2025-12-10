import { axiosInstance } from "@/interceptors/";
import type { RawCalendarEvent } from "../types";
import type { Response } from "@/types";

export const getCalendar = async (): Promise<RawCalendarEvent[]> => {
  const { data } =
    await axiosInstance.get<Response<RawCalendarEvent[]>>("/calendar");
  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene la lista de reservas."
    );
  }
  return data.data;
};
