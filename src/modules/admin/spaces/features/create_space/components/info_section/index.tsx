import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import type { CreateSpaceData } from "../../types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<CreateSpaceData>;
  errors: FieldErrors<CreateSpaceData>;
}

export const GeneralInfoSection: React.FC<Props> = ({ register, errors }) => (
  <Card>
    <CardHeader>
      <CardTitle>Información General</CardTitle>
      <CardDescription>
        Define el nombre, descripción y tipo de espacio.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name" className="mb-2 block">
            Nombre
          </Label>
          <Input
            id="name"
            placeholder="Ej. Sala de Juntas A"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-rose-800 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="type" className="mb-2 block">
            Tipo
          </Label>

          <Select {...register("type")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona el tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full_room">Sala Completa</SelectItem>
              <SelectItem value="shared_site">Sitio Compartido</SelectItem>
              <SelectItem value="unit">Unidad (Escritorio)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="description" className="mb-2 block">
          Descripción <span className="text-xs text-stone-400">(opcional)</span>
        </Label>
        <Textarea
          id="description"
          placeholder="Describe las características principales del espacio..."
          {...register("description")}
        />
      </div>
    </CardContent>
  </Card>
);
