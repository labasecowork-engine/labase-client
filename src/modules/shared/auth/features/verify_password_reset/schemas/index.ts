import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z
    .string({
      required_error: "El código es requerido",
    })
    .min(4, "El código debe tener 4 caracteres")
    .max(4),
});
