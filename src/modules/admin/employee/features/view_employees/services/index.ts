import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { EmployeesResponse } from "../types";

export const getEmployees = async (
  page: number,
  search: string,
  work_area_id?: string,
  company_id?: string
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "10",
    search: search,
  });

  if (work_area_id) {
    params.append("work_area_id", work_area_id);
  }

  if (company_id) {
    params.append("company_id", company_id);
  }

  const response = await axiosInstance.get<Response<EmployeesResponse>>(
    `/employee?${params.toString()}`
  );

  if (!response.data.data) {
    throw new Error("No se encontraron empleados");
  }
  return response.data.data;
};

export const desactivateEmployee = async (userId: string) => {
  const response = await axiosInstance.delete(`/employee/${userId}`);
  return response.data.data;
};

export const activateEmployee = async (userId: string) => {
  const response = await axiosInstance.patch(`/employee/${userId}/activate`);
  return response.data.data;
};
