import { z } from "zod";
import { editVisitorSchema } from "../schemas";

export type EditVisitorFormData = z.infer<typeof editVisitorSchema>;

export interface UserResponse {
  id: string;
  first_name: string;
  last_name: string;
}
