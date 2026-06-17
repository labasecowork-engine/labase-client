import { z } from "zod";

export const registerEntrySchema = z.object({
  client_name: z.string().trim().min(1, "El nombre del cliente es requerido"),
  company: z.string().trim().optional(),
  plate: z.string().trim().min(1, "La placa es requerida"),
  space_id: z.string().min(1, "Selecciona un espacio"),
  date: z.string().min(1, "La fecha es requerida"),
  entry_time: z.string().min(1, "La hora de ingreso es requerida"),
  observations: z.string().trim().optional(),
});

export type RegisterEntryForm = z.infer<typeof registerEntrySchema>;
