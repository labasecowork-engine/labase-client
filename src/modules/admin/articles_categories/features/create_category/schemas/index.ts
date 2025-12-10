import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().default(""),
});

export type CreateCategoryData = z.infer<typeof createCategorySchema>;
