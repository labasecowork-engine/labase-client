import {
  AsyncSelect,
  Button,
  Calendar,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  RESERVATION_STATUS_CANCELLED,
  RESERVATION_STATUS_CONFIRMED,
  RESERVATION_STATUS_IN_PROGRESS,
  RESERVATION_STATUS_PENDING,
} from "@/types/reservation";
import type { Space } from "@/types/spaces";
import { formatDateRange } from "@/utilities";
import { CalendarDateRangeIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

interface ReservationFiltersProps {
  search: string;
  selectedSpaceId: string | undefined;
  selectedStatus: string | undefined;
  dateRange: DateRange | undefined;

  spaces: Space[];
  isLoadingSpaces: boolean;
  isErrorSpaces: boolean;

  onSearchChange: (value: string) => void;
  onSpaceChange: (spaceId: string | undefined) => void;
  onStatusChange: (status: string | undefined) => void;
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
}

export function ReservationFilters({
  search,
  selectedSpaceId,
  selectedStatus,
  dateRange,
  spaces,
  isLoadingSpaces,
  isErrorSpaces,
  onSearchChange,
  onSpaceChange,
  onStatusChange,
  onDateRangeChange,
}: ReservationFiltersProps) {
  const clearDateRange = () => {
    onDateRangeChange(undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criterios de búsqueda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
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

          <div className="w-[200px]">
            <AsyncSelect
              label="Espacio"
              onChange={(value) => onSpaceChange(value)}
              value={selectedSpaceId}
              placeholder="Seleccionar espacio"
              className="w-[200px]"
              options={spaces}
              isLoading={isLoadingSpaces}
              isError={isErrorSpaces}
            />
          </div>
          <div className="w-[200px]">
            <Label className="mb-2 block">Estado</Label>
            <Select
              onValueChange={(value) =>
                onStatusChange(value === "ALL" ? undefined : value)
              }
              value={selectedStatus || "ALL"}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                <SelectItem value={RESERVATION_STATUS_PENDING}>
                  Pendientes
                </SelectItem>
                <SelectItem value={RESERVATION_STATUS_CONFIRMED}>
                  Confirmadas
                </SelectItem>
                <SelectItem value={RESERVATION_STATUS_CANCELLED}>
                  Canceladas
                </SelectItem>
                <SelectItem value={RESERVATION_STATUS_IN_PROGRESS}>
                  En progreso
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full mt-4">
          <Label className="mb-2 block">Buscador</Label>
          <Input
            type="text"
            placeholder="Buscar por nombre de cliente..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
