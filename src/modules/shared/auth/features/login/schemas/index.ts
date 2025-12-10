import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "El correo electrónico es requerido",
    })
    .email("Correo electrónico inválido"),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(1, "La contraseña es requerida"),
});
