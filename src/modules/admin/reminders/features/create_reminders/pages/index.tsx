import { Button, CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { PlusIcon } from "lucide-react";
import { useRef } from "react";
import type { CreateReminderFormData } from "../types";
import { ReminderForm } from "../components";
import { useMutation } from "@tanstack/react-query";
import { createReminderRequest } from "../services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateRemindersPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { mutate: createReminder, isPending } = useMutation({
    mutationFn: createReminderRequest,
  });
  const onSuccess = () => {
    navigate(ROUTES.Admin.ViewReminders);
    toast.success("Recordatorio creado correctamente", {
      description:
        "El recordatorio se ha creado correctamente, puedes verlo en la lista de recordatorios.",
    });
  };
  const onError = (error: Error) => {
    toast.error("Error al crear el recordatorio", {
      description: error.message,
    });
  };
  const handleCreateReminder = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handleSubmit = (data: CreateReminderFormData) =>
    createReminder(data, {
      onSuccess,
      onError,
    });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between">
        <CustomHeader
          to={ROUTES.Admin.ViewReminders}
          title="Crear Recordatorio"
        />
        <Button
          type="submit"
          onClick={handleCreateReminder}
          disabled={isPending}
        >
          <PlusIcon className="size-4" />
          {isPending ? "Creando..." : "Crear recordatorio"}
        </Button>
      </div>
      <div className="mt-8">
        <ReminderForm ref={formRef} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
