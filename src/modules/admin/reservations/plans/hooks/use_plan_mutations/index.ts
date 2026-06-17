import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPlan, deletePlan, updatePlan } from "../../services";
import type { PlanInput } from "../../types";

const useInvalidate = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["plans"] });
};

export const useCreatePlan = (onDone?: () => void) => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (input: PlanInput) => createPlan(input),
    onSuccess: (plan) => {
      invalidate();
      toast.success("Plan creado", {
        description: `Se creó el plan "${plan.name}".`,
      });
      onDone?.();
    },
    onError: (error: Error) =>
      toast.error("No se pudo crear el plan", { description: error.message }),
  });
  return { createPlan: mutate, isCreating: isPending };
};

export const useUpdatePlan = (onDone?: () => void) => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (vars: { id: string; input: PlanInput }) =>
      updatePlan(vars.id, vars.input),
    onSuccess: () => {
      invalidate();
      toast.success("Plan actualizado");
      onDone?.();
    },
    onError: (error: Error) =>
      toast.error("No se pudo actualizar el plan", {
        description: error.message,
      }),
  });
  return { updatePlan: mutate, isUpdating: isPending };
};

export const useDeletePlan = () => {
  const invalidate = useInvalidate();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deletePlan(id),
    onSuccess: () => {
      invalidate();
      toast.success("Plan eliminado");
    },
    onError: (error: Error) =>
      toast.error("No se pudo eliminar el plan", {
        description: error.message,
      }),
  });
  return { deletePlan: mutate, isDeleting: isPending };
};
