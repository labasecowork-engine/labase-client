import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
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
  <Card className="mb-4">
    <CardHeader>
      <CardTitle>Criterios de búsqueda</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
        <div className="w-full sm:w-[250px]">
          <Label className="mb-2 block">Categoría</Label>
          <Select
            value={category ?? ALL}
            onValueChange={(value) =>
              onCategoryChange(
                value === ALL ? undefined : (value as PlanCategory)
              )
            }
          >
            <SelectTrigger className="w-full sm:w-[250px]">
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
      </div>
      <div className="mt-4 w-full">
        <Label className="mb-2 block">Buscador</Label>
        <Input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nombre del plan..."
        />
      </div>
    </CardContent>
  </Card>
);
