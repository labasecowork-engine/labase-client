import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { cn } from "@/utilities";
import {
  CreditCard,
  MoreVertical,
  Pencil,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { ROUTES } from "@/routes/routes";
import {
  PAYMENT_STATUS_STYLES,
  formatDate,
  formatMoney,
  isExpired,
  isExpiringSoon,
  paidAmount,
  paymentProgress,
  paymentStatus,
  pendingAmount,
} from "../../constants";
import type { Contract } from "../../types";

interface Props {
  contract: Contract;
  onPay: (contract: Contract) => void;
  onRenew: (id: string) => void;
  onDelete: (contract: Contract) => void;
}

const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="flex items-center justify-between gap-4 py-2.5">
    <span className="text-stone-500">{label}</span>
    <span className="text-right font-medium text-stone-900">{children}</span>
  </div>
);

export const ContractCard = ({ contract, onPay, onRenew, onDelete }: Props) => {
  const navigate = useNavigate();
  const status = paymentStatus(contract);
  const statusStyle = PAYMENT_STATUS_STYLES[status];
  const paid = paidAmount(contract);
  const pending = pendingAmount(contract);
  const progress = paymentProgress(contract);
  const expired = isExpired(contract);

  const goDetail = () =>
    navigate(ROUTES.Admin.ViewContract.replace(":id", contract.id));
  const goEdit = () =>
    navigate(ROUTES.Admin.EditContract.replace(":id", contract.id));

  return (
    <div
      onClick={goDetail}
      className="cursor-pointer overflow-hidden rounded-lg bg-stone-50 transition-colors hover:bg-stone-100"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 px-4 pt-4">
        <div className="min-w-0">
          <h3 className="truncate font-medium text-stone-900">
            {contract.client_name}
          </h3>
          <p className="mt-0.5 truncate text-xs text-stone-500">
            {contract.company ?? "Persona Natural"}
            {contract.document ? ` · ${contract.document}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              statusStyle.badge
            )}
          >
            {statusStyle.label}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                onClick={(e) => e.stopPropagation()}
                aria-label="Acciones"
                className="flex size-7 items-center justify-center rounded-md text-stone-400 transition-colors hover:bg-stone-200 hover:text-stone-700"
              >
                <MoreVertical className="size-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {status !== "paid" && (
                <DropdownMenuItem onClick={() => onPay(contract)}>
                  <CreditCard />
                  Registrar pago
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={goEdit}>
                <Pencil />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onRenew(contract.id)}>
                <RefreshCw />
                Renovar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(contract)}
              >
                <Trash2 />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Aviso de vencimiento */}
      {expired && (
        <p className="mx-4 mt-3 rounded-md bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-700">
          Vencido el {formatDate(contract.end_date)}
        </p>
      )}
      {!expired && isExpiringSoon(contract) && (
        <p className="mx-4 mt-3 rounded-md bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-700">
          Próximo a vencer ({formatDate(contract.end_date)})
        </p>
      )}

      {/* Datos */}
      <div className="mt-2 divide-y divide-stone-200/70 px-4 text-xs">
        <Row label="Plan">
          {contract.plan ? (
            <span className="rounded-full bg-stone-200/70 px-2 py-0.5">
              {contract.plan}
            </span>
          ) : (
            "—"
          )}
        </Row>
        <Row label="Espacio">{contract.space_name ?? "—"}</Row>
        <Row label="Término">{formatDate(contract.end_date)}</Row>
        <Row label="Monto renta">{formatMoney(contract.rent_amount)}</Row>
        <Row label="Pendiente">
          {pending <= 0 ? (
            <span className="text-emerald-700">✓ Pagado</span>
          ) : (
            <span className="text-rose-700">{formatMoney(pending)}</span>
          )}
        </Row>
        <Row label="N° usuarios">{contract.num_users ?? "—"}</Row>
      </div>

      {/* Progreso de pago */}
      <div className="px-4 pb-4 pt-3">
        <div className="mb-1 flex items-center justify-between text-xs text-stone-500">
          <span>Pagado {formatMoney(paid)}</span>
          <span className="tabular-nums">{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
          <div
            className={cn(
              "h-full rounded-full",
              progress >= 100 ? "bg-emerald-500" : "bg-amber-500"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
