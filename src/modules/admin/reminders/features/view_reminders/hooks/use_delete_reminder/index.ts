import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeReminderRequest } from "../../services";
import { toast } from "sonner";

export const useDeleteReminder = (id: string) => {
  const queryClient = useQueryClient();
  const { mutateAsync: removeReminder, isPending: isRemoving } = useMutation({
    mutationFn: removeReminderRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });

  const handleDelete = () => {
    toast.promise(removeReminder(id), {
      loading: "Eliminando recordatorio...",
      success: "Recordatorio eliminado correctamente",
      error: "Error al eliminar el recordatorio",
    });
  };

  return {
    handleDelete,
    isPending: isRemoving,
  };
};
