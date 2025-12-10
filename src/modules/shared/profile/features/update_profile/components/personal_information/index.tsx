import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, FormInput } from "@/components/ui";
import { CalendarIcon } from "lucide-react";
import type { UpdateProfileFormData } from "../../schema";

interface Props {
  register: UseFormRegister<UpdateProfileFormData>;
  control: Control<UpdateProfileFormData>;
  errors: FieldErrors<UpdateProfileFormData>;
  genderOptions: { label: string; value: string }[];
  selectedDate?: Date;
}

export const PersonalInformation: React.FC<Props> = ({
  register,
  control,
  errors,
  genderOptions,
  selectedDate,
}) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Información personal</CardTitle>
        <CardDescription>
          Aquí puedes actualizar tu perfil y tus datos personales.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Nombre"
              placeholder="Ej. Juan"
              name="firstName"
              register={register}
              errors={errors}
            />
            <FormInput
              label="Apellido"
              placeholder="Ej. Pérez"
              name="lastName"
              register={register}
              errors={errors}
            />
          </div>

          {/* Teléfono y fecha de nacimiento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block mb-2">Número de teléfono</Label>
              <div className="flex items-center">
                <span className="text-sm text-stone-500 h-[38px] px-3 bg-stone-100 border-t border-b border-l border-stone-200 rounded-l-sm flex items-center justify-center">
                  +51
                </span>
                <Input
                  {...register("phone")}
                  placeholder="Ej. 987654321"
                  className={`${errors.phone ? "border-rose-800" : ""} rounded-l-none h-[38px] border-t border-b border-r border-stone-200`}
                />
              </div>
              {errors.phone && (
                <p className="text-rose-800 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label className="block mb-2">Fecha de nacimiento</Label>
              <Controller
                control={control}
                name="birthDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        className={`w-full justify-start text-stone-600 text-left font-normal bg-white border border-stone-200 rounded-lg px-4 h-[38px] hover:bg-stone-50 ${
                          !selectedDate && "text-stone-500"
                        } ${errors.birthDate ? "border-rose-800" : ""}`}
                      >
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        {selectedDate
                          ? format(selectedDate, "PPP", { locale: es })
                          : "Selecciona una fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        selected={selectedDate}
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(format(date, "yyyy-MM-dd"));
                          } else {
                            field.onChange("");
                          }
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.birthDate && (
                <p className="text-rose-800 text-sm mt-1">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Género */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full">
              <Label className="block mb-2">Género</Label>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    key={field.value}
                  >
                    <SelectTrigger
                      className={`${errors.gender ? "border-rose-800" : ""} w-full`}
                    >
                      <SelectValue placeholder="Selecciona un género" />
                    </SelectTrigger>
                    <SelectContent>
                      {genderOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && (
                <p className="text-rose-800 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
