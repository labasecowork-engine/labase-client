import {
  Button,
  Input,
  Label,
  Textarea,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkArea } from "../../services";
import type { CreateWorkAreaForm } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkAreaSchema } from "../../schema";
import { toast } from "sonner";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  workArea: {
    id: string;
    name: string;
    capacity: number;
    description: string;
  };
}

export const UpdateAreaDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  workArea,
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateWorkAreaForm>({
    resolver: zodResolver(createWorkAreaSchema),
  });

  useEffect(() => {
    if (isOpen && workArea.id) {
      reset({
        name: workArea.name,
        capacity: workArea.capacity,
        description: workArea.description,
      });
    }
  }, [isOpen, workArea, reset]);

  const onSubmit = (data: CreateWorkAreaForm) => updateWorkAreaMutation(data);

  const onSuccess = () => {
    toast.success("Área de trabajo actualizada correctamente", {
      description:
        "El área de trabajo se ha actualizado correctamente, puedes verlo en la lista de áreas de trabajo.",
    });
    queryClient.invalidateQueries({ queryKey: ["areas"] });
    reset();
    onClose();
  };

  const onError = () => {
    toast.error("Error al actualizar el área de trabajo", {
      description:
        "Por favor, intenta nuevamente, si el problema persiste, contacta al administrador.",
    });
  };

  const { mutate: updateWorkAreaMutation, isPending } = useMutation({
    mutationFn: (data: CreateWorkAreaForm) => updateWorkArea(workArea.id, data),
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar área de trabajo</DialogTitle>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label className="block mb-2" htmlFor="name">
                Nombre
              </Label>
              <Input
                type="text"
                placeholder="Ej. Finanzas, Recursos Humanos, etc."
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-rose-800">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label className="block mb-2" htmlFor="capacity">
                Capacidad
              </Label>
              <Input
                type="number"
                placeholder="Ej. 10"
                {...register("capacity")}
              />
              {errors.capacity && (
                <p className="text-sm text-rose-800">
                  {errors.capacity.message}
                </p>
              )}
            </div>
            <div>
              <Label className="block mb-2" htmlFor="description">
                Descripción
              </Label>
              <Textarea
                placeholder="Ej. Área de finanzas y servicios financieros"
                className="h-24"
                {...register("description")}
              />
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Actualizando..." : "Actualizar área de trabajo"}
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
