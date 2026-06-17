import type { LockerSource, LockerStatus } from "../../../types";

// Estilos por estado para las celdas del mapa de lockers. Se mantiene dentro de
// tonos cálidos/stone del design system; el color refuerza, no es el único
// canal de información (cada celda muestra también su número y la leyenda).
export const LOCKER_STATUS_STYLES: Record<
  LockerStatus,
  { cell: string; dot: string; label: string }
> = {
  free: {
    cell: "bg-stone-50 border-stone-200 text-stone-400 hover:bg-stone-100",
    dot: "bg-stone-300",
    label: "Libre",
  },
  occupied: {
    cell: "bg-yellow-700/20 border-yellow-700/30 text-yellow-900",
    dot: "bg-yellow-700",
    label: "Ocupado",
  },
  vip: {
    cell: "bg-amber-500/25 border-amber-500/40 text-amber-900",
    dot: "bg-amber-500",
    label: "VIP",
  },
  pending_key: {
    cell: "bg-blue-500/15 border-blue-500/30 text-blue-900",
    dot: "bg-blue-500",
    label: "Contrato (pendiente llave)",
  },
  expired_key: {
    cell: "bg-rose-500/15 border-rose-500/30 text-rose-900",
    dot: "bg-rose-500",
    label: "Llave vencida",
  },
};

export const LOCKER_LEGEND: LockerStatus[] = [
  "free",
  "occupied",
  "vip",
  "pending_key",
  "expired_key",
];

export const LOCKER_SOURCE_LABEL: Record<LockerSource, string> = {
  contract: "Contrato",
  reservation: "Reserva",
};
