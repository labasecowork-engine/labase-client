import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  archiveRecord,
  registerEntry,
  registerExit,
  reenter,
} from "../../services";
import type { RegisterEntryInput, RegisterExitInput } from "../../types";

const useInvalidateParking = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["parking"] });
};

export const useRegisterEntry = (onDone?: () => void) => {
  const invalidate = useInvalidateParking();
  const { mutate, isPending } = useMutation({
    mutationFn: (input: RegisterEntryInput) => registerEntry(input),
    onSuccess: (record) => {
      invalidate();
      toast.success("Ingreso registrado", {
        description: `${record.client_name} en el espacio ${record.space_code}.`,
      });
      onDone?.();
    },
    onError: (error: Error) => {
      toast.error("No se pudo registrar el ingreso", {
        description: error.message,
      });
    },
  });
  return { registerEntry: mutate, isRegistering: isPending };
};

export const useRegisterExit = (onDone?: () => void) => {
  const invalidate = useInvalidateParking();
  const { mutate, isPending } = useMutation({
    mutationFn: (vars: { id: string; input: RegisterExitInput }) =>
      registerExit(vars.id, vars.input),
    onSuccess: () => {
      invalidate();
      toast.success("Salida registrada", {
        description: "El espacio quedó libre.",
      });
      onDone?.();
    },
    onError: (error: Error) => {
      toast.error("No se pudo registrar la salida", {
        description: error.message,
      });
    },
  });
  return { registerExit: mutate, isExiting: isPending };
};

export const useReenter = () => {
  const invalidate = useInvalidateParking();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => reenter(id),
    onSuccess: () => {
      invalidate();
      toast.success("Reingreso registrado");
    },
    onError: (error: Error) => {
      toast.error("No se pudo registrar el reingreso", {
        description: error.message,
      });
    },
  });
  return { reenter: mutate, isReentering: isPending };
};

export const useArchiveRecord = () => {
  const invalidate = useInvalidateParking();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => archiveRecord(id),
    onSuccess: () => {
      invalidate();
      toast.success("Registro archivado");
    },
    onError: (error: Error) => {
      toast.error("No se pudo archivar el registro", {
        description: error.message,
      });
    },
  });
  return { archiveRecord: mutate, isArchiving: isPending };
};
