import { z } from "zod";

export const deliverKeySchema = z.object({
  person_name: z
    .string()
    .trim()
    .min(1, "Selecciona o escribe el nombre de la persona"),
  document: z.string().trim().optional(),
  company: z.string().trim().optional(),
  locker_number: z
    .number({ invalid_type_error: "Selecciona un locker" })
    .int()
    .positive("Selecciona un locker"),
  is_vip: z.boolean(),
  observations: z.string().trim().optional(),
});

export type DeliverKeyForm = z.infer<typeof deliverKeySchema>;
