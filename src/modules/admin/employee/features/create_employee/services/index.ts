import { axiosInstance } from "@/interceptors";
import type { CreateEmployeeForm } from "../types";

export const createEmployee = async (data: CreateEmployeeForm) => {
  const response = await axiosInstance.post("/employee", data);
  return response.data;
};
