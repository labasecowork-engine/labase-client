import type z from "zod";
import type { createUserSchema, reservationSchema } from "../schemas";

export type Duration = "hour" | "day" | "week" | "month";
export type SpaceType = "full_room" | "individual";
export type SpaceAccess = "public" | "private";

export interface AvailabilityRequest {
  space_id: string;
  start_time: string;
  end_time: string;
}

export interface AvailabilityResponse {
  available: boolean;
}

export interface CreateReservationRequest {
  space_id: string;
  start_time: string;
  end_time: string;
  people: number;
  full_room: boolean;
  user_id: string;
}

export interface CreateReservationResponse {
  reservation_id: string;
  code_qr: string;
  user: {
    id: string;
    user_type: "admin" | "client";
    status: "active" | "inactive";
    admin_details: null | unknown;
  };
}

type ReservationSchemaFunction = typeof reservationSchema;
export type ReservationFormData = z.infer<
  ReturnType<ReservationSchemaFunction>
>;

export type CreateUserFormData = z.infer<typeof createUserSchema>;
