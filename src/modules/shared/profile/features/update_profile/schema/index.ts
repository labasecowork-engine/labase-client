import { PHONE_REGEX } from "@/constants";
import { z } from "zod";

export const updateProfileSchema = z
  .object({
    firstName: z
      .string()
      .max(50, "El nombre no puede exceder 50 caracteres")
      .optional()
      .or(z.literal("")),
    lastName: z
      .string()
      .max(50, "El apellido no puede exceder 50 caracteres")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .regex(PHONE_REGEX, "El teléfono debe tener entre 9 y 15 dígitos")
      .optional()
      .or(z.literal("")),
    birthDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener formato YYYY-MM-DD")
      .optional()
      .or(z.literal("")),
    gender: z
      .enum(["male", "female", "unspecified"], {
        errorMap: () => ({
          message: "El género debe ser Femenino, Masculino u Otro",
        }),
      })
      .optional(),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.password && data.password !== "") {
        return data.confirmPassword === data.password;
      }
      return true;
    },
    {
      message: "Las contraseñas no coinciden",
      path: ["confirmPassword"],
    }
  );

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
