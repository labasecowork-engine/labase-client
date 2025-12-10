import { z } from "zod";

export const sendNewsletterSchema = z.object({
  subject: z
    .string()
    .min(1, "El asunto es requerido")
    .min(5, "El asunto debe tener al menos 5 caracteres")
    .max(100, "El asunto no puede exceder 100 caracteres"),
  content: z
    .string()
    .min(1, "El contenido es requerido")
    .min(10, "El contenido debe tener al menos 10 caracteres")
    .max(5000, "El contenido no puede exceder 5000 caracteres"),
});
