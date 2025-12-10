import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Label,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { ChevronDownIcon } from "lucide-react";

interface Props {
  label?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  error?: string;
}

export const DateTimePicker: React.FC<Props> = ({
  label = "Fecha y hora",
  value,
  onChange,
  error,
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const [selectedTime, setSelectedTime] = useState<string>(
    value ? value.toTimeString().slice(0, 8) : ""
  );
  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setSelectedTime(value.toTimeString().slice(0, 8));
    }
  }, []);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date && selectedTime) {
      const [hours, minutes, seconds] = selectedTime.split(":");
      const combined = new Date(date);
      combined.setHours(
        parseInt(hours),
        parseInt(minutes),
        parseInt(seconds || "0")
      );
      onChange(combined);
    } else if (!date) {
      onChange(undefined);
    }
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    if (selectedDate && time) {
      const [hours, minutes, seconds] = time.split(":");
      const combined = new Date(selectedDate);
      combined.setHours(
        parseInt(hours),
        parseInt(minutes),
        parseInt(seconds || "0")
      );
      onChange(combined);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <Label htmlFor="date-picker" className="mb-2 block">
          {label}
        </Label>
      )}

      <div className="flex gap-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 w-full">
          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                type="button"
                className="justify-between hover:bg-stone-100 px-4 font-normal h-[38px] rounded-lg bg-white border border-stone-200 text-stone-700"
              >
                {selectedDate
                  ? selectedDate.toLocaleDateString()
                  : "Seleccionar fecha"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  handleDateChange(date);
                  setDatePickerOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>

          <Input
            type="time"
            id="time-picker"
            step="1"
            value={selectedTime}
            onChange={(e) => handleTimeChange(e.target.value)}
            className="w-full bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>

      {error && <p className="text-rose-800 text-sm mt-1">{error}</p>}
    </div>
  );
};
