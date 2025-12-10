import { z } from "zod";

export const createVisitorSchema = z.object({
  first_name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  last_name: z.string().min(3, "El apellido debe tener al menos 3 caracteres."),
  dni: z
    .string()
    .max(9, "El DNI no puede exceder 9 caracteres.")
    .min(8, "El DNI debe tener al menos 8 caracteres.")
    .optional(),
  client_id: z
    .string({
      required_error: "El empleado es requerido",
    })
    .nonempty("El empleado es requerido"),
  space_id: z
    .string({
      required_error: "El espacio es requerido",
    })
    .nonempty("El espacio es requerido"),
  entry_time: z
    .string({
      required_error: "La fecha y hora de entrada es requerida",
    })
    .nonempty("La fecha y hora de entrada es requerida"),
  exit_time: z
    .string({
      required_error: "La fecha y hora de salida es requerida",
    })
    .nonempty("La fecha y hora de salida es requerida"),
  phone: z
    .string()
    .min(9, "El teléfono debe tener al menos 9 caracteres.")
    .optional(),
  email: z.string().email("Debe ser un email válido.").optional(),
});
