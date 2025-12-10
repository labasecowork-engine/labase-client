import type { Event } from "@/types";
import { useCalendarWeek } from "../../hooks";
import {
  getDayName,
  isToday,
  getTodayDayOfMonth,
  timeToGridRowDay,
  getEventDurationDay,
} from "../../utils";

interface CalendarDayProps {
  events: Event[];
}

export const CalendarDay = ({ events }: CalendarDayProps) => {
  const { currentWeek } = useCalendarWeek();

  const todayEvents = events.filter(
    (event) => event.day === getTodayDayOfMonth()
  );

  return (
    <div className="flex h-full flex-col bg-stone-50 rounded-lg overflow-hidden">
      <div className="isolate flex flex-auto overflow-hidden">
        <div className="flex flex-auto flex-col overflow-auto">
          <div className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-stone-50 text-xs text-stone-500 shadow-sm ring-1 ring-black/5">
            {currentWeek.length > 0
              ? currentWeek.map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex flex-col items-center pt-3 pb-1.5"
                  >
                    <span>{getDayName(date, true)}</span>
                    <span
                      className={`mt-3 flex size-8 items-center justify-center text-base font-semibold ${
                        isToday(date)
                          ? "rounded-full bg-stone-800 text-white"
                          : "text-stone-900"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                  </button>
                ))
              : Array.from({ length: 7 }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    className="flex flex-col items-center pt-3 pb-1.5"
                  >
                    <span>-</span>
                    <span className="mt-3 flex size-8 items-center justify-center text-base font-semibold text-stone-900">
                      -
                    </span>
                  </button>
                ))}
          </div>
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none bg-stone-50 ring-1 ring-stone-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              <div
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-stone-100"
              >
                <div className="row-end-1 h-7" />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="-mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-stone-400">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              <ol
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
              >
                {todayEvents.map((event) => {
                  return (
                    <li
                      key={event.id}
                      style={{
                        gridRow: `${timeToGridRowDay(
                          event.start_time
                        )} / span ${getEventDurationDay(
                          event.start_time,
                          event.end_time
                        )}`,
                      }}
                      className="relative mt-px flex"
                    >
                      <a
                        href="#"
                        className={`group absolute inset-1 flex flex-col overflow-y-auto bg-stone-200 p-2 text-xs/5 `}
                      >
                        <div>
                          <p className={`order-1 font-semibold text-stone-700`}>
                            {event.title || event.space}
                          </p>
                          <p className={`order-1 text-stone-500`}>
                            {event.start_time} - {event.end_time}
                          </p>
                        </div>
                        <p className={`order-2 text-stone-600 text-xs`}>
                          {event.cliente}
                        </p>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
