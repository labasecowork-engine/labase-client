import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { checkAvailabilityRequest } from "../../service";
import type {
  AvailabilityRequest,
  AvailabilityResponse,
  ReservationFormData,
} from "../../types";

interface UseCheckAvailabilityCallbacks {
  onSuccess?: (
    response: AvailabilityResponse,
    availabilityData: AvailabilityRequest,
    formData: ReservationFormData
  ) => void;
  onError?: (error: Error) => void;
}

export function useCheckAvailability() {
  const { mutate: checkAvailability, isPending: isChecking } = useMutation({
    mutationFn: checkAvailabilityRequest,
  });

  const handleCheckAvailability = (
    availabilityData: AvailabilityRequest,
    formData: ReservationFormData,
    callbacks?: UseCheckAvailabilityCallbacks
  ) => {
    const onSuccessDefault = (
      response: AvailabilityResponse,
      availabilityData: AvailabilityRequest,
      formData: ReservationFormData
    ) => {
      if (!response.available) {
        toast.error("Horario no disponible", {
          description:
            "El espacio seleccionado ya está reservado en este horario. Por favor, elige otro.",
        });
        return;
      }

      toast.success("¡Horario disponible!", {
        description: "Puedes proceder a crear tu reserva.",
      });

      callbacks?.onSuccess?.(response, availabilityData, formData);
    };

    const onErrorDefault = (error: Error) => {
      toast.error("Error al verificar disponibilidad", {
        description: error.message,
      });

      callbacks?.onError?.(error);
    };

    checkAvailability(availabilityData, {
      onSuccess: (response) =>
        onSuccessDefault(response, availabilityData, formData),
      onError: onErrorDefault,
    });
  };

  return {
    handleCheckAvailability,
    isChecking,
  };
}
