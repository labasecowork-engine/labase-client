import type {
  AttendanceSource,
  AttendanceStatus,
  ClientAttendance,
} from "../types";

export const STATUS_STYLES: Record<
  AttendanceStatus,
  { badge: string; label: string }
> = {
  present: { badge: "bg-amber-500/15 text-amber-700", label: "Presente" },
  exited: { badge: "bg-emerald-500/15 text-emerald-700", label: "Salió" },
};

export const SOURCE_LABEL: Record<AttendanceSource, string> = {
  contract: "Contrato",
  reservation: "Reserva",
};

// Turno según la hora de ingreso.
export const computeTurno = (
  iso: string
): { label: string; badge: string } => {
  const hour = new Date(iso).getHours();
  if (hour < 12)
    return { label: "T1 mañana", badge: "bg-blue-500/15 text-blue-700" };
  if (hour < 18)
    return { label: "T2 tarde", badge: "bg-amber-500/15 text-amber-700" };
  return { label: "T3 noche", badge: "bg-indigo-500/15 text-indigo-700" };
};

export const formatDuration = (minutes: number | null): string => {
  if (minutes === null) return "—";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
};

export const formatClock = (iso: string | null): string => {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

// Tiempo transcurrido en vivo desde el ingreso (panel "presentes ahora").
export const formatElapsed = (fromIso: string): string => {
  const mins = Math.max(
    0,
    Math.round((Date.now() - new Date(fromIso).getTime()) / 60000)
  );
  const hours = Math.floor(mins / 60);
  return `${hours}h ${mins % 60}m`;
};

export const isOverLimit = (record: ClientAttendance): boolean =>
  record.status === "present" &&
  record.limit_time !== null &&
  Date.now() > new Date(record.limit_time).getTime();
