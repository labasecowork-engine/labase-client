// Tipos de dominio de Lockers. Hoy se alimentan con datos mock (ver
// features/view_lockers/services), pero su forma replica los futuros modelos de
// Prisma (locker, locker_delivery y su relación con reservation) para que el
// cambio a la API real sea solo reemplazar el origen de datos.

// Estados visuales de un locker en el mapa.
export const LOCKER_STATUS_FREE = "free";
export const LOCKER_STATUS_OCCUPIED = "occupied";
export const LOCKER_STATUS_VIP = "vip";
export const LOCKER_STATUS_PENDING_KEY = "pending_key";
export const LOCKER_STATUS_EXPIRED_KEY = "expired_key";

export type LockerStatus =
  | "free"
  | "occupied"
  | "vip"
  | "pending_key"
  | "expired_key";

// Origen de una asignación de locker (contrato o reserva puntual).
export type LockerSource = "contract" | "reservation";

// Estado de la llave física en una asignación.
export type LockerKeyStatus = "pending" | "delivered";

export interface Locker {
  id: string;
  number: number;
  status: LockerStatus;
  is_vip: boolean;
}

export interface LockerStats {
  available: number;
  occupied: number;
  vip: number;
  total: number;
}

// Una persona buscable a la que se le puede entregar una llave.
export interface LockerPerson {
  id: string;
  name: string;
  document: string | null;
  company: string | null;
}

// Entrega activa: una llave física entregada a una persona en una fecha/hora.
export interface LockerDelivery {
  id: string;
  locker_number: number;
  person_name: string;
  company: string | null;
  document: string | null;
  delivered_at: string;
  is_vip: boolean;
  returned: boolean;
}

// Asignación de un locker a un contrato o reserva (puede no tener locker fijo).
export interface LockerAssignment {
  id: string;
  locker_number: number | null;
  client_name: string;
  company: string | null;
  source: LockerSource;
  valid_from: string | null;
  valid_to: string | null;
  key_status: LockerKeyStatus;
}

// Datos que el formulario de entrega envía al servicio.
export interface DeliverKeyInput {
  locker_number: number;
  // Usuario registrado al que se entrega, si la persona viene de la búsqueda.
  user_id?: string;
  person_name: string;
  document: string | null;
  company: string | null;
  is_vip: boolean;
  observations: string | null;
}
