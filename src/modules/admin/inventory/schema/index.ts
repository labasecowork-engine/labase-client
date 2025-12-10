import { z } from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});
