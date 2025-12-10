import { axiosInstance } from "@/interceptors";

export const createProductRequest = async (payload: FormData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  await axiosInstance.post("/inventory/products", payload, config);
};
