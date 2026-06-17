import { cn } from "@/utilities";
import type { PlanStats } from "../../types";

interface StatItem {
  key: keyof PlanStats;
  label: string;
  accent: string;
}

const ITEMS: StatItem[] = [
  { key: "total", label: "Total planes", accent: "text-stone-900" },
  { key: "individual", label: "Individual", accent: "text-indigo-700" },
  { key: "team", label: "Equipos", accent: "text-cyan-700" },
  { key: "office", label: "Oficinas", accent: "text-fuchsia-700" },
  { key: "shared_space", label: "Espacios compartidos", accent: "text-teal-700" },
];

interface Props {
  stats?: PlanStats;
  isLoading: boolean;
}

export const PlanStatsCards = ({ stats, isLoading }: Props) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
