import { Button, CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { PencilIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import type { EditReminderFormData } from "../types";
import { ErrorState, LoadingState, ReminderForm } from "../components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editReminderRequest, getReminderByIdRequest } from "../services";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRemindersPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { mutate: editReminder, isPending } = useMutation({
    mutationFn: (data: EditReminderFormData) =>
      editReminderRequest(data, id || ""),
  });

  const {
    data: reminder,
    isLoading: isLoadingReminder,
    isError: isErrorReminder,
  } = useQuery({
    queryKey: ["reminder", id],
    queryFn: () => getReminderByIdRequest(id || ""),
    enabled: !!id,
  });

  const onSuccess = () => {
    navigate(ROUTES.Admin.ViewReminders);
    toast.success("Recordatorio editado correctamente", {
      description:
        "El recordatorio se ha editado correctamente, puedes verlo en la lista de recordatorios.",
    });
  };
  const onError = (error: Error) => {
    toast.error("Error al editar el recordatorio", {
      description: error.message,
    });
  };
  const handleEditReminder = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handleSubmit = (data: EditReminderFormData) =>
    editReminder(data, {
      onSuccess,
      onError,
    });

  useEffect(() => {
    if (reminder) {
      console.log(reminder);
    }
  }, [reminder]);

  if (isLoadingReminder) return <LoadingState />;
  if (isErrorReminder) return <ErrorState />;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between">
        <CustomHeader
          to={ROUTES.Admin.ViewReminders}
          title="Editar Recordatorio"
        />
        <Button type="submit" onClick={handleEditReminder} disabled={isPending}>
          <PencilIcon className="size-4" />
          {isPending ? "Editando..." : "Editar recordatorio"}
        </Button>
      </div>
      <div className="mt-8">
        <ReminderForm
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={reminder}
        />
      </div>
    </div>
  );
}
