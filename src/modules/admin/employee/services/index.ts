import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { CreateCompanyForm, CreateWorkAreaForm } from "../types";
import type { Company, WorkArea } from "@/types/employee";

export const createCompany = async (data: CreateCompanyForm) => {
  const response = await axiosInstance.post("/company", data);
  return response.data;
};

export const updateCompany = async (id: string, data: CreateCompanyForm) => {
  const response = await axiosInstance.patch(`/company/${id}`, data);
  return response.data;
};

export const createWorkArea = async (data: CreateWorkAreaForm) => {
  const response = await axiosInstance.post("/workarea", data);
  return response.data;
};

export const getCompanies = async (): Promise<Company[]> => {
  const { data } = await axiosInstance.get<Response<Company[]>>("/company");
  if (!data.data) {
    throw new Error("No se pudo obtener las empresas");
  }
  return data.data;
};

export const getAreas = async (): Promise<WorkArea[]> => {
  const { data } = await axiosInstance.get<Response<WorkArea[]>>("/workarea");
  if (!data.data) {
    throw new Error("No se pudo obtener las áreas");
  }
  return data.data;
};

export const updateWorkArea = async (id: string, data: CreateWorkAreaForm) => {
  const response = await axiosInstance.patch(`/workarea/${id}`, data);
  return response.data;
};

export const deleteWorkArea = async (id: string) => {
  const response = await axiosInstance.delete(`/workarea/${id}`);
  return response.data;
};

export const deleteCompany = async (id: string) => {
  const response = await axiosInstance.delete(`/company/${id}`);
  return response.data;
};
