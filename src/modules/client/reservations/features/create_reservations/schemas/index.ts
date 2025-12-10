import z from "zod";
import type { Space } from "@/types";

export const reservationSchema = (spaces: Space[]) =>
  z
    .object({
      space_id: z.string().min(1, "Debes seleccionar un espacio"),
      date: z.date({
        required_error: "Debes seleccionar una fecha",
      }),
      start_time: z.string().min(1, "Este campo es requerido"),
      end_time: z.string().min(1, "Este campo es requerido"),
      people: z.number().min(1, "Debe haber al menos 1 persona"),
      full_room: z.boolean(),
    })
    .refine(
      (data) => {
        const selectedSpace = spaces.find(
          (space) => space.id === data.space_id
        );
        if (!selectedSpace) return true;

        if (
          data.people < selectedSpace.capacity_min ||
          data.people > selectedSpace.capacity_max
        ) {
          return false;
        }

        if (data.full_room && !selectedSpace.allow_full_room) {
          return false;
        }

        if (!data.full_room && !selectedSpace.allow_by_unit) {
          return false;
        }

        return true;
      },
      {
        message:
          "La configuración seleccionada no es válida para este espacio. Revisa la capacidad y modalidad permitida.",
        path: ["people"],
      }
    );
