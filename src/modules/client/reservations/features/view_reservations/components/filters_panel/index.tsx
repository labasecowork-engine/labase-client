import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Popover,
  Button,
  PopoverTrigger,
  PopoverContent,
  Calendar,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import {
  RESERVATION_STATUS_CANCELLED,
  RESERVATION_STATUS_IN_PROGRESS,
  RESERVATION_STATUS_CONFIRMED,
  RESERVATION_STATUS_PENDING,
} from "@/types/reservation";
import type { Space } from "@/types/spaces";
import { formatDateRange } from "@/utilities";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import type { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

interface Props {
  dateRange: DateRange | undefined;
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
  clearDateRange: () => void;
  selectedSpaceId: string | undefined;
  spaces: Space[];
  isErrorSpaces: boolean;
  isLoadingSpaces: boolean;
  selectedStatus: string | undefined;
  onStatusChange: (value: string | undefined) => void;
  onSpaceChange: (value: string | undefined) => void;
}

export const FiltersPanel: React.FC<Props> = ({
  dateRange,
  onDateRangeChange,
  clearDateRange,
  selectedSpaceId,
  spaces,
  isErrorSpaces,
  isLoadingSpaces,
  onSpaceChange,
  selectedStatus,
  onStatusChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criterios de búsqueda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full">
            <Label className="mb-2 block">Rango de fechas</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className={twMerge(
                    "w-full h-[38px] rounded-lg bg-white border border-stone-200 justify-start text-left font-normal text-stone-700 px-4 hover:bg-stone-50",
                    dateRange ? "text-stone-700" : "text-stone-500"
                  )}
                >
                  <CalendarDateRangeIcon className=" h-4 w-4" />
                  {formatDateRange()}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={onDateRangeChange}
                  numberOfMonths={2}
                />
                <div className="flex items-center justify-between p-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearDateRange}
                    className="text-xs"
                  >
                    Limpiar
                  </Button>
                  <div className="text-xs text-muted-foreground">
                    {dateRange?.from && dateRange?.to && (
                      <span>
                        {format(dateRange.from, "dd/MM/yyyy", { locale: es })} -{" "}
                        {format(dateRange.to, "dd/MM/yyyy", { locale: es })}
                      </span>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label className="mb-2 block">Espacio</Label>
            <div className="flex items-center gap-4">
              <Select
                onValueChange={(value) =>
                  onSpaceChange(value === "all" ? undefined : value)
                }
                value={selectedSpaceId ?? "all"}
              >
                <SelectTrigger className="w-[200px]">
                  {" "}
                  <SelectValue placeholder="Filtrar por espacio" />
                </SelectTrigger>
                <SelectContent>
                  {isErrorSpaces ? (
                    <SelectItem
                      value="error"
                      disabled
                      className="text-rose-800 flex items-center gap-2"
                    >
                      <ExclamationTriangleIcon className="size-4" />
                      Error al cargar
                    </SelectItem>
                  ) : isLoadingSpaces ? (
                    <SelectItem value="loading" disabled>
                      Cargando espacios...
                    </SelectItem>
                  ) : (
                    <>
                      <SelectItem value="all">Todos los espacios</SelectItem>
                      {spaces.length === 0 ? (
                        <SelectItem value="empty" disabled>
                          No hay espacios
                        </SelectItem>
                      ) : (
                        spaces.map((space) => (
                          <SelectItem key={space.id} value={space.id}>
                            {space.name}
                          </SelectItem>
                        ))
                      )}
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-[200px]">
            <Label className="mb-2 block">Estado</Label>
            <Select
              onValueChange={(value) =>
                onStatusChange(value === "all" ? undefined : value)
              }
              value={selectedStatus || "all"}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value={RESERVATION_STATUS_PENDING}>
                  Pendiente
                </SelectItem>
                <SelectItem value={RESERVATION_STATUS_CONFIRMED}>
                  Confirmada
                </SelectItem>
                <SelectItem value={RESERVATION_STATUS_CANCELLED}>
                  Cancelada
                </SelectItem>
                <SelectItem value={RESERVATION_STATUS_IN_PROGRESS}>
                  En progreso
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
