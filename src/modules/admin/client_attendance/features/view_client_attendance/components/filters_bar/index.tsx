import { Button, Input, Label, Switch } from "@/components/ui";
import { SearchIcon, X } from "lucide-react";

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
    <div className="mb-4 rounded-lg bg-stone-50 p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
        <div className="min-w-[220px] flex-1 space-y-1">
          <Label htmlFor="record-search" className="text-xs text-stone-500">
            Filtrar
          </Label>
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <Input
              id="record-search"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Nombre o empresa…"
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="date-from" className="text-xs text-stone-500">
            Desde
          </Label>
          <Input
            id="date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="date-to" className="text-xs text-stone-500">
            Hasta
          </Label>
          <Input
            id="date-to"
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-stone-500">Mostrar</Label>
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

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-stone-500">{total} registros</span>
        {hasActiveFilters && (
          <Button type="button" variant="ghost" size="sm" onClick={onClear}>
            <X className="size-4" />
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  );
};
