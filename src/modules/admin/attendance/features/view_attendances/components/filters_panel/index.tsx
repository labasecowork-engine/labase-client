import {
  AsyncSelect,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/components/ui";
import type { Company, WorkArea } from "@/types/employee";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  companyId: string;
  setCompanyId: (companyId: string | undefined) => void;
  workAreaId: string;
  setWorkAreaId: (workAreaId: string | undefined) => void;
  isPendingCompanies: boolean;
  isErrorCompanies: boolean;
  companies: Company[];
  isPendingAreas: boolean;
  isErrorAreas: boolean;
  areas: WorkArea[];
  setIsOpenExportModal: (isOpen: boolean) => void;
}

export const FiltersPanel = ({
  setIsOpenExportModal,
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
}: Props) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex items-center flex-row justify-between">
        <CardTitle>Criterios de búsqueda</CardTitle>
        <Button
          className="bg-stone-800 text-stone-50 rounded-lg px-6"
          onClick={() => setIsOpenExportModal(true)}
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Exportar
        </Button>
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
              label="Empresa"
              placeholder="Selecciona una empresa"
              options={companies || []}
              isLoading={isPendingCompanies}
              isError={isErrorCompanies}
              value={companyId}
              className="w-[250px]"
              onChange={(value) => {
                setCompanyId(value);
              }}
            />
          </div>
          <div className="w-[250px]">
            <AsyncSelect
              label="Área"
              placeholder="Selecciona un área"
              options={areas || []}
              isLoading={isPendingAreas}
              isError={isErrorAreas}
              value={workAreaId}
              className="w-[250px]"
              onChange={(value) => {
                setWorkAreaId(value);
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
