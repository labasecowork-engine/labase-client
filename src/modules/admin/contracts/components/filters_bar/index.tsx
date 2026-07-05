import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui";
import { RefreshCw } from "lucide-react";

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
  <Card className="mb-4">
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Criterios de búsqueda</CardTitle>
      <Button type="button" size="sm" variant="outline" onClick={onRefresh}>
        <RefreshCw className="size-4" />
        Actualizar
      </Button>
    </CardHeader>
    <CardContent>
      <div className="w-full">
        <Label className="mb-2 block">Buscador</Label>
        <Input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por cliente, empresa o documento..."
        />
      </div>
      <p className="mt-2 text-xs text-stone-500">{total} contratos</p>
    </CardContent>
  </Card>
);
