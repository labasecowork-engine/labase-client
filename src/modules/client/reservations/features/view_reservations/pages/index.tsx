import { Link } from "react-router-dom";
import { FiltersPanel, ListCard } from "../components";
import { ROUTES } from "@/routes/routes";
import { CustomHeader, Pagination } from "@/components/ui";
import { PlusIcon } from "lucide-react";
import { useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { getMyReservationsRequest } from "../service";
import { useQuery } from "@tanstack/react-query";
import { getSpacesRequest } from "@/services/spaces";

export default function ViewReservationsPage() {
  const { changeTitle } = useTitle();
  const [page, setPage] = useState(1);
  const [spaceIdFilter, setSpaceIdFilter] = useState<string | undefined>(
    undefined
  );
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  const {
    data: spacesData,
    isLoading: isLoadingSpaces,
    isError: isErrorSpaces,
  } = useQuery({
    queryKey: ["spaces"],
    queryFn: () => getSpacesRequest(),
  });

  const {
    data: reservationsData,
    isPending: isLoadingReservations,
    isError: isErrorReservations,
  } = useQuery({
    queryKey: ["myReservations", spaceIdFilter, statusFilter, dateRange, page],
    queryFn: () =>
      getMyReservationsRequest(spaceIdFilter, statusFilter, dateRange, page),
  });

  useEffect(() => {
    changeTitle("Mis reservas - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <CustomHeader title={"Mis reservas"} />
        <Link
          to={ROUTES.Client.CreateReservation}
          className="bg-stone-500 text-xs text-white font-medium hover:bg-stone-400 transition-all sm:text-sm px-8 py-3 rounded-full flex items-center gap-2"
        >
          <PlusIcon className="size-3 sm:size-4" />
          Crear reserva
        </Link>
      </div>

      <FiltersPanel
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        clearDateRange={() => setDateRange(undefined)}
        selectedSpaceId={spaceIdFilter}
        spaces={spacesData || []}
        isErrorSpaces={isErrorSpaces}
        isLoadingSpaces={isLoadingSpaces}
        onSpaceChange={(value: string | undefined) => setSpaceIdFilter(value)}
        selectedStatus={statusFilter}
        onStatusChange={(value: string | undefined) => setStatusFilter(value)}
      />

      <ListCard
        reservationsData={reservationsData}
        isLoadingReservations={isLoadingReservations}
        isErrorReservations={isErrorReservations}
      />

      <Pagination
        page={page}
        totalPages={reservationsData?.pagination?.total_pages || 0}
        onPageChange={setPage}
      />
    </div>
  );
}
