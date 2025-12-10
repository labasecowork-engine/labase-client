import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types/services";
import type { Message } from "../types";
import { formatDate } from "date-fns";

export const sendMessage = async (message: string) => {
  const response = await axiosInstance.post("/communication/messages", {
    message,
  });
  return response.data;
};

const groupMessagesByDate = (messages: Message[]) => {
  const grouped: { [key: string]: Message[] } = {};

  messages.forEach((message) => {
    const dateKey = formatDate(message.created_at, "yyyy-MM-dd");
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(message);
  });

  return grouped;
};

export const getMessages = async () => {
  const { data } = await axiosInstance.get<Response<Message[]>>(
    "/communication/messages"
  );
  if (!data.data) {
    throw new Error("No se encontraron mensajes");
  }
  return groupMessagesByDate(data.data);
};
