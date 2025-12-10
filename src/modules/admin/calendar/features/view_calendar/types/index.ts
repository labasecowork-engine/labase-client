export interface CalendarEvent {
  id: string;
  title?: string;
  space?: string;
  cliente?: string;
  start_time: string;
  end_time: string;
  day: number;
  color?: string;
}

export interface SocketReservation {
  reservation_id: string;
  space_name: string;
  start_time: string;
  end_time: string;
}

export interface RawCalendarEvent {
  id: string;
  space: string;
  cliente: string;
  start_time: string;
  end_time: string;
  day: number;
}
