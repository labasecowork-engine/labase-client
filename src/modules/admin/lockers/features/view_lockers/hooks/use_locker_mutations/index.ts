import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deliverKey, returnKey } from "../../services";
import type { DeliverKeyInput } from "../../../../types";

// Refresca todo lo que depende del estado de los lockers tras una mutación.
const useInvalidateLockers = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["lockers"] });
};

export const useDeliverKey = (onDone?: () => void) => {
  const invalidate = useInvalidateLockers();
  const { mutate, isPending } = useMutation({
    mutationFn: (input: DeliverKeyInput) => deliverKey(input),
    onSuccess: (delivery) => {
      invalidate();
      toast.success("Llave entregada", {
        description: `Locker #${delivery.locker_number} asignado a ${delivery.person_name}.`,
      });
      onDone?.();
    },
    onError: (error: Error) => {
      toast.error("No se pudo entregar la llave", {
        description: error.message,
      });
    },
  });

  return { deliver: mutate, isDelivering: isPending };
};

export const useReturnKey = () => {
  const invalidate = useInvalidateLockers();
  const { mutate, isPending } = useMutation({
    mutationFn: (deliveryId: string) => returnKey(deliveryId),
    onSuccess: () => {
      invalidate();
      toast.success("Llave devuelta", {
        description: "El locker quedó libre nuevamente.",
      });
    },
    onError: (error: Error) => {
      toast.error("No se pudo registrar la devolución", {
        description: error.message,
      });
    },
  });

  return { returnDelivery: mutate, isReturning: isPending };
};
