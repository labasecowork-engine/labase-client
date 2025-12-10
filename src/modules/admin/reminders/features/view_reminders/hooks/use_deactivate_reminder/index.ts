import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateReminderRequest } from "../../services";
import { toast } from "sonner";

export const useDeactivateReminder = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync: deactivateReminder, isPending: isDeactivating } =
    useMutation({
      mutationFn: deactivateReminderRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reminders"] });
      },
    });

  const handleDeactivate = () => {
    toast.promise(deactivateReminder(id), {
      loading: "Desactivando recordatorio...",
      success: "Recordatorio desactivado correctamente",
      error: "Error al desactivar el recordatorio",
    });
  };

  return {
    handleDeactivate,
    isPending: isDeactivating,
  };
};
