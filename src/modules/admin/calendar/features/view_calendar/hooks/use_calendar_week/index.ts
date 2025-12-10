import { useState, useEffect } from "react";

export const useCalendarWeek = () => {
  const [currentWeek, setCurrentWeek] = useState<Date[]>([]);

  const getCurrentWeek = () => {
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

  useEffect(() => {
    setCurrentWeek(getCurrentWeek());
  }, []);

  return {
    currentWeek,
    getCurrentWeek,
  };
};
