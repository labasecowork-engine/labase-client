import type { Contract, PaymentStatus } from "../types";

export const FOLLOW_UP_OPTIONS = [
  "Por contactar",
  "En seguimiento",
  "Cerrado",
  "Sin seguimiento",
];

export const CONTRACT_TYPE_OPTIONS = [
  "Membresía",
  "Espacio compartido",
  "Oficina privada",
  "Coworking",
  "Otro",
];

export const PAYMENT_STATUS_STYLES: Record<
  PaymentStatus,
  { badge: string; label: string }
> = {
  paid: { badge: "bg-emerald-500/15 text-emerald-700", label: "Pagado" },
  pending: { badge: "bg-rose-500/15 text-rose-700", label: "Pendiente" },
  partial: { badge: "bg-amber-500/15 text-amber-700", label: "Parcial" },
};

const pad = (n: number): string => String(n).padStart(2, "0");
export const todayStr = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const formatMoney = (amount: number): string => `S/. ${amount.toFixed(2)}`;

export const formatDate = (date: string | null): string => date ?? "—";

// --- Derivados (no se almacenan) ---
export const paidAmount = (contract: Contract): number =>
  contract.payments.reduce((sum, payment) => sum + payment.amount, 0);

export const pendingAmount = (contract: Contract): number =>
  Math.max(0, contract.rent_amount - paidAmount(contract));

export const paymentStatus = (contract: Contract): PaymentStatus => {
  if (contract.rent_amount <= 0) return "paid";
  const paid = paidAmount(contract);
  if (paid >= contract.rent_amount) return "paid";
  if (paid > 0) return "partial";
  return "pending";
};

export const paymentProgress = (contract: Contract): number => {
  if (contract.rent_amount <= 0) return paidAmount(contract) > 0 ? 100 : 0;
  return Math.min(100, Math.round((paidAmount(contract) / contract.rent_amount) * 100));
};

const DAY_MS = 86_400_000;
export const daysToExpire = (contract: Contract): number =>
  Math.round(
    (new Date(contract.end_date).getTime() - new Date(todayStr()).getTime()) /
      DAY_MS
  );

export const isExpired = (contract: Contract): boolean =>
  daysToExpire(contract) < 0;

export const isExpiringSoon = (contract: Contract): boolean => {
  const days = daysToExpire(contract);
  return days >= 0 && days <= 14;
};
