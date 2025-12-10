import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@/components/ui";
import { searchVisitorByDNI } from "../../services";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, SearchIcon } from "lucide-react";
import type { SearchVisitorResponse } from "../../types";
import { capitalizeWords } from "@/utilities";

interface Props {
  onSearchDNI: (data: SearchVisitorResponse) => void;
}
export const SearchDNI: React.FC<Props> = ({ onSearchDNI }) => {
  const [dniSearch, setDniSearch] = useState("");
  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => searchVisitorByDNI(dniSearch),
    queryKey: ["visitor", dniSearch],
    enabled: false,
  });
  const handleDNISearch = () => {
    if (dniSearch.length < 8) {
      return;
    }
    refetch();
  };

  useEffect(() => {
    if (isError) {
      toast.warning("No se encontró el visitante", {
        description:
          "El DNI ingresado no es válido o no existe en la base de datos.",
      });
    } else if (data) {
      onSearchDNI({
        ...data,
        first_name: capitalizeWords(data.first_name),
        last_name: capitalizeWords(data.last_name),
      });
    }
  }, [isError, data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Búsqueda por DNI
        </CardTitle>
        <CardDescription>
          Opten datos del visitante, puedes buscarlo por DNI para rellenar
          automáticamente los datos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 w-full">
          <Input
            id="dniSearch"
            placeholder="Ingresa el DNI para buscar..."
            value={dniSearch}
            onChange={(e) => setDniSearch(e.target.value.toUpperCase())}
            maxLength={9}
          />
          <Button
            type="button"
            onClick={handleDNISearch}
            disabled={isLoading}
            className="bg-stone-200 text-stone-600 rounded-lg py-2 px-3 hover:bg-stone-300"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <SearchIcon className="w-4 h-4 " />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
