import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  archiveRecord,
  deleteRecord,
  reenter,
  registerEntry,
  registerExit,
  updateRecord,
} from "../../services";
import type {
  EditAttendanceInput,
  RegisterAttendanceInput,
  RegisterExitInput,
} from "../../types";

const useInvalidate = () => {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: ["client-attendance"] });
};

export const useRegisterEntry = (onDone?: () => void) => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (input: RegisterAttendanceInput) => registerEntry(input),
    onSuccess: (record) => {
      invalidate();
      toast.success("Ingreso registrado", {
        description: `${record.client_name} ingresó correctamente.`,
      });
      onDone?.();
    },
    onError: (error: Error) =>
      toast.error("No se pudo registrar el ingreso", {
        description: error.message,
      }),
  });
  return { registerEntry: mutate, isRegistering: isPending };
};

export const useRegisterExit = (onDone?: () => void) => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (vars: { id: string; input: RegisterExitInput }) =>
      registerExit(vars.id, vars.input),
    onSuccess: () => {
      invalidate();
      toast.success("Salida registrada");
      onDone?.();
    },
    onError: (error: Error) =>
      toast.error("No se pudo registrar la salida", {
        description: error.message,
      }),
  });
  return { registerExit: mutate, isExiting: isPending };
};

export const useReenter = () => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => reenter(id),
    onSuccess: () => {
      invalidate();
      toast.success("Reingreso registrado");
    },
    onError: (error: Error) =>
      toast.error("No se pudo registrar el reingreso", {
        description: error.message,
      }),
  });
  return { reenter: mutate, isReentering: isPending };
};

export const useUpdateRecord = (onDone?: () => void) => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (vars: { id: string; input: EditAttendanceInput }) =>
      updateRecord(vars.id, vars.input),
    onSuccess: () => {
      invalidate();
      toast.success("Registro actualizado");
      onDone?.();
    },
    onError: (error: Error) =>
      toast.error("No se pudo actualizar el registro", {
        description: error.message,
      }),
  });
  return { updateRecord: mutate, isUpdating: isPending };
};

export const useDeleteRecord = () => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteRecord(id),
    onSuccess: () => {
      invalidate();
      toast.success("Registro eliminado");
    },
    onError: (error: Error) =>
      toast.error("No se pudo eliminar el registro", {
        description: error.message,
      }),
  });
  return { deleteRecord: mutate, isDeleting: isPending };
};

export const useArchiveRecord = () => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => archiveRecord(id),
    onSuccess: () => {
      invalidate();
      toast.success("Registro archivado");
    },
    onError: (error: Error) =>
      toast.error("No se pudo archivar el registro", {
        description: error.message,
      }),
  });
  return { archiveRecord: mutate, isArchiving: isPending };
};
