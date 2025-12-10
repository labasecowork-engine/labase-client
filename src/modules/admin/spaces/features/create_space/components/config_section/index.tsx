import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@/components/ui";

import type { CreateSpaceData } from "../../types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<CreateSpaceData>;
  errors: FieldErrors<CreateSpaceData>;
}

export const ConfigSection: React.FC<Props> = ({ register, errors }) => (
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
            Capacidad mínima
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
            Capacidad máxima
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
            Tipo de acceso
          </Label>
          <Select {...register("access")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona el tipo de acceso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PUBLIC">Público</SelectItem>
              <SelectItem value="PRIVATE">Privado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center space-x-3 p-3 bg-stone-100 rounded-lg">
          <Switch id="allow_by_unit" {...register("allow_by_unit")} />
          <Label htmlFor="allow_by_unit" className="cursor-pointer">
            Permitir reserva por persona
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-stone-100 rounded-lg">
          <Switch id="allow_full_room" {...register("allow_full_room")} />
          <Label htmlFor="allow_full_room" className="cursor-pointer">
            Permitir reserva de espacio completo
          </Label>
        </div>
      </div>
    </CardContent>
  </Card>
);
