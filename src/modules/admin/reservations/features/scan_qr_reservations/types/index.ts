import type { Space } from "@/types";

export interface AdminUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: string;
  profile_image: string | null;
  phone: string | null;
  birth_date: string | null;
  gender: string | null;
  status: string;
  creation_timestamp: string;
}

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
  user: AdminUser;
}

export interface AdminResolveReservationResponse {
  reservation: AdminReservation;
  status: "upcoming" | "active" | "past";
}

export interface AdminApiResponse {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data: AdminResolveReservationResponse;
}
