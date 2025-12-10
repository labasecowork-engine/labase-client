import { useEffect, useRef } from "react";
import type { Event } from "@/types";
import { Link } from "react-router-dom";
import { useCalendarWeek } from "../../hooks";
import {
  getDayName,
  isToday,
  timeToGridRow,
  getEventDuration,
  getEventColumn,
} from "../../utils";

interface CalendarProps {
  events: Event[];
}

export const CalendarWeek = ({ events }: CalendarProps) => {
  const container = useRef<HTMLDivElement | null>(null);
  const containerNav = useRef<HTMLDivElement | null>(null);
  const containerOffset = useRef<HTMLDivElement | null>(null);

  const { currentWeek } = useCalendarWeek();

  const generateTimeSlots = () => {
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

  useEffect(() => {
    if (container.current && containerNav.current && containerOffset.current) {
      const currentMinute = 0;
      const scrollTop =
        ((container.current.scrollHeight -
          containerNav.current.offsetHeight -
          containerOffset.current.offsetHeight) *
          currentMinute) /
        600;
      container.current.scrollTop = scrollTop;
    }
  }, []);

  if (currentWeek.length === 0) {
    return <div>Cargando calendario...</div>;
  }

  return (
    <div className="flex h-full flex-col">
      <div ref={container} className="overflow-auto h-full">
        <div className="isolate flex flex-auto flex-col bg-stone-50 rounded-lg overflow-hidden">
          <div
            style={{ width: "165%" }}
            className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full"
          >
            <div
              ref={containerNav}
              className="sticky top-0 z-30 flex-none bg-stone-50 shadow-sm ring-1 ring-black/5 sm:pr-8"
            >
              <div className="grid grid-cols-7 text-sm/6 text-stone-500 sm:hidden">
                {currentWeek.map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex flex-col items-center pt-2 pb-3"
                  >
                    {getDayName(date, true)}{" "}
                    <span
                      className={`mt-1 flex size-8 items-center justify-center font-semibold ${
                        isToday(date)
                          ? "rounded-full bg-stone-600 text-white"
                          : "text-stone-900"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                  </button>
                ))}
              </div>

              <div className="-mr-px hidden grid-cols-7 divide-x divide-stone-100 border-r border-stone-100 text-sm/6 text-stone-500 sm:grid">
                <div className="col-end-1 w-14" />
                {currentWeek.map((date, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center py-3"
                  >
                    <span
                      className={isToday(date) ? "flex items-baseline" : ""}
                    >
                      {getDayName(date)}{" "}
                      <span
                        className={`items-center justify-center font-semibold ${
                          isToday(date)
                            ? "ml-1.5 flex size-8 justify-center rounded-full bg-stone-600 text-white"
                            : "text-stone-900"
                        }`}
                      >
                        {date.getDate()}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-auto">
              <div className="sticky left-0 z-10 w-14 flex-none bg-stone-50 ring-1 ring-stone-100" />
              <div className="grid flex-auto grid-cols-1 grid-rows-1">
                <div
                  className="col-start-1 col-end-2 row-start-1 grid divide-y divide-stone-100"
                  style={{
                    gridTemplateRows: "repeat(22, minmax(3.5rem, 1fr))",
                  }}
                >
                  <div ref={containerOffset} className="row-end-1 h-7"></div>
                  {generateTimeSlots()}
                </div>

                <div className="col-start-1 col-end-2 row-start-1 hidden grid-cols-8 grid-rows-1 divide-x divide-stone-100 sm:grid">
                  <div className="col-start-1 row-span-full" />
                  <div className="col-start-2 row-span-full" />
                  <div className="col-start-3 row-span-full" />
                  <div className="col-start-4 row-span-full" />
                  <div className="col-start-5 row-span-full" />
                  <div className="col-start-6 row-span-full" />
                  <div className="col-start-7 row-span-full" />
                  <div className="col-start-8 row-span-full" />
                </div>

                <ol
                  className="col-start-1 col-end-2 row-start-1 grid grid-cols-8 sm:pr-8"
                  style={{
                    gridTemplateRows:
                      "1.75rem repeat(22, minmax(3.5rem, 1fr)) auto",
                  }}
                >
                  {events
                    .filter(
                      (event) => getEventColumn(event.day, currentWeek) !== null
                    )
                    .map((event) => {
                      const eventColumn = getEventColumn(
                        event.day,
                        currentWeek
                      );
                      return (
                        <li
                          key={event.id}
                          className="relative mt-px flex"
                          style={{
                            gridRow: `${timeToGridRow(
                              event.start_time
                            )} / span ${getEventDuration(
                              event.start_time,
                              event.end_time
                            )}`,
                            gridColumn: `${eventColumn} / ${eventColumn}`,
                          }}
                        >
                          <Link
                            to={`/admin/reservations/${event.id}`}
                            className={`group absolute inset-1 flex flex-col justify-between overflow-y-auto p-2 text-xs/5 bg-stone-200 text-stone-900 hover:bg-stone-300 transition-all border-l-4 border-stone-400`}
                          >
                            <div>
                              <p className="group-hover:opacity-75">
                                <time dateTime={event.start_time}>
                                  {event.start_time}
                                </time>
                              </p>
                              <p className="order-1 font-semibold">
                                {event.title || event.space}
                              </p>
                            </div>
                            <p className="order-2 font-normal text-xs">
                              {event.cliente}
                            </p>
                          </Link>
                        </li>
                      );
                    })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
