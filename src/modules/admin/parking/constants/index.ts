import type { ParkingRecordStatus, ParkingSpaceStatus } from "../types";

export const SPACE_STATUS_STYLES: Record<
  ParkingSpaceStatus,
  { badge: string; dot: string; label: string }
> = {
  free: {
    badge: "bg-emerald-500/15 text-emerald-700",
    dot: "bg-emerald-500",
    label: "Libre",
  },
  occupied: {
    badge: "bg-stone-200 text-stone-700",
    dot: "bg-stone-500",
    label: "Ocupado",
  },
};

export const RECORD_STATUS_STYLES: Record<
  ParkingRecordStatus,
  { badge: string; label: string }
> = {
  active: { badge: "bg-amber-500/15 text-amber-700", label: "Activo" },
  exited: { badge: "bg-emerald-500/15 text-emerald-700", label: "Salida" },
};

// "2h 5min" a partir de minutos totales.
export const formatDuration = (minutes: number | null): string => {
  if (minutes === null) return "—";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
};

// HH:mm (24h) a partir de un ISO; "—" si es null.
export const formatClock = (iso: string | null): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
