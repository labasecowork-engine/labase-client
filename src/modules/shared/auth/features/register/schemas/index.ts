import { z } from "zod";

export const registerSchema = z
  .object({
    first_name: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(1, "El nombre es requerido"),
    last_name: z
      .string({
        required_error: "El apellido es requerido",
      })
      .min(1, "El apellido es requerido"),
    email: z
      .string({
        required_error: "El correo electrónico es requerido",
      })
      .email("Correo electrónico inválido"),
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
