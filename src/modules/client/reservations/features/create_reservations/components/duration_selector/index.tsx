import { Button } from "@/components/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown_menu";
import { ClockIcon } from "@heroicons/react/20/solid";
import { forwardRef } from "react";
import { generateTimeSlots, getAvailableEndTimes } from "@/utilities/";

interface Props {
  date: Date | null;
  startTime: string | null;
  endTime: string | null;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  startTimeError?: string;
  endTimeError?: string;
}

export const DurationSelector = forwardRef<HTMLDivElement, Props>(
  (
    {
      date,
      startTime,
      endTime,
      onStartTimeChange,
      onEndTimeChange,
      startTimeError,
      endTimeError,
    },
    ref
  ) => {
    const startTimeSlots = generateTimeSlots(date);
    const endTimeSlots = getAvailableEndTimes(startTime, date);

    const handleStartTimeChange = (time: string) => {
      onStartTimeChange(time);
      if (endTime) {
        const availableEndTimes = getAvailableEndTimes(time, date);
        if (!availableEndTimes.includes(endTime)) {
          onEndTimeChange("");
        }
      }
    };

    return (
      <div
        ref={ref}
        className="items-start gap-4 mb-6 grid grid-cols-1 lg:grid-cols-2"
      >
        <div className="flex flex-col w-full">
          <label className="text-sm/6 text-stone-500 mb-2">
            Ingresa hora de inicio:
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal text-sm px-4 py-2 rounded-lg text-stone-500 bg-white ${
                  startTimeError ? "border-rose-800" : ""
                }`}
              >
                <ClockIcon className="size-4" />
                {startTime ? startTime : "Selecciona hora"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto p-0 rounded-lg max-h-60 overflow-y-auto">
              {startTimeSlots.map((time) => (
                <DropdownMenuItem
                  key={time}
                  className="px-3 py-1 rounded-lg cursor-pointer"
                  onClick={() => handleStartTimeChange(time)}
                >
                  <span>{time}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {startTimeError && (
            <p className="text-rose-800 text-xs mt-1">{startTimeError}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-sm/6 text-stone-500 mb-2">
            Ingresa hora de finalización:
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`w-full justify-start text-left font-normal text-sm px-4 py-2 rounded-lg text-stone-500 bg-white ${
                  endTimeError ? "border-rose-800" : ""
                }`}
                disabled={endTimeSlots.length === 0}
              >
                <ClockIcon className="size-4" />
                {endTime
                  ? endTime
                  : endTimeSlots.length === 0
                    ? "Selecciona hora de inicio primero"
                    : "Selecciona hora"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto p-0 rounded-lg max-h-60 overflow-y-auto">
              {endTimeSlots.map((time) => (
                <DropdownMenuItem
                  key={time}
                  className="px-3 py-1 rounded-lg cursor-pointer"
                  onClick={() => onEndTimeChange(time)}
                >
                  <span>{time}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {endTimeError && (
            <p className="text-rose-800 text-xs mt-1">{endTimeError}</p>
          )}
        </div>
      </div>
    );
  }
);
