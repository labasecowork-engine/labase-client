import type { Pagination } from "@/types";

export interface Reservation {
  id: string;
  user_id: string;
  space_id: string;
  start_time: string;
  end_time: string;
  status?: string;
  people: number;
  full_room: boolean;
  code_qr: string;
  price: string;
  created_at: string;
  user: {
    first_name: string;
    last_name: string;
  };
  space: {
    name: string;
    space_images: string[];
  };
}

export interface ReservationResponse {
  data: Reservation[];
  pagination: Pagination;
}
