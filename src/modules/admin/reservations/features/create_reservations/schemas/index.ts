import z from "zod";
import type { Space } from "@/types";

export const reservationSchema = (spaces: Space[]) =>
  z
    .object({
      space_id: z.string().min(1, "Debes seleccionar un espacio"),
      user_id: z.string().min(1, "Debes seleccionar un usuario"),
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

export const createUserSchema = z
  .object({
    first_name: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(1, "El nombre es requerido"),
    last_name: z
      .string({
        required_error: "El apellido es requerido",
      })
      .min(1, "El apellido es requerido"),
    email: z
      .string({
        required_error: "El correo electrónico es requerido",
      })
      .email("El correo electrónico no es válido"),
    password: z
      .string({
        required_error: "La contraseña es requerida",
      })
      .min(1, "La contraseña es requerida"),
    confirm_password: z
      .string({
        required_error: "La confirmación de contraseña es requerida",
      })
      .min(1, "La confirmación de contraseña es requerida"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
  });
