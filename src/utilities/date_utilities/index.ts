import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

export const dayNames = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
];

export const getDayName = (dateString: string) => {
  const date = new Date(dateString + "T00:00:00");
  return dayNames[date.getDay()];
};

export const timeToMinutes = (time: string): number => {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/i);
  if (!match) {
    return 0;
  }

  const [, hourStr, minuteStr, period] = match;
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  if (period === "am" && hour === 12) {
    hour = 0;
  } else if (period === "pm" && hour !== 12) {
    hour += 12;
  }

  return hour * 60 + minute;
};

export const convertTimeToISO = (date: Date, time: string): string => {
  const timeMinutes = timeToMinutes(time);
  const hours = Math.floor(timeMinutes / 60);
  const minutes = timeMinutes % 60;

  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);

  return newDate.toISOString();
};

export const formatTimeTo12Hours = (isoString: string): string => {
  const date = new Date(isoString);
  return date
    .toLocaleTimeString("es-ES", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();
};

export const formatTimeRange = (startTime: string, endTime: string): string => {
  return `${formatTimeTo12Hours(startTime)} - ${formatTimeTo12Hours(endTime)}`;
};

export const formatDateToShort = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

export const calculateTotalWorkedHours = (
  records: { time: string; type: string }[]
) => {
  if (!records.length) return "--";

  const sorted = [...records].sort((a, b) => {
    const [ha, ma] = a.time.split(":").map(Number);
    const [hb, mb] = b.time.split(":").map(Number);
    return ha * 60 + ma - (hb * 60 + mb);
  });

  let totalMinutes = 0;
  let lastEntry: number | null = null;

  for (const record of sorted) {
    const [hour, min] = record.time.split(":").map(Number);
    const minutes = hour * 60 + min;

    if (record.type === "entry") {
      lastEntry = minutes;
    } else if (record.type === "exit" && lastEntry !== null) {
      const diff = minutes - lastEntry;
      if (diff > 0) totalMinutes += diff;
      lastEntry = null;
    }
  }

  if (totalMinutes <= 0) return "--";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}h ${minutes}m`;
};

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "d 'de' MMMM 'del' yyyy", { locale: es });
};

export const formatTime = (timeString: string) => {
  return format(new Date(timeString), "p", { locale: es });
};

export const generateTimeSlots = (dateArg: Date | null) => {
  const times = [];

  const date = new Date();

  let hourNow: number;

  if (dateArg) {
    const isSameDay = dateArg.toDateString() === date.toDateString();

    if (isSameDay) {
      const currentHour = date.getHours();
      hourNow = Math.max(9, Math.min(20, currentHour));
    } else {
      hourNow = 9;
    }
  } else {
    const currentHour = date.getHours();
    hourNow = Math.max(9, Math.min(20, currentHour));
  }

  for (let hour = hourNow; hour <= 20; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      let displayHour = hour;
      let period = "am";

      if (hour === 0) {
        displayHour = 12;
      } else if (hour === 12) {
        displayHour = 12;
        period = "pm";
      } else if (hour > 12) {
        displayHour = hour - 12;
        period = "pm";
      }

      const timeString = `${displayHour}:${minute
        .toString()
        .padStart(2, "0")}${period}`;
      times.push(timeString);
    }
  }
  return times;
};

export const getAvailableEndTimes = (
  startTime: string | null,
  date: Date | null
) => {
  const allTimes = generateTimeSlots(date);

  if (!startTime) {
    return allTimes.filter((time) => timeToMinutes(time) >= 570);
  }

  const startMinutes = timeToMinutes(startTime);
  const minEndMinutes = startMinutes + 60;

  if (minEndMinutes > 1245) {
    return [];
  }

  return allTimes.filter((time) => timeToMinutes(time) >= minEndMinutes);
};

export const formatDateRange = (dateRange?: DateRange) => {
  if (!dateRange?.from) return "Seleccionar fechas";

  if (dateRange.from && dateRange.to) {
    return `${format(dateRange.from, "dd/MM/yyyy", { locale: es })} - ${format(dateRange.to, "dd/MM/yyyy", { locale: es })}`;
  }

  if (dateRange.from) {
    return `Desde ${format(dateRange.from, "dd/MM/yyyy", { locale: es })}`;
  }

  return "Seleccionar fechas";
};
