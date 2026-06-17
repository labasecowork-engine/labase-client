import { AsyncBoundary, Button } from "@/components/ui";
import { cn } from "@/utilities";
import { LogOut } from "lucide-react";
import { SPACE_STATUS_STYLES } from "../../../../constants";
import { TableError, TableLoading } from "../../../../components/states";
import type { ExitTarget, ParkingSpace } from "../../../../types";

interface Props {
  spaces?: ParkingSpace[];
  isLoading: boolean;
  isError: boolean;
  selectedSpaceId?: string;
  onSelectFree: (spaceId: string) => void;
  onExit: (target: ExitTarget) => void;
}

const Legend = () => (
  <div className="flex items-center gap-3 text-xs text-stone-600">
    {(["free", "occupied"] as const).map((status) => (
      <span key={status} className="flex items-center gap-1.5">
        <span className={cn("size-2.5 rounded-full", SPACE_STATUS_STYLES[status].dot)} />
        {SPACE_STATUS_STYLES[status].label}
      </span>
    ))}
  </div>
);

export const SpacesPanel = ({
  spaces,
  isLoading,
  isError,
  selectedSpaceId,
  onSelectFree,
  onExit,
}: Props) => (
  <section className="rounded-lg bg-stone-50 p-5">
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="font-serif text-lg font-bold text-stone-900">Espacios</h2>
      <Legend />
    </div>

    <AsyncBoundary
      isLoading={isLoading}
      isError={isError}
      data={spaces}
      LoadingComponent={<TableLoading />}
      ErrorComponent={<TableError />}
    >
      {(data) => (
        <div className="space-y-2">
          {data.map((space) => {
            const style = SPACE_STATUS_STYLES[space.status];
            const isFree = space.status === "free";
            const isSelected = space.id === selectedSpaceId;
            return (
              <div
                key={space.id}
                onClick={isFree ? () => onSelectFree(space.id) : undefined}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-lg border bg-white p-3 transition-colors",
                  isFree && "cursor-pointer hover:bg-stone-100",
                  isSelected ? "border-stone-900" : "border-stone-200"
                )}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-stone-900 text-xs font-semibold text-white">
                    {space.code}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-stone-900">{space.code}</p>
                    <p className="truncate text-xs text-stone-500">
                      {space.current
                        ? `${space.current.client_name} · ${space.current.plate}`
                        : "Disponible"}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", style.badge)}>
                    {style.label}
                  </span>
                  {!isFree && space.current && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onExit({
                          id: space.current!.record_id,
                          client_name: space.current!.client_name,
                          space_code: space.code,
                        });
                      }}
                    >
                      <LogOut className="size-3.5" />
                      Salida
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AsyncBoundary>
  </section>
);
