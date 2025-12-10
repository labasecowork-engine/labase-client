import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
  Label,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { PlusIcon, Trash2Icon } from "lucide-react";
import type { CreateSpaceData } from "../../types";
import type {
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
  Control,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  DURATION_UNIT_DAY,
  DURATION_UNIT_HOUR,
  DURATION_UNIT_MONTH,
  DURATION_UNIT_WEEK,
  PRICE_MODE_GROUP,
  PRICE_MODE_INDIVIDUAL,
} from "@/types";

interface Props {
  register: UseFormRegister<CreateSpaceData>;
  control: Control<CreateSpaceData>;
  errors: FieldErrors<CreateSpaceData>;
  fields: FieldArrayWithId<CreateSpaceData, "prices", "id">[];
  append: (price: CreateSpaceData["prices"][number]) => void;
  remove: (index: number) => void;
}
export const PricingSection: React.FC<Props> = ({
  register,
  control,
  errors,
  fields,
  append,
  remove,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Tarifas de Precios</CardTitle>
      <CardDescription>
        Define los precios para las diferentes modalidades y duraciones.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] items-end p-4 bg-stone-100 gap-4 rounded-lg"
        >
          <div>
            <Label className="mb-2 block">Unidad de tiempo</Label>
            <Controller
              name={`prices.${index}.duration`}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona unidad de tiempo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={DURATION_UNIT_HOUR}>Por hora</SelectItem>
                    <SelectItem value={DURATION_UNIT_DAY}>Por día</SelectItem>
                    <SelectItem value={DURATION_UNIT_WEEK}>
                      Por semana
                    </SelectItem>
                    <SelectItem value={DURATION_UNIT_MONTH}>Por mes</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label className="mb-2 block">Modo</Label>
            <Controller
              name={`prices.${index}.mode`}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona modo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={PRICE_MODE_INDIVIDUAL}>
                      Individual
                    </SelectItem>
                    <SelectItem value={PRICE_MODE_GROUP}>Grupal</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label className="mb-2 block">Monto (S/)</Label>{" "}
            <Input
              placeholder="0.00"
              type="number"
              step="0.01"
              {...register(`prices.${index}.amount`, { valueAsNumber: true })}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => remove(index)}
            className="text-stone-500 bg-stone-200 rounded-lg m-0 hover:bg-rose-100 hover:text-rose-800 h-[40px]"
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      ))}
      {errors.prices && (
        <p className="text-rose-800 text-sm mt-1">{errors.prices.message}</p>
      )}
      <Button
        type="button"
        variant="outline"
        className="mt-4 w-full border-dashed bg-stone-50 shadow-none rounded-lg"
        onClick={() =>
          append({
            duration: DURATION_UNIT_HOUR,
            amount: 0,
            mode: PRICE_MODE_INDIVIDUAL,
          })
        }
      >
        <PlusIcon className="size-4" />
        Añadir tarifa
      </Button>
    </CardContent>
  </Card>
);
