import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: "El correo electrónico es requerido",
    })
    .email("Correo electrónico inválido"),
});
