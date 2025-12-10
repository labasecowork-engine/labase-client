import { z } from "zod";
import { sendNewsletterSchema } from "../schemas";

export type SendNewsletterData = z.infer<typeof sendNewsletterSchema>;

export interface SubscriberResponse {
  subscribers: Subscriber[];
  total: number;
  count: number;
}

export interface Subscriber {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface NewsletterResponse {
  message: string;
  recipients_count: number;
}
