import { Button } from "@/components/ui";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { forwardRef } from "react";

interface Props {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  error?: string;
}

export const DateSelector = forwardRef<HTMLDivElement, Props>(
  ({ date, onDateChange, error }, ref) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isDateDisabled = (date: Date) => {
      const dateToCheck = new Date(date);
      dateToCheck.setHours(0, 0, 0, 0);
      return dateToCheck < today;
    };

    return (
      <div ref={ref} className="flex flex-col w-full">
        <label className="text-sm/6 text-stone-500 mb-2 block">
          Ingresa día de reserva:
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              data-empty={!date}
              className={`data-[empty=true]:text-muted-foreground rounded-lg w-full justify-start text-left font-normal text-sm px-4 py-2 shadow-none bg-white ${
                error ? "border-rose-800" : ""
              }`}
            >
              <CalendarIcon className="size-4" />
              {date ? (
                format(date, "PPP", { locale: es })
              ) : (
                <span>Selecciona fecha</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-lg">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              disabled={isDateDisabled}
            />
          </PopoverContent>
        </Popover>

        {error && <p className="text-rose-800 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);
