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
import type { FullArticleCategory } from "../../types";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

interface ArticleFiltersProps {
  searchTerm: string;
  selectedCategoryId: string | undefined;
  categories: FullArticleCategory[];
  isErrorCategories?: boolean;
  isLoadingCategories?: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (categoryId: string | undefined) => void;
}

export function ArticleFilters({
  searchTerm,
  selectedCategoryId,
  categories,
  isErrorCategories,
  isLoadingCategories,
  onSearchChange,
  onCategoryChange,
}: ArticleFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criterios de búsqueda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full">
            <Label className="mb-2 block">Buscador</Label>
            <Input
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          <div className="w-[200px]">
            <Label className="mb-2 block">Categoría</Label>
            <div className="flex items-center gap-4">
              <Select
                onValueChange={(value) =>
                  onCategoryChange(value === "all" ? undefined : value)
                }
                value={selectedCategoryId ?? "all"}
              >
                <SelectTrigger className="w-[200px]">
                  {" "}
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  {isErrorCategories ? (
                    <SelectItem
                      value="error"
                      disabled
                      className="text-rose-800 flex items-center gap-2"
                    >
                      <ExclamationTriangleIcon className="size-4" />
                      Error al cargar
                    </SelectItem>
                  ) : isLoadingCategories ? (
                    <SelectItem value="loading" disabled>
                      Cargando categorías...
                    </SelectItem>
                  ) : (
                    <>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {categories.length === 0 ? (
                        <SelectItem value="empty" disabled>
                          No hay categorías
                        </SelectItem>
                      ) : (
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
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
}
