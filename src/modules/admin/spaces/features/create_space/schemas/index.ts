import {
  ACCESS_TYPE_PRIVATE,
  ACCESS_TYPE_PUBLIC,
  DURATION_UNIT_DAY,
  DURATION_UNIT_HOUR,
  DURATION_UNIT_MONTH,
  DURATION_UNIT_WEEK,
  PRICE_MODE_GROUP,
  PRICE_MODE_INDIVIDUAL,
  SPACE_TYPE_FULL_ROOM,
  SPACE_TYPE_SHARED_SITE,
  SPACE_TYPE_UNIT,
} from "@/types";
import { z } from "zod";

const priceSchema = z.object({
  id: z.string().optional(),
  duration: z.enum(
    [
      DURATION_UNIT_HOUR,
      DURATION_UNIT_DAY,
      DURATION_UNIT_WEEK,
      DURATION_UNIT_MONTH,
    ],
    {
      required_error: "La duración es requerida",
      invalid_type_error: "La duración debe ser: hora, día, semana o mes",
    }
  ),
  amount: z.number().min(0, "El valor debe ser positivo"),
  mode: z.enum([PRICE_MODE_INDIVIDUAL, PRICE_MODE_GROUP], {
    required_error: "El modo es requerido",
    invalid_type_error: "El modo debe ser: individual o grupal",
  }),
});

export const createSpaceSchema = z
  .object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    description: z.string().optional(),
    type: z.enum(
      [SPACE_TYPE_UNIT, SPACE_TYPE_SHARED_SITE, SPACE_TYPE_FULL_ROOM],
      {
        required_error: "El tipo de espacio es requerido",
        invalid_type_error:
          "El tipo debe ser: unidad, sitio compartido o habitación completa",
      }
    ),
    access: z.enum([ACCESS_TYPE_PUBLIC, ACCESS_TYPE_PRIVATE], {
      required_error: "El tipo de acceso es requerido",
      invalid_type_error: "El acceso debe ser: público o privado",
    }),
    capacity_min: z.number().min(1, "La capacidad mínima debe ser al menos 1"),
    capacity_max: z.number().min(1, "La capacidad máxima debe ser al menos 1"),
    allow_by_unit: z.boolean({
      required_error: "Debe especificar si permite reserva por unidad",
    }),
    allow_full_room: z.boolean({
      required_error:
        "Debe especificar si permite reserva de habitación completa",
    }),
    prices: z.array(priceSchema).min(1, "Debes agregar al menos un precio"),
  })
  .refine((data) => data.capacity_max >= data.capacity_min, {
    message: "La capacidad máxima no puede ser menor que la mínima",
    path: ["capacity_max"],
  });
