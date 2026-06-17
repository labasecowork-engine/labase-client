import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AsyncBoundary,
  Button,
  CustomHeader,
  DeleteDialog,
  Pagination,
} from "@/components/ui";
import { UserPlus } from "lucide-react";
import { useDebounce, useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import {
  EditDialog,
  FiltersBar,
  RecordsTable,
  StatsCards,
} from "../components";
import { TableEmpty, TableError, TableLoading } from "../../../components";
import {
  useArchiveRecord,
  useDeleteRecord,
  useReenter,
  useRecords,
  useStats,
} from "../../../hooks";
import type { ClientAttendance, ExitTarget } from "../../../types";

export default function ViewClientAttendancePage() {
  const { changeTitle } = useTitle();
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [archived, setArchived] = useState(false);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const [editRecord, setEditRecord] = useState<ClientAttendance | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ExitTarget | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const statsQuery = useStats();
  const recordsQuery = useRecords({
    search: debouncedSearch,
    date_from: dateFrom || undefined,
    date_to: dateTo || undefined,
    archived,
    page,
  });
  const { reenter, isReentering } = useReenter();
  const { archiveRecord, isArchiving } = useArchiveRecord();
  const { deleteRecord, isDeleting } = useDeleteRecord();

  useEffect(() => {
    changeTitle("Asistencia de Clientes - La base");
  }, [changeTitle]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, dateFrom, dateTo, archived]);

  const handleEdit = (record: ClientAttendance) => {
    setEditRecord(record);
    setEditOpen(true);
  };
  const handleDelete = (target: ExitTarget) => {
    setDeleteTarget(target);
    setDeleteOpen(true);
  };
  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteRecord(deleteTarget.id, { onSuccess: () => setDeleteOpen(false) });
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
        <CustomHeader title="Asistencia de Clientes" />
        <Link to={ROUTES.Admin.CreateClientAttendance}>
          <Button>
            <UserPlus className="size-4" />
            Nuevo registro
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <StatsCards stats={statsQuery.data} isLoading={statsQuery.isLoading} />

        <div>
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
                  onReenter={reenter}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onArchive={archiveRecord}
                  isBusy={isReentering || isArchiving || isDeleting}
                />
              )}
            </AsyncBoundary>
            <Pagination
              page={page}
              totalPages={recordsQuery.data?.pagination.total_pages ?? 0}
              onPageChange={setPage}
            />
          </section>
        </div>
      </div>

      <EditDialog open={editOpen} onOpenChange={setEditOpen} record={editRecord} />
      <DeleteDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={confirmDelete}
        valueToDelete={deleteTarget?.client_name ?? ""}
        isPending={isDeleting}
      />
    </div>
  );
}
