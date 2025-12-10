import {
  AsyncSelect,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui";
import type { Company, WorkArea } from "@/types/employee";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  companyId: string | undefined;
  setCompanyId: (companyId: string | undefined) => void;
  workAreaId: string | undefined;
  setWorkAreaId: (workAreaId: string | undefined) => void;
  isPendingCompanies: boolean;
  isErrorCompanies: boolean;
  companies: Company[];
  isPendingAreas: boolean;
  isErrorAreas: boolean;
  areas: WorkArea[];
}

export const FiltersPanel: React.FC<Props> = ({
  search,
  setSearch,
  companyId,
  setCompanyId,
  workAreaId,
  setWorkAreaId,
  isPendingCompanies,
  isErrorCompanies,
  companies,
  isPendingAreas,
  isErrorAreas,
  areas,
}) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Criterios de búsqueda</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 w-full">
          <div className="w-full">
            <Label className="mb-2 block">Buscador</Label>
            <Input
              placeholder="Buscar empleado..."
              className="w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-[250px]">
            <AsyncSelect
              className="w-[250px]"
              label="Empresa"
              value={companyId}
              isLoading={isPendingCompanies}
              isError={isErrorCompanies}
              onChange={(value) => setCompanyId(value)}
              placeholder="Selecciona una empresa"
              options={companies || []}
            />
          </div>
          <div className="w-[250px]">
            <AsyncSelect
              className="w-[250px]"
              label="Área"
              value={workAreaId}
              isLoading={isPendingAreas}
              isError={isErrorAreas}
              onChange={(value) => setWorkAreaId(value)}
              placeholder="Selecciona un área"
              options={areas || []}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
