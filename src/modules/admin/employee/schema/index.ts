import z from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
});

export const createWorkAreaSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  capacity: z.coerce
    .number({
      required_error: "La capacidad es requerida",
      message: "La capacidad debe ser un número",
    })
    .min(1, "La capacidad debe ser mayor a 0"),
});
