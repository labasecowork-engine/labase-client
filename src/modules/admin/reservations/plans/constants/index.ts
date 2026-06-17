import type { BillingPeriod, PlanCategory, PlanLabelColor } from "../types";

// --- Opciones de selects ---
export const CATEGORY_OPTIONS: { value: PlanCategory; label: string }[] = [
  { value: "individual", label: "Individual" },
  { value: "team", label: "Equipos" },
  { value: "office", label: "Oficinas" },
  { value: "shared_space", label: "Espacios Compartidos" },
];

export const CATEGORY_LABELS: Record<PlanCategory, string> = {
  individual: "Individual",
  team: "Equipos",
  office: "Oficinas",
  shared_space: "Espacios Compartidos",
};

export const BILLING_PERIOD_OPTIONS: {
  value: BillingPeriod;
  label: string;
  short: string;
}[] = [
  { value: "day", label: "Día", short: "día" },
  { value: "week", label: "Semana", short: "semana" },
  { value: "month", label: "Mes", short: "mes" },
  { value: "year", label: "Año", short: "año" },
];

export const BILLING_PERIOD_SHORT: Record<BillingPeriod, string> = {
  day: "día",
  week: "semana",
  month: "mes",
  year: "año",
};

export const LABEL_COLOR_OPTIONS: { value: PlanLabelColor; label: string }[] = [
  { value: "gold", label: "Dorado (estándar)" },
  { value: "blue", label: "Azul" },
  { value: "green", label: "Verde" },
  { value: "purple", label: "Morado" },
  { value: "rose", label: "Rosa" },
  { value: "stone", label: "Gris" },
];

// Estilos del badge de período y del color del precio (según `label_color`).
export const LABEL_COLOR_STYLES: Record<
  PlanLabelColor,
  { badge: string; price: string }
> = {
  gold: { badge: "bg-amber-500/15 text-amber-700", price: "text-amber-600" },
  blue: { badge: "bg-blue-500/15 text-blue-700", price: "text-blue-600" },
  green: {
    badge: "bg-emerald-500/15 text-emerald-700",
    price: "text-emerald-600",
  },
  purple: {
    badge: "bg-violet-500/15 text-violet-700",
    price: "text-violet-600",
  },
  rose: { badge: "bg-rose-500/15 text-rose-700", price: "text-rose-600" },
  stone: { badge: "bg-stone-500/15 text-stone-700", price: "text-stone-700" },
};

// Estilo del badge de categoría.
export const CATEGORY_BADGE_STYLES: Record<PlanCategory, string> = {
  individual: "bg-indigo-500/15 text-indigo-700",
  team: "bg-cyan-500/15 text-cyan-700",
  office: "bg-fuchsia-500/15 text-fuchsia-700",
  shared_space: "bg-teal-500/15 text-teal-700",
};

// Cuántas características mostrar en la tarjeta antes de "+N más…".
export const FEATURES_PREVIEW_LIMIT = 7;

// --- Helpers de formato ---
export const formatPrice = (price: number | null): string =>
  price === null ? "A medida" : `S/. ${price.toFixed(2)}`;
