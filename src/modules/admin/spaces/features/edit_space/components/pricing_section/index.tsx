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
import {
  Controller,
  type FieldArrayWithId,
  type FieldErrors,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import { PlusIcon, Trash2Icon } from "lucide-react";
import type { EditSpaceData } from "../../types";

export interface Props {
  register: UseFormRegister<EditSpaceData>;
  control: Control<EditSpaceData>;
  errors: FieldErrors<EditSpaceData>;
  fields: FieldArrayWithId<EditSpaceData, "prices", "id">[];
  append: (price: EditSpaceData["prices"][number]) => void;
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
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_auto] items-end gap-4 p-4 bg-stone-100 rounded-lg"
        >
          <div>
            <Label>Unidad de Tiempo</Label>
            <Controller
              name={`prices.${index}.duration`}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hour">Por hora</SelectItem>
                    <SelectItem value="day">Por día</SelectItem>
                    <SelectItem value="week">Por semana</SelectItem>
                    <SelectItem value="month">Por mes</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label>Modo</Label>
            <Controller
              name={`prices.${index}.mode`}
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona modo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="group">Grupal</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div>
            <Label>Monto (S/)</Label>
            <Input
              placeholder="0.00"
              type="number"
              step="0.01"
              {...register(`prices.${index}.amount`, {
                valueAsNumber: true,
              })}
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
        className="mt-4 w-full border-dashed bg-stone-50 shadow-none"
        onClick={() =>
          append({ duration: "hour", amount: 0, mode: "individual" })
        }
      >
        <PlusIcon className="size-4 mr-2" />
        Añadir tarifa
      </Button>
    </CardContent>
  </Card>
);
