import {
  USER_GENDER_FEMALE,
  USER_GENDER_MALE,
  USER_GENDER_UNSPECIFIED,
} from "@/types";
import { z } from "zod";

export const createEmployeeSchema = z.object({
  first_name: z
    .string()
    .min(1, "El nombre es requerido")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z
    .string()
    .min(1, "El apellido es requerido")
    .min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  phone: z
    .string()
    .min(1, "El teléfono es requerido")
    .regex(/^\+?[1-9]\d{1,14}$/, "Formato de teléfono inválido"),
  birth_date: z.date({
    required_error: "La fecha de nacimiento es requerida",
  }),
  gender: z.enum(
    [USER_GENDER_MALE, USER_GENDER_FEMALE, USER_GENDER_UNSPECIFIED],
    {
      required_error: "El género es requerido",
    }
  ),
  company_id: z.string().min(1, "La empresa es requerida").optional(),
  work_area_id: z.string().min(1, "El área de trabajo es requerida").optional(),
});
