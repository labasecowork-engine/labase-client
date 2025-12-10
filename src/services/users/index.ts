import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { ListUsersResponse, UserResponse } from "@/types/user";

export const getUsers = async (
  page?: number,
  limit?: number,
  status?: string,
  user_type?: string,
  search?: string
): Promise<ListUsersResponse> => {
  const query = new URLSearchParams();
  if (page) {
    query.set("page", page.toString());
  }
  if (limit) {
    query.set("limit", limit.toString());
  }
  if (status) {
    query.set("status", status);
  }
  if (user_type) {
    query.set("user_type", user_type);
  }
  if (search) {
    query.set("search", search);
  }
  const { data } = await axiosInstance.get<Response<ListUsersResponse>>(
    "/users/list?" + query.toString()
  );
  if (!data.data) {
    throw new Error("No se encontraron usuarios");
  }
  return data.data;
};

export const getProfile = async () => {
  const { data } =
    await axiosInstance.get<Response<UserResponse>>("/users/profile");
  if (!data.data) {
    throw new Error("No se pudo obtener el perfil");
  }
  return data.data;
};
