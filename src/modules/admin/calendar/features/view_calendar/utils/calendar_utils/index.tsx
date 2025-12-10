import type { ReactNode } from "react";

export const timeToGridRow = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const hoursFromStart = hours - 9;
  const extraRows = minutes >= 30 ? 1 : 0;
  return hoursFromStart * 2 + extraRows + 2;
};

export const timeToGridRowDay = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;
  return Math.floor(totalMinutes / 5) + 2;
};

export const getEventDuration = (startTime: string, endTime: string) => {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  return Math.ceil((endTotalMinutes - startTotalMinutes) / 30);
};

export const getEventDurationDay = (startTime: string, endTime: string) => {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;

  return Math.ceil((endTotalMinutes - startTotalMinutes) / 5);
};

export const getEventColumn = (dayOfMonth: number, currentWeek: Date[]) => {
  const dayIndex = currentWeek.findIndex(
    (date) => date.getDate() === dayOfMonth
  );

  if (dayIndex === -1) return null;

  return dayIndex + 2;
};

export const generateTimeSlots = (): ReactNode[] => {
  const slots = [];

  const formatHour = (hour: number) => {
    if (hour === 12) return "12PM";
    if (hour > 12) return `${hour - 12}PM`;
    return `${hour}AM`;
  };

  for (let hour = 9; hour <= 19; hour++) {
    slots.push(
      <div key={`${hour}-label`}>
        <div className="sticky left-0 z-20 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
          {formatHour(hour)}
        </div>
      </div>
    );
    slots.push(<div key={`${hour}-empty`} />);
  }
  return slots;
};
