import { SpaceCard } from "../space_card";
import { formatDate, formatTime } from "@/utilities";
import { EmptyState, ErrorState, LoadingState } from "..";
import { AsyncBoundary } from "@/components/ui";
import type { MyReservationsResponse } from "../../types";

interface Props {
  reservationsData?: MyReservationsResponse | undefined;
  isLoadingReservations: boolean;
  isErrorReservations: boolean;
}
export const ListCard: React.FC<Props> = ({
  reservationsData,
  isLoadingReservations,
  isErrorReservations,
}) => {
  return (
    <div className="h-full w-full mt-4 ">
      <AsyncBoundary
        isLoading={isLoadingReservations}
        isError={isErrorReservations}
        data={reservationsData?.reservations}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
        EmptyComponent={<EmptyState />}
      >
        {(data) => (
          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {data.map((reservation) => {
              const price = `S/${parseFloat(reservation.price).toFixed(2)}`;

              return (
                <div key={reservation.id}>
                  <SpaceCard
                    id={reservation.id}
                    spaceName={reservation.space.name}
                    spaceImageUrl={reservation.space.space_images[0].url || ""}
                    people={reservation.people}
                    price={price}
                    dateReservation={formatDate(reservation.start_time)}
                    timeReservation={`${formatTime(
                      reservation.start_time
                    )} - ${formatTime(reservation.end_time)}`}
                    status={reservation.status}
                  />
                </div>
              );
            })}
          </ul>
        )}
      </AsyncBoundary>
    </div>
  );
};
