import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { SearchIcon } from "lucide-react";
import { CATEGORY_OPTIONS } from "../../constants";
import type { PlanCategory } from "../../types";

const ALL = "all";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  category?: PlanCategory;
  onCategoryChange: (value?: PlanCategory) => void;
}

export const FiltersBar = ({
  search,
  onSearchChange,
  category,
  onCategoryChange,
}: Props) => (
  <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
    <div className="relative w-full sm:max-w-md">
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
      <Input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar plan…"
        className="pl-9"
      />
    </div>
    <Select
      value={category ?? ALL}
      onValueChange={(value) =>
        onCategoryChange(value === ALL ? undefined : (value as PlanCategory))
      }
    >
      <SelectTrigger className="w-full sm:w-56">
        <SelectValue placeholder="Todas las categorías" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>Todas las categorías</SelectItem>
        {CATEGORY_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
