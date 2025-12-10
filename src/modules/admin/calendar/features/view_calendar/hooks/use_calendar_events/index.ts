import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { socket } from "@/services";
import { getCalendar } from "../../service";
import type { Event } from "@/types";
import type { SocketReservation, RawCalendarEvent } from "../../types";
import { formatTime } from "../../utils";

const mapEventsForCalendar = (events: RawCalendarEvent[]): Event[] => {
  return events.map((event) => ({
    id: event.id,
    title: event.space,
    space: event.space,
    cliente: event.cliente,
    start_time: event.start_time,
    end_time: event.end_time,
    day: event.day,
    color: "stone",
  }));
};

export const useCalendarEvents = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);

  const {
    data: calendarData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["calendar"],
    queryFn: getCalendar,
  });

  useEffect(() => {
    if (calendarData) {
      const mappedEvents = mapEventsForCalendar(calendarData);
      setAllEvents(mappedEvents);
    }
  }, [calendarData]);

  useEffect(() => {
    const currentWeek = (() => {
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
    })();

    const onNewReservation = (reservation: SocketReservation) => {
      const reservationDate = new Date(reservation.start_time);

      const isInCurrentWeek = currentWeek.some(
        (dayInWeek) =>
          dayInWeek.toDateString() === reservationDate.toDateString()
      );

      if (!isInCurrentWeek) {
        return;
      }

      const dayOfMonth = reservationDate.getDate();

      const newEvent: Event = {
        id: reservation.reservation_id,
        title: reservation.space_name,
        space: reservation.space_name,
        start_time: formatTime(new Date(reservation.start_time)),
        end_time: formatTime(new Date(reservation.end_time)),
        day: dayOfMonth,
        color: "stone",
      };

      setAllEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    socket.on("RESERVATION_CREATED", onNewReservation);

    return () => {
      socket.off("RESERVATION_CREATED", onNewReservation);
    };
  }, []);

  return {
    allEvents,
    isLoading,
    isError,
    calendarData,
  };
};
