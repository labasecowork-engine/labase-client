import {
  CustomHeader,
  AsyncBoundary,
  CardNavigation,
  Button,
  Pagination,
} from "@/components/ui";
import { getEmployees } from "../services";
import { useQuery } from "@tanstack/react-query";
import type { EmployeesResponse } from "../types";
import {
  EmployeesTable,
  EmptyState,
  ErrorState,
  FiltersPanel,
  LoadingState,
} from "../components";
import { actions } from "../constants";
import { useDebounce, useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { getAreas, getCompanies } from "../../../services";

export default function ViewEmployeesPage() {
  const { changeTitle } = useTitle();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [workAreaId, setWorkAreaId] = useState<string | undefined>(undefined);
  const [companyId, setCompanyId] = useState<string | undefined>(undefined);
  const {
    data: companies,
    isPending: isPendingCompanies,
    isError: isErrorCompanies,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });
  const {
    data: areas,
    isPending: isPendingAreas,
    isError: isErrorAreas,
  } = useQuery({
    queryKey: ["areas"],
    queryFn: getAreas,
  });
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery<EmployeesResponse>({
    queryKey: ["employees", page, debouncedSearch, workAreaId, companyId],
    queryFn: () => getEmployees(page, debouncedSearch, workAreaId, companyId),
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, workAreaId, companyId]);

  useEffect(() => {
    changeTitle("Empleados - La base");
  }, [changeTitle]);

  return (
    <div className="mx-auto max-w-5xl w-full px-4 mt-8">
      <div className="flex justify-between items-center">
        <CustomHeader title="Empleados" />
        <div className="flex items-center gap-2">
          <Link to={ROUTES.Admin.CreateEmployee}>
            <Button>
              <PlusIcon className="w-4 h-4" />
              Nuevo empleado
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 lg:gap-6 mt-4 mb-8">
        {actions.map((action) => (
          <CardNavigation
            key={action.title}
            to={action.to}
            title={action.title}
            description={action.description}
            icon={action.icon}
          />
        ))}
      </div>

      <div className="my-8">
        <FiltersPanel
          search={search}
          setSearch={setSearch}
          companyId={companyId}
          setCompanyId={setCompanyId}
          workAreaId={workAreaId}
          setWorkAreaId={setWorkAreaId}
          isPendingCompanies={isPendingCompanies}
          isErrorCompanies={isErrorCompanies}
          companies={companies || []}
          isPendingAreas={isPendingAreas}
          isErrorAreas={isErrorAreas}
          areas={areas || []}
        />
        <AsyncBoundary
          isLoading={isLoading}
          isError={isError}
          data={data?.employees}
          LoadingComponent={<LoadingState />}
          ErrorComponent={<ErrorState />}
          EmptyComponent={<EmptyState />}
        >
          {(employees) => (
            <>
              <EmployeesTable employees={employees} />
              <Pagination
                page={data?.pagination.page || 1}
                totalPages={data?.pagination.total_pages || 1}
                onPageChange={setPage}
              />
            </>
          )}
        </AsyncBoundary>
      </div>
    </div>
  );
}
