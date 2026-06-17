import { useEffect, useState } from "react";
import { AsyncBoundary, Button } from "@/components/ui";
import { cn } from "@/utilities";
import { Clock, LogOut } from "lucide-react";
import {
  computeTurno,
  formatClock,
  formatElapsed,
  isOverLimit,
} from "../../../../constants";
import { TableEmpty, TableError, TableLoading } from "../../../../components/states";
import type { ClientAttendance, ExitTarget } from "../../../../types";

interface Props {
  present?: ClientAttendance[];
  isLoading: boolean;
  isError: boolean;
  onExit: (target: ExitTarget) => void;
}

export const PresentPanel = ({ present, isLoading, isError, onExit }: Props) => {
  // Re-render periódico para mantener el "tiempo en vivo" actualizado.
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="rounded-lg bg-stone-50 p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="font-serif text-lg font-bold text-stone-900">
          Presentes ahora
        </h2>
        {present && present.length > 0 && (
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700">
            {present.length}
          </span>
        )}
      </div>

      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        data={present}
        LoadingComponent={<TableLoading />}
        ErrorComponent={<TableError />}
        EmptyComponent={
          <TableEmpty
            title="Nadie presente"
            description="Cuando registres un ingreso, el cliente aparecerá aquí."
          />
        }
      >
        {(rows) => (
          <div className="space-y-2">
            {rows.map((row) => {
              const turno = computeTurno(row.entry_time_1);
              const over = isOverLimit(row);
              return (
                <div
                  key={row.id}
                  className={cn(
                    "rounded-lg border p-3",
                    over ? "border-rose-300 bg-rose-500/5" : "border-stone-200 bg-white"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-stone-900">
                        {row.client_name}
                      </p>
                      {row.company && (
                        <p className="truncate text-xs text-stone-500">
                          {row.company}
                        </p>
                      )}
                    </div>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                        turno.badge
                      )}
                    >
                      {turno.label}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600">
                    <span>
                      Ingreso{" "}
                      <span className="font-medium text-stone-800">
                        {formatClock(row.entry_time_1)}
                      </span>
                    </span>
                    <span>
                      Límite{" "}
                      <span className="font-medium text-stone-800">
                        {formatClock(row.limit_time)}
                      </span>
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                        over
                          ? "bg-rose-500/15 text-rose-700"
                          : "bg-stone-200 text-stone-700"
                      )}
                    >
                      <Clock className="size-3" />
                      {formatElapsed(row.entry_time_1)}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        onExit({ id: row.id, client_name: row.client_name })
                      }
                    >
                      <LogOut className="size-3.5" />
                      Salida
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </AsyncBoundary>
    </section>
  );
};
