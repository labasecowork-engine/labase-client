import {
  Button,
  Input,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { CreateBrandForm } from "@/modules/admin/inventory/types";
import { createBrandSchema } from "@/modules/admin/inventory/schema";
import { updateBrand } from "@/modules/admin/inventory/services";
import { useEffect } from "react";

interface Props {
  brand: {
    id: string;
    name: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const UpdateBrandDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  brand,
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateBrandForm>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      name: brand.name,
    },
  });

  const onSuccess = () => {
    toast.success("Marca actualizada correctamente", {
      description:
        "La marca se ha actualizado correctamente, puedes verlo en la lista de marcas.",
    });
    queryClient.invalidateQueries({ queryKey: ["brands"] });
    reset();
    onClose();
  };

  const onError = () => {
    toast.error("Error al actualizar la marca", {
      description:
        "Por favor, intenta nuevamente, si el problema persiste, contacta al administrador.",
    });
  };

  const onSubmit = (data: CreateBrandForm) => updateBrandMutation(data);

  const { mutate: updateBrandMutation, isPending } = useMutation({
    mutationFn: (data: CreateBrandForm) => updateBrand(brand.id, data),
    onSuccess: onSuccess,
    onError: onError,
  });

  useEffect(() => {
    if (isOpen && brand.id) {
      reset({
        name: brand.name,
      });
    }
  }, [isOpen, brand, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Actualizar marca</DialogTitle>
          <DialogDescription>
            Agrega el nombre de la marca que quieres actualizar.
          </DialogDescription>

          <form className="space-y-4 mt-4">
            <div>
              <Input
                type="text"
                placeholder="Ej. Apple, Samsung, etc."
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-rose-800">{errors.name.message}</p>
              )}
            </div>

            <DialogFooter className="mt-4">
              <Button
                disabled={isPending}
                type="button"
                onClick={handleSubmit(onSubmit)}
              >
                {isPending ? "Actualizando..." : "Actualizar marca"}
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
