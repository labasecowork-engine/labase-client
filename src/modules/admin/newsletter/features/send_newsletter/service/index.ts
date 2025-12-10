import { axiosInstance } from "@/interceptors";
import type {
  SendNewsletterData,
  NewsletterResponse,
  SubscriberResponse,
} from "../types";
import type { Response } from "@/types";

export const sendNewsletter = async (
  data: SendNewsletterData
): Promise<NewsletterResponse> => {
  const newData = {
    subject: data.subject,
    text: data.content,
    html: data.content,
  };
  const response = await axiosInstance.post("/bulk_email", newData);
  return response.data;
};

export const getSubscribers = async (): Promise<
  Response<SubscriberResponse>
> => {
  const response = await axiosInstance.get("/newsletter/subscribers");
  return response.data;
};
