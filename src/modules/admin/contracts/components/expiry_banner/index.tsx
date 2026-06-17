import { AlertTriangle } from "lucide-react";
import type { ContractStats } from "../../types";

interface Props {
  stats?: ContractStats;
}

export const ExpiryBanner = ({ stats }: Props) => {
  if (!stats || stats.expiring_soon === 0) return null;

  return (
    <div className="rounded-lg border-l-4 border-amber-500 bg-amber-500/10 p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
        <AlertTriangle className="size-4 shrink-0" />
        {stats.expiring_soon} contrato{stats.expiring_soon > 1 ? "s" : ""} próximo
        {stats.expiring_soon > 1 ? "s" : ""} a vencer (≤ 14 días)
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {stats.expiring.map((item) => (
          <span
            key={item.id}
            className="inline-flex items-center gap-2 rounded-md bg-white px-2 py-1 text-xs shadow-sm"
          >
            <span className="font-medium text-stone-800">
              {item.client_name}
            </span>
            <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 font-medium text-amber-800">
              {item.days} día{item.days === 1 ? "" : "s"}
            </span>
            {item.space_name && (
              <span className="text-stone-500">{item.space_name}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};
