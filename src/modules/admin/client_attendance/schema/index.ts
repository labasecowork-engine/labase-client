import { z } from "zod";

export const registerAttendanceSchema = z.object({
  client_name: z.string().trim().min(1, "El nombre del cliente es requerido"),
  company: z.string().trim().optional(),
  date: z.string().min(1, "La fecha es requerida"),
  entry_time: z.string().min(1, "La hora de ingreso es requerida"),
  limit_time: z.string().optional(),
  locker_ref: z.string().trim().optional(),
  observations: z.string().trim().optional(),
});

export type RegisterAttendanceForm = z.infer<typeof registerAttendanceSchema>;

export const editAttendanceSchema = z.object({
  client_name: z.string().trim().min(1, "El nombre es requerido"),
  company: z.string().trim().optional(),
  entry_time_1: z.string().min(1, "La hora de ingreso es requerida"),
  exit_time_1: z.string().optional(),
  limit_time: z.string().optional(),
  locker_ref: z.string().trim().optional(),
  observations: z.string().trim().optional(),
});

export type EditAttendanceForm = z.infer<typeof editAttendanceSchema>;
