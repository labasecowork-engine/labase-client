import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type FieldErrors,
  type FieldError,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  errors: FieldErrors<T>;
}

export function FormDatePicker<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Selecciona una fecha",
  errors,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const error = errors[name] as FieldError | undefined;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                type="button"
                className={`w-full justify-start rounded-lg hover:bg-stone-100 text-stone-500 bg-white border border-stone-200 text-left font-normal px-4 py-2 ${
                  !field.value && "text-stone-500"
                } ${error ? "border-rose-800" : ""}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value
                  ? format(field.value, "PPP", { locale: es })
                  : placeholder}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
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
      {error?.message && (
        <p className="text-sm text-rose-800">{error.message}</p>
      )}
    </div>
  );
}
