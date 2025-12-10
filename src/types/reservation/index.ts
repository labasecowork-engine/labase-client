export interface Reservation {
  id: string;
  client: string;
  date: string;
  time: string;
  people: number;
  total: string;
  space: string;
  full_space: boolean;
}

export const RESERVATION_STATUS_PENDING = "pending" as const;
export const RESERVATION_STATUS_CONFIRMED = "confirmed" as const;
export const RESERVATION_STATUS_CANCELLED = "cancelled" as const;
export const RESERVATION_STATUS_IN_PROGRESS = "in_progress" as const;
