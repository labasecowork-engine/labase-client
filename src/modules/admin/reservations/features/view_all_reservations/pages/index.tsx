import {
  AsyncBoundary,
  Button,
  CardNavigation,
  CustomHeader,
  Pagination,
} from "@/components/ui";
import { useDebounce, useTitle } from "@/hooks";
import { useEffect, useMemo, useState } from "react";
import { getReservationsRequest } from "../service";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  ReservationTable,
  ReservationFilters,
} from "../components";
import { socket } from "@/services";
import { actions } from "../constants";
import { PlusIcon } from "lucide-react";
import { getSpacesRequest } from "@/services";
import type { DateRange } from "react-day-picker";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

export default function ViewAllReservationsPage() {
  const { changeTitle } = useTitle();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [spaceIdFilter, setSpaceIdFilter] = useState<string | undefined>(
    undefined
  );
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const {
    data: reservationsData,
    isLoading: isLoadingReservations,
    isError: isErrorReservations,
  } = useQuery({
    queryKey: [
      "reservations",
      page,
      spaceIdFilter,
      statusFilter,
      dateRange,
      debouncedSearch,
    ],
    queryFn: () => {
      let dateRangeParams: { from?: string; to?: string } | undefined;

      if (dateRange?.from) {
        dateRangeParams = {
          from: dateRange.from.toISOString(),
        };

        if (dateRange.to) {
          dateRangeParams.to = dateRange.to.toISOString();
        }
      }

      return getReservationsRequest(
        page,
        spaceIdFilter,
        statusFilter,
        dateRangeParams,
        debouncedSearch
      );
    },
  });

  const {
    data: spacesData,
    isLoading: isLoadingSpaces,
    isError: isErrorSpaces,
  } = useQuery({
    queryKey: ["spaces"],
    queryFn: () => getSpacesRequest(),
  });

  const reservations = useMemo(
    () => reservationsData?.data || [],
    [reservationsData]
  );
  const spaces = useMemo(() => spacesData || [], [spacesData]);

  useEffect(() => {
    const onNewReservation = () => {
      queryClient.invalidateQueries({
        queryKey: [
          "reservations",
          page,
          spaceIdFilter,
          statusFilter,
          dateRange,
          debouncedSearch,
        ],
      });
    };

    socket.on("RESERVATION_CREATED", onNewReservation);

    return () => {
      socket.off("RESERVATION_CREATED", onNewReservation);
    };
  }, [
    queryClient,
    page,
    spaceIdFilter,
    statusFilter,
    dateRange,
    debouncedSearch,
  ]);

  const handleCreateReservation = () => {
    navigate(ROUTES.Admin.CreateReservation);
  };

  useEffect(() => {
    changeTitle("Ver reservas - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-8">
      <div className="flex justify-between items-center">
        <CustomHeader title="Reservas" />
        <div className="flex items-center gap-2">
          <Button onClick={handleCreateReservation}>
            <PlusIcon className="w-4 h-4" />
            Nueva reserva
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 mb-8 md:grid-cols-2 gap-2 lg:gap-4 mt-4">
        {actions.map((action) => (
          <CardNavigation
            key={action.title}
            to={action.to}
            title={action.title}
            description={action.description}
            icon={action.icon}
          />
        ))}
      </div>

      <ReservationFilters
        search={search}
        selectedSpaceId={spaceIdFilter}
        selectedStatus={statusFilter}
        spaces={spaces || []}
        isLoadingSpaces={isLoadingSpaces}
        dateRange={dateRange}
        isErrorSpaces={isErrorSpaces}
        onSearchChange={setSearch}
        onSpaceChange={setSpaceIdFilter}
        onDateRangeChange={setDateRange}
        onStatusChange={setStatusFilter}
      />

      <div className="h-full w-full mt-4 mb-8">
        <AsyncBoundary
          isLoading={isLoadingReservations}
          isError={isErrorReservations}
          data={reservations || []}
          LoadingComponent={<LoadingState />}
          ErrorComponent={<ErrorState />}
          EmptyComponent={<EmptyState />}
        >
          {() => (
            <>
              <ReservationTable reservations={reservations} />
              <Pagination
                page={page}
                totalPages={reservationsData?.pagination?.total_pages || 0}
                onPageChange={setPage}
              />
            </>
          )}
        </AsyncBoundary>
      </div>
    </div>
  );
}
