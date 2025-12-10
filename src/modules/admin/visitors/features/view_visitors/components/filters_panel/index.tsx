import {
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
import type { Space, UserResponse } from "@/types";
import { formatDateRange } from "@/utilities";
import {
  CalendarDateRangeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import type { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
  searchTerm: string;
  selectedSpaceId: string | undefined;
  selectedUserId: string | undefined;
  spaces: Space[];
  isErrorSpaces: boolean;
  isLoadingSpaces: boolean;
  users: UserResponse[];
  isLoadingUsers: boolean;
  isErrorUsers: boolean;
  dateRange: DateRange | undefined;
  onUserIdChange: (value: string | undefined) => void;
  onSearchChange: (value: string) => void;
  onSpaceChange: (value: string | undefined) => void;
  onDateRangeChange: (value: DateRange | undefined) => void;
  clearDateRange: () => void;
}

export const FiltersPanel: React.FC<Props> = ({
  searchTerm,
  selectedSpaceId,
  selectedUserId,
  spaces,
  isErrorSpaces,
  isLoadingSpaces,
  users,
  isLoadingUsers,
  isErrorUsers,
  dateRange,
  onSearchChange,
  onSpaceChange,
  onDateRangeChange,
  clearDateRange,
  onUserIdChange,
}) => {
  return (
    <Card className="mb-4">
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
        </div>
        <div className="w-full mt-2 flex items-center gap-4">
          <div className="w-full">
            <Label className="mb-2 block">Buscador</Label>
            <Input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Label className="mb-2 block">Alfitrion</Label>
            <div className="flex items-center gap-4">
              <Select
                onValueChange={(value) =>
                  onUserIdChange(value === "all" ? undefined : value)
                }
                value={selectedUserId ?? "all"}
              >
                <SelectTrigger className="w-full">
                  {" "}
                  <SelectValue placeholder="Filtrar por usuario" />
                </SelectTrigger>
                <SelectContent>
                  {isErrorUsers ? (
                    <SelectItem
                      value="error"
                      disabled
                      className="text-rose-800 flex items-center gap-2"
                    >
                      <ExclamationTriangleIcon className="size-4" />
                      Error al cargar
                    </SelectItem>
                  ) : isLoadingUsers ? (
                    <SelectItem value="loading" disabled>
                      Cargando usuarios...
                    </SelectItem>
                  ) : (
                    <>
                      <SelectItem value="all">Todos los usuarios</SelectItem>
                      {users.length === 0 ? (
                        <SelectItem value="empty" disabled>
                          No hay usuarios
                        </SelectItem>
                      ) : (
                        users.map((user) => (
                          <SelectItem key={user.id} value={user.id}>
                            {user.first_name + " " + user.last_name}
                          </SelectItem>
                        ))
                      )}
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
