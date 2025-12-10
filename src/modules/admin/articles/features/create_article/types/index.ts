import { z } from "zod";
import type { createArticleSchema } from "../schemas";

export type CreateArticleData = z.infer<typeof createArticleSchema>;

// This interface represents what will be sent to the API
export interface CreateArticleApiPayload {
  title: string;
  category_id: string;
  banner: File;
  content: File;
}

// Type for when we send FormData with files
export type CreateArticlePayload = FormData;

// Response interface matching the API response structure
export interface CreateArticleResponse {
  id: string;
  title: string;
  content: string; // URL to content
  banner: string; // URL to banner
  resume: string;
  reading_time: number;
  category_id: string;
  publication_timestamp: string;
  status: string;
}

// API success message structure
export interface ApiSuccessResponse {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data: {
    message: string;
    article: CreateArticleResponse;
  };
}
