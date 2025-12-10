import { axiosInstance } from "@/interceptors";

export const deactivateSpaceRequest = async (spaceId: string) => {
  await axiosInstance.patch(`/spaces/${spaceId}/deactivate`);
};

export const activateSpaceRequest = async (spaceId: string) => {
  await axiosInstance.patch(`/spaces/${spaceId}/activate`);
};
