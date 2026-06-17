import { z } from "zod";

// El precio viaja como string (input). Cuando `is_custom_price` está activo, el
// monto se ignora y se guarda `null` ("A medida").
export const planSchema = z
  .object({
    name: z.string().trim().min(1, "El nombre del plan es requerido"),
    is_custom_price: z.boolean(),
    price: z.string().optional(),
    category: z.enum(["individual", "team", "office", "shared_space"], {
      required_error: "Selecciona una categoría",
    }),
    billing_period: z.string().min(1, "Selecciona un período de cobro"),
    target_audience: z.string().trim().optional(),
    label_color: z.enum(["gold", "blue", "green", "purple", "rose", "stone"]),
    description: z.string().trim().optional(),
    space_ids: z.array(z.string()),
    features: z.array(z.string()),
  })
  .refine(
    (data) =>
      data.is_custom_price ||
      (!!data.price &&
        !Number.isNaN(Number(data.price)) &&
        Number(data.price) >= 0),
    {
      message: "Ingresa un precio válido o marca 'A medida'",
      path: ["price"],
    }
  );

export type PlanForm = z.infer<typeof planSchema>;
