import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AsyncBoundary,
  Button,
  DeleteDialog,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import {
  ArrowLeft,
  CreditCard,
  MoreVertical,
  Pencil,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { cn } from "@/utilities";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import {
  PayDialog,
  TableError,
  TableLoading,
} from "@/modules/admin/contracts/components";
import {
  useContract,
  useDeleteContract,
  useRenewContract,
} from "@/modules/admin/contracts/hooks";
import {
  PAYMENT_STATUS_STYLES,
  formatDate,
  formatMoney,
  isExpired,
  paidAmount,
  paymentProgress,
  paymentStatus,
  pendingAmount,
} from "@/modules/admin/contracts/constants";
import type { Contract } from "@/modules/admin/contracts/types";

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <dt className="text-xs font-medium uppercase tracking-wide text-stone-400">
      {label}
    </dt>
    <dd className="text-sm text-stone-800">{value || "—"}</dd>
  </div>
);

export default function ViewContractPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { changeTitle } = useTitle();
  const navigate = useNavigate();

  const contractQuery = useContract(id);
  const { renewContract } = useRenewContract();
  const { deleteContract, isDeleting } = useDeleteContract();

  const [payOpen, setPayOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    changeTitle("Detalle del contrato - La base");
  }, [changeTitle]);

  const confirmDelete = () =>
    deleteContract(id, {
      onSuccess: () => {
        setDeleteOpen(false);
        navigate(ROUTES.Admin.ViewContracts);
      },
    });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <Link
        to={ROUTES.Admin.ViewContracts}
        className="mb-4 inline-flex items-center gap-1 text-sm text-stone-500 transition-colors hover:text-stone-800"
      >
        <ArrowLeft className="size-4" />
        Contratos
      </Link>

      <AsyncBoundary
        isLoading={contractQuery.isLoading}
        isError={contractQuery.isError}
        data={contractQuery.data}
        LoadingComponent={<TableLoading />}
        ErrorComponent={<TableError />}
      >
        {(contract: Contract) => {
          const status = paymentStatus(contract);
          return (
            <>
              {/* Encabezado + acciones */}
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
                      {contract.client_name}
                    </h1>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        PAYMENT_STATUS_STYLES[status].badge,
                      )}
                    >
                      {PAYMENT_STATUS_STYLES[status].label}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500">
                    {contract.company ?? "Persona Natural"}
                    {contract.document ? ` · ${contract.document}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={ROUTES.Admin.EditContract.replace(":id", id)}>
                    <Button>
                      <Pencil className="size-4" />
                      Editar
                    </Button>
                  </Link>
                  {status !== "paid" && (
                    <Button variant="outline" onClick={() => setPayOpen(true)}>
                      <CreditCard className="size-4" />
                      Pagar
                    </Button>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Más acciones"
                      >
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => renewContract(contract.id)}
                      >
                        <RefreshCw />
                        Renovar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setDeleteOpen(true)}
                      >
                        <Trash2 />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {isExpired(contract) && (
                <div className="mb-6 rounded-lg bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-700">
                  Contrato vencido el {formatDate(contract.end_date)}
                </div>
              )}

              {/* Datos */}
              <section className="rounded-lg bg-stone-50 p-5">
                <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <Field label="Responsable" value={contract.responsible} />
                  <Field label="Celular" value={contract.phone} />
                  <Field label="Seguimiento" value={contract.follow_up} />
                  <Field label="Dirección" value={contract.address} />
                  <Field label="Tipo" value={contract.contract_type} />
                  <Field label="Plan" value={contract.plan} />
                  <Field label="Espacio" value={contract.space_name} />
                  <Field
                    label="Inicio"
                    value={formatDate(contract.start_date)}
                  />
                  <Field
                    label="Término"
                    value={formatDate(contract.end_date)}
                  />
                  <Field
                    label="Monto renta"
                    value={formatMoney(contract.rent_amount)}
                  />
                  <Field
                    label="Pago mensual"
                    value={
                      contract.monthly_payment != null
                        ? formatMoney(contract.monthly_payment)
                        : "—"
                    }
                  />
                  <Field
                    label="Pendiente"
                    value={formatMoney(pendingAmount(contract))}
                  />
                  <Field label="N° factura" value={contract.invoice_number} />
                  <Field label="WiFi" value={contract.wifi} />
                  <Field label="Locker" value={contract.locker_ref} />
                  <Field label="N° usuarios" value={contract.num_users} />
                  <Field
                    label="Fecha registro"
                    value={formatDate(contract.created_at)}
                  />
                </dl>

                {/* Progreso */}
                <div className="mt-5">
                  <div className="mb-1 flex items-center justify-between text-xs text-stone-500">
                    <span>Pagado {formatMoney(paidAmount(contract))}</span>
                    <span className="tabular-nums">
                      {paymentProgress(contract)}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        paymentProgress(contract) >= 100
                          ? "bg-emerald-500"
                          : "bg-amber-500",
                      )}
                      style={{ width: `${paymentProgress(contract)}%` }}
                    />
                  </div>
                </div>
              </section>

              {/* Historial de pagos */}
              <section className="mt-6 rounded-lg bg-stone-50 p-5">
                <h2 className="mb-3 font-serif text-lg font-bold text-stone-900">
                  Historial de pagos
                </h2>
                {contract.payments.length === 0 ? (
                  <p className="text-sm text-stone-500">
                    Sin pagos registrados.
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {contract.payments.map((payment) => (
                      <li
                        key={payment.id}
                        className="flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm"
                      >
                        <span className="text-stone-600">
                          {payment.paid_at.slice(0, 10)}
                          {payment.note ? ` · ${payment.note}` : ""}
                        </span>
                        <span className="font-medium text-stone-800">
                          {formatMoney(payment.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <PayDialog
                open={payOpen}
                onOpenChange={setPayOpen}
                contract={contract}
              />
              <DeleteDialog
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onDelete={confirmDelete}
                valueToDelete={contract.client_name}
                isPending={isDeleting}
              />
            </>
          );
        }}
      </AsyncBoundary>
    </div>
  );
}
