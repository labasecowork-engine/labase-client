import { cn } from "@/utilities";
import { AsyncBoundary } from "@/components/ui";
import { LOCKER_LEGEND, LOCKER_STATUS_STYLES } from "../../constants";
import { TableError, TableLoading } from "../states";
import type { Locker } from "../../../../types";

interface Props {
  lockers?: Locker[];
  isLoading: boolean;
  isError: boolean;
  onSelectFree: (lockerNumber: number) => void;
}

const Legend = () => (
  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
    {LOCKER_LEGEND.map((status) => {
      const style = LOCKER_STATUS_STYLES[status];
      return (
        <span
          key={status}
          className="flex items-center gap-1.5 text-xs text-stone-600"
        >
          <span className={cn("size-2.5 rounded-full", style.dot)} />
          {style.label}
        </span>
      );
    })}
  </div>
);

export const LockerMap = ({
  lockers,
  isLoading,
  isError,
  onSelectFree,
}: Props) => (
  <section className="rounded-lg bg-stone-50 p-5">
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-stone-500">
        Toca un locker libre para entregar una llave.
      </p>
      <Legend />
    </div>

    <AsyncBoundary
      isLoading={isLoading}
      isError={isError}
      data={lockers}
      LoadingComponent={<TableLoading />}
      ErrorComponent={<TableError />}
    >
      {(data) => (
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-10">
          {data.map((locker) => {
            const style = LOCKER_STATUS_STYLES[locker.status];
            const isFree = locker.status === "free";
            return (
              <button
                key={locker.id}
                type="button"
                disabled={!isFree}
                onClick={() => onSelectFree(locker.number)}
                title={isFree ? "Entregar llave" : style.label}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-lg border text-sm font-medium tabular-nums transition-colors",
                  style.cell,
                  isFree ? "cursor-pointer" : "cursor-default"
                )}
              >
                {locker.number}
              </button>
            );
          })}
        </div>
      )}
    </AsyncBoundary>
  </section>
);
