import { useMutation } from "@tanstack/react-query";
import { createReservationRequest } from "../../service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type {
  AvailabilityRequest,
  CreateReservationResponse,
  ReservationFormData,
} from "../../types";

export function useCreateReservation() {
  const navigate = useNavigate();
  const { mutate: createReservation, isPending: isCreating } = useMutation({
    mutationFn: createReservationRequest,
  });
  const onSuccessCreateReservation = (res: CreateReservationResponse) => {
    toast.success("¡Reserva creada con éxito!", {
      description: `Tu código de reserva es ${res.code_qr}.`,
    });
    navigate(`/client/reservations/${res.reservation_id}`);
  };

  const onErrorCreateReservation = (err: Error) => {
    toast.error("Error al crear la reserva", {
      description: err.message,
    });
  };

  const handleCreateReservation = (
    availabilityData: AvailabilityRequest,
    data: ReservationFormData
  ) => {
    const reservationData = {
      space_id: data.space_id,
      start_time: availabilityData.start_time,
      end_time: availabilityData.end_time,
      people: data.people,
      full_room: data.full_room,
    };

    createReservation(reservationData, {
      onSuccess: onSuccessCreateReservation,
      onError: onErrorCreateReservation,
    });
  };

  return {
    handleCreateReservation,
    isCreating,
  };
}
