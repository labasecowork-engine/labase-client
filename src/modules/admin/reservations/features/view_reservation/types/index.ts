import type { Space } from "@/types";

export interface AdminReservation {
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
  status: string;
  user: {
    first_name: string;
    last_name: string;
  };
}

export interface AdminReservationResponse {
  reservation: AdminReservation;
  status: "upcoming" | "active" | "past";
}
