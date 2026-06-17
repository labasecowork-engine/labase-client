import { cn } from "@/utilities";
import type { LockerStats } from "../../../../types";

interface StatItem {
  key: keyof LockerStats;
  label: string;
  accent: string;
}

const ITEMS: StatItem[] = [
  { key: "available", label: "Disponibles", accent: "text-emerald-700" },
  { key: "occupied", label: "Ocupados", accent: "text-yellow-800" },
  { key: "vip", label: "VIP", accent: "text-amber-600" },
  { key: "total", label: "Total", accent: "text-stone-900" },
];

interface Props {
  stats?: LockerStats;
  isLoading: boolean;
}

export const StatsCards = ({ stats, isLoading }: Props) => (
  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
    {ITEMS.map((item) => (
      <div key={item.key} className="rounded-lg bg-stone-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
          {item.label}
        </p>
        <p className={cn("mt-1 font-serif text-3xl font-bold", item.accent)}>
          {isLoading || !stats ? "—" : stats[item.key]}
        </p>
      </div>
    ))}
  </div>
);
