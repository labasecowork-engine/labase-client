import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AsyncBoundary,
  Button,
  DeleteDialog,
  Pagination,
} from "@/components/ui";
import { Plus } from "lucide-react";
import { useDebounce, useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import {
  FiltersBar,
  PlanStatsCards,
  PlansGrid,
  PlansSkeleton,
  TableEmpty,
  TableError,
} from "@/modules/admin/reservations/plans/components";
import {
  useDeletePlan,
  usePlans,
} from "@/modules/admin/reservations/plans/hooks";
import type {
  Plan,
  PlanCategory,
} from "@/modules/admin/reservations/plans/types";

export default function ViewPlansPage() {
  const { changeTitle } = useTitle();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<PlanCategory | undefined>(undefined);
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const [deleteTarget, setDeleteTarget] = useState<Plan | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { plansQuery, statsQuery } = usePlans({
    search: debouncedSearch,
    category,
    page,
  });
  const { deletePlan, isDeleting } = useDeletePlan();

  useEffect(() => {
    changeTitle("Gestión de Planes - La base");
  }, [changeTitle]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category]);

  const openDelete = (plan: Plan) => {
    setDeleteTarget(plan);
    setDeleteOpen(true);
  };
  const confirmDelete = () => {
    if (!deleteTarget) return;
    deletePlan(deleteTarget.id, { onSuccess: () => setDeleteOpen(false) });
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
            Planes
          </h1>
        </div>
        <Link to={ROUTES.Admin.CreatePlan}>
          <Button>
            <Plus className="size-4" />
            Nuevo plan
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        <PlanStatsCards
          stats={statsQuery.data}
          isLoading={statsQuery.isLoading}
        />

        <div>
          <FiltersBar
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
          />
          <AsyncBoundary
            isLoading={plansQuery.isLoading}
            isError={plansQuery.isError}
            data={plansQuery.data?.plans}
            LoadingComponent={<PlansSkeleton />}
            ErrorComponent={<TableError />}
            EmptyComponent={
              <TableEmpty
                title="Sin planes"
                description="No hay planes que coincidan con la búsqueda."
              />
            }
          >
            {(plans) => <PlansGrid plans={plans} onDelete={openDelete} />}
          </AsyncBoundary>
          <Pagination
            page={page}
            totalPages={plansQuery.data?.pagination.total_pages ?? 0}
            onPageChange={setPage}
          />
        </div>
      </div>

      <DeleteDialog
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={confirmDelete}
        valueToDelete={deleteTarget?.name ?? ""}
        isPending={isDeleting}
      />
    </div>
  );
}
