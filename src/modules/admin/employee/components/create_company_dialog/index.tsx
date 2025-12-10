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
import { createCompany } from "../../services";
import type { CreateCompanyForm } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCompanySchema } from "../../schema";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCompanyDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCompanyForm>({
    resolver: zodResolver(createCompanySchema),
  });

  const onSubmit = (data: CreateCompanyForm) => createCompanyMutation(data);

  const onSuccess = () => {
    toast.success("Empresa creada correctamente", {
      description:
        "La empresa se ha creado correctamente, puedes verla en la lista de empresas.",
    });
    queryClient.invalidateQueries({ queryKey: ["companies"] });
    reset();
    onClose();
  };

  const onError = () => {
    toast.error("Error al crear la empresa", {
      description:
        "Por favor, intenta nuevamente, si el problema persiste, contacta al administrador.",
    });
  };

  const { mutate: createCompanyMutation, isPending } = useMutation({
    mutationFn: createCompany,
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva empresa</DialogTitle>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label className="block mb-2" htmlFor="name">
                Nombre
              </Label>
              <Input
                type="text"
                placeholder="Ej. Finacorp"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-rose-800">{errors.name.message}</p>
              )}
            </div>
            <div>
              <Label className="block mb-2" htmlFor="description">
                Descripción
              </Label>
              <Textarea
                placeholder="Ej. Empresa de finanzas y servicios financieros"
                className="h-24"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-rose-800">
                  {errors.description.message}
                </p>
              )}
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creando..." : "Crear empresa"}
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
