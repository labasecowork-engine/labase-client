import { axiosInstance } from "@/interceptors";

export const createSpaceRequest = async (payload: FormData) => {
  const config =
    payload instanceof FormData
      ? {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      : {};

  await axiosInstance.post("/spaces", payload, config);
};
