import { AsyncBoundary, CustomAlert } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { resolveReservationRequest } from "../service";
import { useQuery } from "@tanstack/react-query";
import {
  ErrorState,
  Header,
  LoadingState,
  ReservationTicket,
} from "../components";
import { getStatusData } from "@/modules/client/reservations/features/view_reservation/constants";

export default function ViewReservationPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: reservationDataFromAPI,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ["reservation", id],
    queryFn: () => resolveReservationRequest(id || ""),
    enabled: !!id,
  });

  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Ver reserva - La base");
  }, [changeTitle]);

  if (id === undefined) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8">
        <ErrorState />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        data={reservationDataFromAPI}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
      >
        {(apiResponse) => {
          const statusData = getStatusData(
            apiResponse.reservation.status as string
          );
          return (
            <>
              <Header />
              <CustomAlert
                title={statusData.label}
                description={statusData.description}
                icon={statusData.icon}
                color={statusData.color}
              />
              <ReservationTicket reservationData={apiResponse} />
            </>
          );
        }}
      </AsyncBoundary>
    </div>
  );
}
