import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Switch,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { EditSpaceData } from "../../types";

interface Props {
  register: UseFormRegister<EditSpaceData>;
  control: Control<EditSpaceData>;
  errors: FieldErrors<EditSpaceData>;
}

export const ConfigSection: React.FC<Props> = ({
  register,
  control,
  errors,
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Configuración y Permisos</CardTitle>
      <CardDescription>
        Establece la capacidad, el acceso y las modalidades de reserva.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Label htmlFor="capacity_min" className="mb-2 block">
            Capacidad Mínima
          </Label>
          <Input
            id="capacity_min"
            type="number"
            {...register("capacity_min", { valueAsNumber: true })}
          />
          {errors.capacity_min && (
            <p className="text-rose-800 text-sm mt-1">
              {errors.capacity_min.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="capacity_max" className="mb-2 block">
            Capacidad Máxima
          </Label>
          <Input
            id="capacity_max"
            type="number"
            {...register("capacity_max", { valueAsNumber: true })}
          />
          {errors.capacity_max && (
            <p className="text-rose-800 text-sm mt-1">
              {errors.capacity_max.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="access" className="mb-2 block">
            Tipo de Acceso
          </Label>
          <Controller
            name="access"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona el tipo de acceso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Público</SelectItem>
                  <SelectItem value="private">Privado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <div className="flex items-center space-x-3 p-3 bg-stone-100 rounded-lg">
          <Controller
            name="allow_by_unit"
            control={control}
            render={({ field }) => (
              <Switch
                id="allow_by_unit"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="allow_by_unit" className="cursor-pointer">
            Permitir reserva por persona
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-stone-100 rounded-lg">
          <Controller
            name="allow_full_room"
            control={control}
            render={({ field }) => (
              <Switch
                id="allow_full_room"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="allow_full_room" className="cursor-pointer">
            Permitir reserva de espacio completo
          </Label>
        </div>
      </div>
    </CardContent>
  </Card>
);
