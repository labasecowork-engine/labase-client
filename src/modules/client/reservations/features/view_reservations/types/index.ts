import type { Pagination } from "@/types/services";

export interface MyReservation {
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
  status: string;
  space: {
    name: string;
    space_images: {
      id: string;
      url: string;
      alt: string;
      position: number;
    }[];
  };
}

export interface MyReservationsResponse {
  reservations: MyReservation[];
  pagination: Pagination;
}
