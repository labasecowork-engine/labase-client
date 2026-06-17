import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { cn } from "@/utilities";
import { CheckCircle2, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { ROUTES } from "@/routes/routes";
import {
  BILLING_PERIOD_SHORT,
  CATEGORY_BADGE_STYLES,
  CATEGORY_LABELS,
  FEATURES_PREVIEW_LIMIT,
  LABEL_COLOR_STYLES,
  formatPrice,
} from "../../constants";
import type { Plan } from "../../types";

interface Props {
  plan: Plan;
  onDelete: (plan: Plan) => void;
}

export const PlanCard = ({ plan, onDelete }: Props) => {
  const navigate = useNavigate();
  const colorStyle = LABEL_COLOR_STYLES[plan.label_color];
  const period = BILLING_PERIOD_SHORT[plan.billing_period];
  const extraFeatures = plan.features.length - FEATURES_PREVIEW_LIMIT;

  const goEdit = () =>
    navigate(ROUTES.Admin.EditPlan.replace(":id", plan.id));

  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-stone-50">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 px-5 pt-5">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-stone-900">{plan.name}</h3>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                CATEGORY_BADGE_STYLES[plan.category]
              )}
            >
              {CATEGORY_LABELS[plan.category]}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs font-medium",
                colorStyle.badge
              )}
            >
              {period}
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Acciones"
              className="flex size-7 shrink-0 items-center justify-center rounded-md text-stone-400 transition-colors hover:bg-stone-200 hover:text-stone-700"
            >
              <MoreVertical className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={goEdit}>
              <Pencil />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => onDelete(plan)}>
              <Trash2 />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Precio */}
      <div className="px-5 pt-4">
        <p className={cn("font-serif text-3xl font-bold", colorStyle.price)}>
          {formatPrice(plan.price)}
          {plan.price !== null && (
            <span className="ml-1 text-sm font-medium text-stone-500">
              / {period}
            </span>
          )}
        </p>
      </div>

      {/* Descripción */}
      {plan.description && (
        <p className="mt-3 px-5 text-sm text-stone-600">{plan.description}</p>
      )}

      {/* Características */}
      <div className="mt-3 divide-y divide-stone-200/70 px-5 text-sm">
        {plan.features.slice(0, FEATURES_PREVIEW_LIMIT).map((feature, index) => (
          <div key={index} className="flex items-start gap-2 py-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
            <span className="text-stone-700">{feature}</span>
          </div>
        ))}
        {extraFeatures > 0 && (
          <p className="py-2 text-xs italic text-stone-400">
            … +{extraFeatures} más
          </p>
        )}
      </div>

      {/* Espacios incluidos */}
      {plan.spaces.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5 px-5 pb-5 pt-4">
          {plan.spaces.map((space) => (
            <span
              key={space.id}
              className="rounded-full bg-stone-200/70 px-2 py-0.5 text-xs text-stone-600"
            >
              {space.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
