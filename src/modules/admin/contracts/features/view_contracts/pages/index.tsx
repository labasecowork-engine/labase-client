import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AsyncBoundary,
  Button,
  DeleteDialog,
  Pagination,
} from "@/components/ui";
import { FilePlus } from "lucide-react";
import { useDebounce, useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import {
  ContractsGrid,
  ContractsSkeleton,
  ExpiryBanner,
  FiltersBar,
  PayDialog,
  TableEmpty,
  TableError,
} from "@/modules/admin/contracts/components";
import {
  useContracts,
  useDeleteContract,
  useRenewContract,
} from "@/modules/admin/contracts/hooks";
import type { Contract } from "@/modules/admin/contracts/types";

export default function ViewContractsPage() {
  const { changeTitle } = useTitle();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);

  const [payTarget, setPayTarget] = useState<Contract | null>(null);
  const [payOpen, setPayOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Contract | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { contractsQuery, statsQuery } = useContracts({
    search: debouncedSearch,
    page,
  });
  const { renewContract } = useRenewContract();
  const { deleteContract, isDeleting } = useDeleteContract();

  useEffect(() => {
    changeTitle("Gestión de Contratos - La base");
  }, [changeTitle]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const openPay = (contract: Contract) => {
    setPayTarget(contract);
    setPayOpen(true);
  };
  const openDelete = (contract: Contract) => {
    setDeleteTarget(contract);
    setDeleteOpen(true);
  };
  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteContract(deleteTarget.id, { onSuccess: () => setDeleteOpen(false) });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
            Gestión de Contratos
          </h1>
          <p className="text-sm text-stone-500">
            Crea, edita y gestiona contratos de alquiler de espacios.
          </p>
        </div>
        <Link to={ROUTES.Admin.CreateContract}>
          <Button>
            <FilePlus className="size-4" />
            Nuevo contrato
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <ExpiryBanner stats={statsQuery.data} />

        <div>
          <FiltersBar
            search={search}
            onSearchChange={setSearch}
            total={contractsQuery.data?.pagination.total ?? 0}
            onRefresh={() => contractsQuery.refetch()}
          />
          <AsyncBoundary
            isLoading={contractsQuery.isLoading}
            isError={contractsQuery.isError}
            data={contractsQuery.data?.contracts}
            LoadingComponent={<ContractsSkeleton />}
            ErrorComponent={<TableError />}
            EmptyComponent={
              <TableEmpty
                title="Sin contratos"
                description="No hay contratos que coincidan con la búsqueda."
              />
            }
          >
            {(contracts) => (
              <ContractsGrid
                contracts={contracts}
                onPay={openPay}
                onRenew={renewContract}
                onDelete={openDelete}
              />
            )}
          </AsyncBoundary>
          <Pagination
            page={page}
            totalPages={contractsQuery.data?.pagination.total_pages ?? 0}
            onPageChange={setPage}
          />
        </div>
      </div>

      <PayDialog open={payOpen} onOpenChange={setPayOpen} contract={payTarget} />
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
