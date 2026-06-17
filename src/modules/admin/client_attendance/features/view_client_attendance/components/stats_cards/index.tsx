import { cn } from "@/utilities";
import type { AttendanceStats } from "../../../../types";

interface StatItem {
  key: keyof AttendanceStats;
  label: string;
  accent: string;
}

const ITEMS: StatItem[] = [
  { key: "present_now", label: "Presentes ahora", accent: "text-emerald-700" },
  { key: "entries_today", label: "Ingresos hoy", accent: "text-stone-900" },
  { key: "over_limit", label: "Pasaron hora límite", accent: "text-rose-700" },
  { key: "total", label: "Total historial", accent: "text-stone-900" },
];

interface Props {
  stats?: AttendanceStats;
  isLoading: boolean;
}

export const StatsCards = ({ stats, isLoading }: Props) => (
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    {ITEMS.map((item) => (
      <div key={item.key} className="rounded-lg bg-stone-50 p-4 text-center">
        <p className={cn("font-serif text-3xl font-bold", item.accent)}>
          {isLoading || !stats ? "—" : stats[item.key]}
        </p>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-stone-500">
          {item.label}
        </p>
      </div>
    ))}
  </div>
);
