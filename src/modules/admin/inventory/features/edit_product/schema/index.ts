import { z } from "zod";

export const editProductSchema = z.object({
  productName: z
    .string()
    .min(1, "El nombre del producto es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),
  brand: z.string().min(1, "La marca es requerida"),
  quantity: z.number().min(0, "La cantidad debe ser mayor o igual a 0"),
  unit: z.string().min(1, "La unidad es requerida"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(500, "La descripción no puede exceder 500 caracteres"),
  observations: z.string().optional(),
  images: z
    .array(z.instanceof(File))
    .min(1, "Se requiere al menos una imagen")
    .max(1, "No se pueden subir más de 1 imágenes")
    .optional(),
});
