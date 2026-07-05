import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DatePicker,
  Input,
  Label,
  Switch,
} from "@/components/ui";
import { X } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
  archived: boolean;
  onArchivedChange: (value: boolean) => void;
  onClear: () => void;
  total: number;
}

export const FiltersBar = ({
  search,
  onSearchChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  archived,
  onArchivedChange,
  onClear,
  total,
}: Props) => {
  const hasActiveFilters =
    search.trim() !== "" || dateFrom !== "" || dateTo !== "" || archived;

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Criterios de búsqueda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="w-full sm:w-44">
            <Label htmlFor="date-from" className="mb-2 block">
              Desde
            </Label>
            <DatePicker
              id="date-from"
              value={dateFrom}
              onChange={onDateFromChange}
              placeholder="Desde"
            />
          </div>

          <div className="w-full sm:w-44">
            <Label htmlFor="date-to" className="mb-2 block">
              Hasta
            </Label>
            <DatePicker
              id="date-to"
              value={dateTo}
              onChange={onDateToChange}
              placeholder="Hasta"
            />
          </div>

          <div className="w-full sm:w-auto">
            <Label className="mb-2 block">Mostrar</Label>
            <div className="flex h-10 items-center gap-2 rounded-lg border border-stone-200 bg-white px-3">
              <Switch
                id="archived"
                checked={archived}
                onCheckedChange={onArchivedChange}
              />
              <Label
                htmlFor="archived"
                className="cursor-pointer text-sm font-normal text-stone-700"
              >
                Archivados
              </Label>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full">
          <Label htmlFor="record-search" className="mb-2 block">
            Buscador
          </Label>
          <Input
            id="record-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nombre, empresa o placa..."
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-stone-500">{total} registros</span>
          {hasActiveFilters && (
            <Button type="button" variant="ghost" size="sm" onClick={onClear}>
              <X className="size-4" />
              Limpiar filtros
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
