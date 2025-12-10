import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateReminderRequest } from "../../services";
import { toast } from "sonner";

export const useActivateReminder = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync: activateReminder, isPending: isActivating } =
    useMutation({
      mutationFn: activateReminderRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["reminders"] });
      },
    });

  const handleActivate = () => {
    toast.promise(activateReminder(id), {
      loading: "Activando recordatorio...",
      success: "Recordatorio activado correctamente",
      error: "Error al activar el recordatorio",
    });
  };

  return {
    handleActivate,
    isPending: isActivating,
  };
};
