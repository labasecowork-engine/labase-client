import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AsyncBoundary, Button, CustomHeader, Pagination } from "@/components/ui";
import { Plus } from "lucide-react";
import { useDebounce, useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { FiltersBar, RecordsTable } from "../components";
import {
  ExitDialog,
  TableEmpty,
  TableError,
  TableLoading,
} from "../../../components";
import { useArchiveRecord, useReenter, useRecords } from "../../../hooks";
import type { ExitTarget } from "../../../types";

export default function ViewParkingPage() {
  const { changeTitle } = useTitle();
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [archived, setArchived] = useState(false);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const [exitTarget, setExitTarget] = useState<ExitTarget | null>(null);
  const [exitOpen, setExitOpen] = useState(false);

  const recordsQuery = useRecords({
    search: debouncedSearch,
    date_from: dateFrom || undefined,
    date_to: dateTo || undefined,
    archived,
    page,
  });
  const { reenter, isReentering } = useReenter();
  const { archiveRecord, isArchiving } = useArchiveRecord();

  useEffect(() => {
    changeTitle("Estacionamiento - La base");
  }, [changeTitle]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, dateFrom, dateTo, archived]);

  const handleExit = (target: ExitTarget) => {
    setExitTarget(target);
    setExitOpen(true);
  };

  const clearFilters = () => {
    setSearch("");
    setDateFrom("");
    setDateTo("");
    setArchived(false);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <CustomHeader title="Registro de Estacionamiento" />
        <Link to={ROUTES.Admin.CreateParking}>
          <Button>
            <Plus className="size-4" />
            Nuevo registro
          </Button>
        </Link>
      </div>

      <FiltersBar
        search={search}
        onSearchChange={setSearch}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        archived={archived}
        onArchivedChange={setArchived}
        onClear={clearFilters}
        total={recordsQuery.data?.pagination.total ?? 0}
      />
      <section className="rounded-lg bg-stone-50 p-5">
        <AsyncBoundary
          isLoading={recordsQuery.isLoading}
          isError={recordsQuery.isError}
          data={recordsQuery.data?.records}
          LoadingComponent={<TableLoading />}
          ErrorComponent={<TableError />}
          EmptyComponent={
            <TableEmpty
              title="Sin registros"
              description="No hay registros que coincidan con los filtros."
            />
          }
        >
          {(records) => (
            <RecordsTable
              records={records}
              onExit={handleExit}
              onReenter={reenter}
              onArchive={archiveRecord}
              isBusy={isReentering || isArchiving}
            />
          )}
        </AsyncBoundary>
        <Pagination
          page={page}
          totalPages={recordsQuery.data?.pagination.total_pages ?? 0}
          onPageChange={setPage}
        />
      </section>

      <ExitDialog open={exitOpen} onOpenChange={setExitOpen} target={exitTarget} />
    </div>
  );
}
