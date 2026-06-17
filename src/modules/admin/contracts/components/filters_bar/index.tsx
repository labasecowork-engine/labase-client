import { Button, Input } from "@/components/ui";
import { RefreshCw, SearchIcon } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  total: number;
  onRefresh: () => void;
}

export const FiltersBar = ({
  search,
  onSearchChange,
  total,
  onRefresh,
}: Props) => (
  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="relative w-full sm:max-w-md">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
      <Input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar contrato…"
        className="pl-9"
      />
    </div>
    <div className="flex items-center gap-3">
      <span className="text-xs text-stone-500">{total} contratos</span>
      <Button type="button" size="sm" variant="outline" onClick={onRefresh}>
        <RefreshCw className="size-4" />
        Actualizar
      </Button>
    </div>
  </div>
);
