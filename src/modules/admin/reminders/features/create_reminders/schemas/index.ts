import { z } from "zod";

export const CreateReminderSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  phone_number: z.string().min(1, "El teléfono es requerido"),
  message: z.string().min(1, "El mensaje es requerido"),
  send_date: z.string().min(1, "La fecha de envío es requerida"),
  frequency: z.string().min(1, "La frecuencia es requerida"),
});
