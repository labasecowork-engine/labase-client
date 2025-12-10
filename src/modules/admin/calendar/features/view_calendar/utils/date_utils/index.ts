export const getDayName = (date: Date, short: boolean = false) => {
  const days = short
    ? ["L", "M", "X", "J", "V", "S", "D"]
    : ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const dayIndex = date.getDay();
  return days[dayIndex === 0 ? 6 : dayIndex - 1];
};

export const isToday = (date: Date) => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const getTodayDayOfMonth = () => {
  const today = new Date();
  return today.getDate();
};

export const getCurrentWeek = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const monday = new Date(today);

  const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  monday.setDate(today.getDate() + daysToMonday);

  const week = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    week.push(day);
  }

  return week;
};

export const formatTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};
