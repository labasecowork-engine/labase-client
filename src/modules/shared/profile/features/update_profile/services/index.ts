import { axiosInstance } from "@/interceptors";
import type { UpdateProfileFormData } from "../schema";
import type { Response } from "@/types";
import type { UserResponse } from "@/types/user";

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthDate?: string;
  gender?: "Femenino" | "Masculino" | "Otro";
  password?: string;
  confirmPassword?: string;
}

export const updateProfile = async (
  data: UpdateProfileFormData
): Promise<UserResponse> => {
  const filteredData: UpdateProfileRequest = {};

  if (data.firstName && data.firstName.trim() !== "") {
    filteredData.firstName = data.firstName.trim();
  }

  if (data.lastName && data.lastName.trim() !== "") {
    filteredData.lastName = data.lastName.trim();
  }

  if (data.phone && data.phone.trim() !== "") {
    filteredData.phone = data.phone.trim();
  }

  if (data.birthDate && data.birthDate.trim() !== "") {
    filteredData.birthDate = data.birthDate;
  }

  if (data.gender) {
    filteredData.gender = data.gender as "Femenino" | "Masculino" | "Otro";
  }

  if (data.password && data.password.trim() !== "") {
    filteredData.password = data.password;
    filteredData.confirmPassword = data.confirmPassword;
  }

  const { data: response } = await axiosInstance.put<Response<UserResponse>>(
    "/users/profile",
    filteredData
  );

  if (!response.data) {
    throw new Error(response.message || "Error al actualizar el perfil");
  }

  return response.data;
};
