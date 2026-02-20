import { ROUTES } from "@/routes/routes";
import { useParams } from "react-router-dom";
import { useResolveReservation } from "../service";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { CustomAlert, CustomHeader } from "@/components/ui";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  TicketReservation,
} from "../components";
import { getStatusData } from "../constants";

export default function ViewReservationPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: reservationData,
    isLoading,
    isError,
  } = useResolveReservation(id!);

  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Ver reserva - La base");
  }, [changeTitle]);

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState />;
  if (!reservationData) return <EmptyState />;

  const { reservation } = reservationData;
  const statusData = getStatusData(reservation.status);
  const price = `S/${parseFloat(reservation.price).toFixed(2)}`;

  console.log(reservation);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <CustomHeader title="Ver reserva" to={ROUTES.Client.ViewReservations} />

        <div className="w-full mt-6">
          <CustomAlert
            title={statusData.label}
            description={statusData.description}
            icon={statusData.icon}
            color={statusData.color}
          />
          <TicketReservation reservation={reservation} price={price} />
        </div>
      </div>
    </>
  );
}
