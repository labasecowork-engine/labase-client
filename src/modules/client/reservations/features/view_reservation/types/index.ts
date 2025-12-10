import type { Space } from "@/types";
import type { User } from "@/types/user";

export interface Reservation {
  id: string;
  user_id: string;
  space_id: string;
  start_time: string;
  end_time: string;
  people: number;
  full_room: boolean;
  code_qr: string;
  price: string;
  created_at: string;
  space: Space;
  user: User;
  status: string;
}

export interface ResolveReservationResponse {
  reservation: Reservation;
  status: "upcoming" | "active" | "past";
}
