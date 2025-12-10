import { z } from "zod";

export const changePasswordSchema = z
  .object({
    password: z
      .string({
        required_error: "La contraseña es requerida",
      })
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirm_password: z
      .string({
        required_error: "La contraseña es requerida",
      })
      .min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
  });
