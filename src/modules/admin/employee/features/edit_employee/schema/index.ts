import {
  USER_GENDER_FEMALE,
  USER_GENDER_MALE,
  USER_GENDER_UNSPECIFIED,
} from "@/types";
import { z } from "zod";

export const editEmployeeSchema = z.object({
  first_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  email: z.string().email("Formato de email inválido"),
  password: z.string().refine((val) => val === "" || val.length >= 6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  phone: z
    .string()
    .refine((val) => val === "" || /^\+?[1-9]\d{1,14}$/.test(val), {
      message: "Formato de teléfono inválido",
    }),
  birth_date: z.date().optional(),
  gender: z
    .enum([USER_GENDER_MALE, USER_GENDER_FEMALE, USER_GENDER_UNSPECIFIED])
    .optional(),
  company_id: z.string().refine((val) => val === "" || val.length >= 1, {
    message: "La empresa es requerida",
  }),
  work_area_id: z.string().refine((val) => val === "" || val.length >= 1, {
    message: "El área de trabajo es requerida",
  }),
});
