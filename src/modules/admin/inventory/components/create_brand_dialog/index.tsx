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
import { createBrand } from "@/modules/admin/inventory/services";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateBrandDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateBrandForm>({
    resolver: zodResolver(createBrandSchema),
  });

  const onSubmit = (data: CreateBrandForm) => createBrandMutation(data);

  const onSuccess = () => {
    toast.success("Marca creada correctamente", {
      description:
        "La marca se ha creado correctamente, puedes verlo en la lista de marcas.",
    });
    queryClient.invalidateQueries({ queryKey: ["brands"] });
    reset();
    onClose();
  };

  const onError = () => {
    toast.error("Error al crear la marca", {
      description:
        "Por favor, intenta nuevamente, si el problema persiste, contacta al administrador.",
    });
  };

  const { mutate: createBrandMutation, isPending } = useMutation({
    mutationFn: createBrand,
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva marca</DialogTitle>
          <DialogDescription>
            Agrega el nombre de la marca que quieres crear.
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
                {isPending ? "Creando..." : "Crear marca"}
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
