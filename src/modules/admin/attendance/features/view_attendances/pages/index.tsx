import { CustomHeader, AsyncBoundary, Pagination } from "@/components/ui";
import React from "react";
import { useTitle } from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import { getAttendance, statsAttendance } from "../services";
import { ROUTES } from "@/routes/routes";
import { useQuery } from "@tanstack/react-query";
import { transformAttendanceData } from "../utils";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  StatsGrid,
  EmployeeTable,
  LoadingStatsState,
  FiltersPanel,
  ExportDialog,
} from "../components";
import { getAreas, getCompanies } from "@/services";

export default function ViewAttendancesPage() {
  const { changeTitle } = useTitle();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isOpenExportModal, setIsOpenExportModal] = useState(false);
  const [workAreaId, setWorkAreaId] = useState<string | undefined>(undefined);
  const [companyId, setCompanyId] = useState<string | undefined>(undefined);
  const {
    data: attendance,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["attendance", page, search, workAreaId, companyId],
    queryFn: () => getAttendance(page, search, workAreaId, companyId, false),
  });

  const {
    data: stats,
    isPending: isPendingStats,
    isError: isErrorStats,
  } = useQuery({
    queryKey: ["statsAttendance"],
    queryFn: () => statsAttendance(),
  });

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

  const employeeAttendance = useMemo(
    () => transformAttendanceData(attendance || { attendances: [] }),
    [attendance]
  );

  useEffect(() => {
    changeTitle("Asistencia - La base");
  }, []);

  return (
    <>
      <div className="mx-auto max-w-5xl w-full px-4 mt-8">
        <div className=" flex items-center justify-between mb-8">
          <CustomHeader title="Asistencia" to={ROUTES.Admin.ViewEmployees} />
        </div>

        <AsyncBoundary
          isLoading={isPendingStats}
          isError={isErrorStats}
          data={stats}
          LoadingComponent={<LoadingStatsState />}
          ErrorComponent={<React.Fragment />}
        >
          {(data) => (
            <StatsGrid
              totalRegisters={data.total_records || 0}
              daysRegistered={data.total_registered_days || 0}
              totalEmployees={data.total_employees || 0}
              totalHours={data.total_hours || "0h 0m"}
            />
          )}
        </AsyncBoundary>

        <FiltersPanel
          search={search}
          setSearch={setSearch}
          companyId={companyId || ""}
          setCompanyId={setCompanyId}
          workAreaId={workAreaId || ""}
          setWorkAreaId={setWorkAreaId}
          isPendingCompanies={isPendingCompanies}
          isErrorCompanies={isErrorCompanies}
          companies={companies || []}
          isPendingAreas={isPendingAreas}
          isErrorAreas={isErrorAreas}
          areas={areas || []}
          setIsOpenExportModal={setIsOpenExportModal}
        />

        <div className="mb-8">
          <AsyncBoundary
            isLoading={isPending}
            isError={isError}
            data={employeeAttendance}
            LoadingComponent={<LoadingState />}
            ErrorComponent={<ErrorState />}
            EmptyComponent={<EmptyState />}
          >
            {(data) => (
              <>
                <EmployeeTable data={data} />
                <Pagination
                  page={attendance?.pagination.page || 1}
                  totalPages={attendance?.pagination.total_pages || 1}
                  onPageChange={setPage}
                />
              </>
            )}
          </AsyncBoundary>
        </div>
      </div>
      <ExportDialog
        search={search}
        workAreaId={workAreaId}
        companyId={companyId}
        isOpen={isOpenExportModal}
        onOpenChange={setIsOpenExportModal}
      />
    </>
  );
}
