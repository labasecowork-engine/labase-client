import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormInput,
  FormTextarea,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@/components/ui";
import { cn } from "@/utilities";
import { RotateCcw, Save } from "lucide-react";
import { planSchema, type PlanForm as PlanFormValues } from "../../schema";
import {
  BILLING_PERIOD_OPTIONS,
  CATEGORY_OPTIONS,
  LABEL_COLOR_OPTIONS,
} from "../../constants";
import { useCreatePlan, useSpaceOptions, useUpdatePlan } from "../../hooks";
import type { BillingPeriod, Plan, PlanInput } from "../../types";
import { SpacePicker } from "../space_picker";
import { FeaturesEditor } from "../features_editor";

interface Props {
  initialPlan?: Plan | null;
  onSuccess?: () => void;
}

const buildDefaults = (plan?: Plan | null): PlanFormValues =>
  plan
    ? {
        name: plan.name,
        is_custom_price: plan.price === null,
        price: plan.price !== null ? String(plan.price) : "",
        category: plan.category,
        billing_period: plan.billing_period,
        target_audience: plan.target_audience ?? "",
        label_color: plan.label_color,
        description: plan.description ?? "",
        space_ids: plan.spaces.map((space) => space.id),
        features: plan.features,
      }
    : {
        name: "",
        is_custom_price: false,
        price: "",
        category: "individual",
        billing_period: "",
        target_audience: "",
        label_color: "gold",
        description: "",
        space_ids: [],
        features: [],
      };

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-stone-500">
    {children}
  </h3>
);

export const PlanForm = ({ initialPlan, onSuccess }: Props) => {
  const isEdit = !!initialPlan;
  const { data: spaceOptions = [], isLoading: isLoadingSpaces } =
    useSpaceOptions();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: buildDefaults(initialPlan),
  });

  const resetForm = () => reset(buildDefaults());

  const { createPlan, isCreating } = useCreatePlan(() => {
    resetForm();
    onSuccess?.();
  });
  const { updatePlan, isUpdating } = useUpdatePlan(() => onSuccess?.());
  const isPending = isCreating || isUpdating;

  const isCustomPrice = watch("is_custom_price");
  const category = watch("category");
  const billingPeriod = watch("billing_period");
  const labelColor = watch("label_color");
  const spaceIds = watch("space_ids");
  const features = watch("features");

  const onSubmit = (form: PlanFormValues) => {
    const input: PlanInput = {
      name: form.name,
      price: form.is_custom_price ? null : Number(form.price),
      category: form.category,
      billing_period: form.billing_period as BillingPeriod,
      target_audience: form.target_audience?.trim() || null,
      label_color: form.label_color,
      description: form.description?.trim() || null,
      features: form.features.map((feature) => feature.trim()).filter(Boolean),
      space_ids: form.space_ids,
    };
    if (initialPlan) updatePlan({ id: initialPlan.id, input });
    else createPlan(input);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Datos del plan */}
      <section className="rounded-lg bg-stone-50 p-5">
        <SectionTitle>Datos del plan</SectionTitle>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput
            label="Nombre del plan *"
            name="name"
            register={register}
            errors={errors}
            placeholder="Ej: Básico, Premium…"
          />
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="price">Precio (S/.) *</Label>
              <label className="flex items-center gap-2 text-xs text-stone-500">
                <Switch
                  checked={isCustomPrice}
                  onCheckedChange={(checked) =>
                    setValue("is_custom_price", checked)
                  }
                />
                A medida
              </label>
            </div>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              disabled={isCustomPrice}
              placeholder={isCustomPrice ? "A medida" : "0.00"}
              {...register("price")}
              className={cn(
                errors.price && "border-rose-800",
                isCustomPrice && "opacity-50"
              )}
            />
            {errors.price && (
              <p className="text-sm text-rose-800">{errors.price.message}</p>
            )}
          </div>
        </div>
      </section>

      {/* Espacios */}
      <section className="rounded-lg bg-stone-50 p-5">
        <SectionTitle>Espacios disponibles para este plan</SectionTitle>
        <SpacePicker
          options={spaceOptions}
          value={spaceIds}
          onChange={(ids) => setValue("space_ids", ids)}
          isLoading={isLoadingSpaces}
        />
        <p className="mt-2 text-xs text-stone-400">
          Selecciona uno o más espacios que incluye este plan.
        </p>
      </section>

      {/* Clasificación */}
      <section className="rounded-lg bg-stone-50 p-5">
        <SectionTitle>Clasificación</SectionTitle>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select
              value={category}
              onValueChange={(value) =>
                setValue("category", value as PlanFormValues["category"])
              }
            >
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="— Seleccionar —" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billing_period">Período de cobro *</Label>
            <Select
              value={billingPeriod || undefined}
              onValueChange={(value) => setValue("billing_period", value)}
            >
              <SelectTrigger id="billing_period" className="w-full">
                <SelectValue placeholder="Selecciona período" />
              </SelectTrigger>
              <SelectContent>
                {BILLING_PERIOD_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.billing_period && (
              <p className="text-sm text-rose-800">
                {errors.billing_period.message}
              </p>
            )}
          </div>

          <FormInput
            label="Público objetivo"
            name="target_audience"
            register={register}
            errors={errors}
            placeholder="Ej: Jóvenes/Estudiantes, Profesionales…"
          />

          <div className="space-y-2">
            <Label htmlFor="label_color">Color de etiqueta</Label>
            <Select
              value={labelColor}
              onValueChange={(value) =>
                setValue("label_color", value as PlanFormValues["label_color"])
              }
            >
              <SelectTrigger id="label_color" className="w-full">
                <SelectValue placeholder="— Seleccionar —" />
              </SelectTrigger>
              <SelectContent>
                {LABEL_COLOR_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <FormTextarea
              label="Descripción"
              name="description"
              register={register}
              errors={errors}
              placeholder="Describe brevemente este plan…"
            />
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="rounded-lg bg-stone-50 p-5">
        <SectionTitle>Características incluidas</SectionTitle>
        <FeaturesEditor
          value={features}
          onChange={(next) => setValue("features", next)}
        />
      </section>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button type="submit" disabled={isPending} className="sm:flex-1">
          <Save className="size-4" />
          {isPending
            ? "Guardando…"
            : isEdit
              ? "Guardar cambios"
              : "Guardar plan"}
        </Button>
        {!isEdit && (
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            className={cn(isPending && "pointer-events-none opacity-50")}
          >
            <RotateCcw className="size-4" />
            Limpiar
          </Button>
        )}
      </div>
    </form>
  );
};
