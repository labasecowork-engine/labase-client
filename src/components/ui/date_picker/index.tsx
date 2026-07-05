import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utilities";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const pad = (n: number): string => String(n).padStart(2, "0");

// "YYYY-MM-DD" → Date local (sin desfase de zona horaria).
const parseDateStr = (value: string): Date | undefined => {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
};

// Date → "YYYY-MM-DD" (hora local).
const toDateStr = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

interface Props {
  value?: string;
  onChange: (value: string) => void;
  id?: string;
  placeholder?: string;
  error?: boolean;
  className?: string;
}

/**
 * Selector de fecha basado en el componente Calendar del design system.
 * Trabaja con strings "YYYY-MM-DD" (el formato que usa la API), así se integra
 * tanto en formularios react-hook-form (value/onChange con setValue/watch) como
 * en filtros controlados.
 */
export const DatePicker = ({
  value,
  onChange,
  id,
  placeholder = "Selecciona una fecha",
  error,
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selected = parseDateStr(value ?? "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          className={cn(
            "w-full justify-start rounded-lg border border-stone-200 bg-white px-4 py-2 text-left font-normal text-stone-900 hover:bg-stone-100",
            !value && "text-stone-500",
            error && "border-rose-800",
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {selected ? format(selected, "PPP", { locale: es }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={(date) => {
            onChange(date ? toDateStr(date) : "");
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
