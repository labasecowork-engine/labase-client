import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createContract,
  deleteContract,
  payContract,
  renewContract,
  updateContract,
} from "../../services";
import type { ContractInput, PayInput } from "../../types";

const useInvalidate = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["contracts"] });
};

export const useCreateContract = (onDone?: () => void) => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (input: ContractInput) => createContract(input),
    onSuccess: (contract) => {
      invalidate();
      toast.success("Contrato creado", {
        description: `Se registró el contrato de ${contract.client_name}.`,
      });
      onDone?.();
    },
    onError: (error: Error) =>
      toast.error("No se pudo crear el contrato", { description: error.message }),
  });
  return { createContract: mutate, isCreating: isPending };
};

export const useUpdateContract = (onDone?: () => void) => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (vars: { id: string; input: ContractInput }) =>
      updateContract(vars.id, vars.input),
    onSuccess: () => {
      invalidate();
      toast.success("Contrato actualizado");
      onDone?.();
    },
    onError: (error: Error) =>
      toast.error("No se pudo actualizar el contrato", {
        description: error.message,
      }),
  });
  return { updateContract: mutate, isUpdating: isPending };
};

export const useDeleteContract = () => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteContract(id),
    onSuccess: () => {
      invalidate();
      toast.success("Contrato eliminado");
    },
    onError: (error: Error) =>
      toast.error("No se pudo eliminar el contrato", {
        description: error.message,
      }),
  });
  return { deleteContract: mutate, isDeleting: isPending };
};

export const usePayContract = (onDone?: () => void) => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (vars: { id: string; input: PayInput }) =>
      payContract(vars.id, vars.input),
    onSuccess: () => {
      invalidate();
      toast.success("Pago registrado");
      onDone?.();
    },
    onError: (error: Error) =>
      toast.error("No se pudo registrar el pago", {
        description: error.message,
      }),
  });
  return { payContract: mutate, isPaying: isPending };
};

export const useRenewContract = () => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => renewContract(id),
    onSuccess: () => {
      invalidate();
      toast.success("Contrato renovado", {
        description: "Se creó un contrato nuevo con fechas extendidas.",
      });
    },
    onError: (error: Error) =>
      toast.error("No se pudo renovar el contrato", {
        description: error.message,
      }),
  });
  return { renewContract: mutate, isRenewing: isPending };
};
