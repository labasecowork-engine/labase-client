import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { AttendanceResponse, StatsAttendanceResponse } from "../types";

export const getAttendance = async (
  page: number,
  search: string | undefined,
  workAreaId: string | undefined,
  companyId: string | undefined,
  all: boolean | undefined
): Promise<AttendanceResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "20",
    search: search || "",
  });

  if (workAreaId) {
    params.append("work_area_id", workAreaId);
  }

  if (companyId) {
    params.append("company_id", companyId);
  }

  if (all) {
    params.append("all", all.toString());
  }

  const { data } = await axiosInstance.get<Response<AttendanceResponse>>(
    `/attendance?${params.toString()}`
  );

  if (!data.data) {
    throw new Error("La respuesta del servidor no contiene la asistencia.");
  }
  return data.data;
};

export const statsAttendance = async (): Promise<StatsAttendanceResponse> => {
  const { data } =
    await axiosInstance.get<Response<StatsAttendanceResponse>>(
      `/attendance/stats`
    );

  if (!data.data) {
    throw new Error(
      "La respuesta del servidor no contiene las estadísticas de la asistencia."
    );
  }
  return data.data;
};
