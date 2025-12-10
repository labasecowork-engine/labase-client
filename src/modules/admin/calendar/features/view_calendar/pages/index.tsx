import { formatDate } from "@/utilities";
import { CalendarDay, CalendarWeek } from "../components";
import { useEffect } from "react";
import { useTitle, useWindowSize } from "@/hooks";
import { CustomHeader, StatusMessage } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { useCalendarEvents } from "../hooks";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function ViewCalendarPage() {
  const currentDate = new Date();
  const { changeTitle } = useTitle();
  const { allEvents, isLoading, isError, calendarData } = useCalendarEvents();
  const { width } = useWindowSize();

  const isMobile = width < 700;

  useEffect(() => {
    changeTitle("Calendario - La base");
  }, [changeTitle]);

  if (isLoading || isError || !calendarData) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <CustomHeader
          title={`Calendario - ${formatDate(currentDate.toISOString())}`}
          to={ROUTES.Admin.ViewAllReservations}
        />
        <div className="w-full mt-8 h-[calc(100vh-14rem)] rounded-lg bg-stone-50 min-h-[600px]">
          <div className="w-full animate-pulse bg-stone-50 h-[500px] mt-8"></div>
        </div>
      </div>
    );
  }

  if (isError || !calendarData) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <CustomHeader
          title={`Calendario - ${formatDate(currentDate.toISOString())}`}
          to={ROUTES.Admin.ViewAllReservations}
        />
        <div className="mt-8 w-full">
          <StatusMessage
            title="Error al cargar el calendario"
            description="No se pudieron cargar los eventos del calendario, por favor intenta nuevamente."
            icon={ExclamationTriangleIcon}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <CustomHeader
        title={`Calendario - ${formatDate(currentDate.toISOString())}`}
        to={ROUTES.Admin.ViewAllReservations}
      />
      <div className="w-full mt-8 ">
        {isMobile ? (
          <CalendarDay events={allEvents} />
        ) : (
          <CalendarWeek events={allEvents} />
        )}
      </div>
    </div>
  );
}
