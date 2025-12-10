import { z } from "zod";
import { createVisitorSchema } from "../schemas";

export type CreateVisitorFormData = z.infer<typeof createVisitorSchema>;

export interface SearchVisitorResponse {
  first_name: string;
  last_name: string;
  dni: string;
}

export interface UserResponse {
  id: string;
  first_name: string;
  last_name: string;
}
