import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormInput,
  FormTextarea,
} from "@/components/ui";
import { editAttendanceSchema, type EditAttendanceForm } from "../../../../schema";
import { useUpdateRecord } from "../../../../hooks";
import type { ClientAttendance } from "../../../../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: ClientAttendance | null;
}

const pad = (n: number): string => String(n).padStart(2, "0");
const isoToClock = (iso: string | null): string => {
  if (!iso) return "";
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const EditDialog = ({ open, onOpenChange, record }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditAttendanceForm>({
    resolver: zodResolver(editAttendanceSchema),
  });

  const { updateRecord, isUpdating } = useUpdateRecord(() =>
    onOpenChange(false)
  );

  useEffect(() => {
    if (open && record) {
      reset({
        client_name: record.client_name,
        company: record.company ?? "",
        entry_time_1: isoToClock(record.entry_time_1),
        exit_time_1: isoToClock(record.exit_time_1),
        limit_time: isoToClock(record.limit_time),
        locker_ref: record.locker_ref ?? "",
        observations: record.observations ?? "",
      });
    }
  }, [open, record, reset]);

  const onSubmit = (form: EditAttendanceForm) => {
    if (!record) return;
    updateRecord({
      id: record.id,
      input: {
        client_name: form.client_name,
        company: form.company?.trim() ? form.company.trim() : null,
        entry_time_1: form.entry_time_1,
        exit_time_1: form.exit_time_1?.trim() ? form.exit_time_1 : null,
        limit_time: form.limit_time?.trim() ? form.limit_time : null,
        locker_ref: form.locker_ref?.trim() ? form.locker_ref.trim() : null,
        observations: form.observations?.trim()
          ? form.observations.trim()
          : null,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar registro</DialogTitle>
          <DialogDescription>
            Ajusta los datos de la asistencia.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput label="Nombre" name="client_name" register={register} errors={errors} />
            <FormInput label="Empresa" name="company" register={register} errors={errors} />
            <FormInput label="Hora de ingreso" name="entry_time_1" type="time" register={register} errors={errors} />
            <FormInput label="Hora de salida" name="exit_time_1" type="time" register={register} errors={errors} />
            <FormInput label="Hora límite" name="limit_time" type="time" register={register} errors={errors} />
            <FormInput label="Locker / N°" name="locker_ref" register={register} errors={errors} />
          </div>

          <FormTextarea label="Observaciones" name="observations" register={register} errors={errors} />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Guardando…" : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
