import { z } from "zod";

export interface EditCategoryPayload {
  name: string;
  description: string;
}

export const editCategorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
});

export type EditCategoryFormData = z.infer<typeof editCategorySchema>;

export interface EditCategoryResponse {
  id: string;
  name: string;
  description: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}
