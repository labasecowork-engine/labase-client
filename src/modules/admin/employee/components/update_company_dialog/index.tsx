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
import { updateCompany } from "../../services";
import type { CreateCompanyForm } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCompanySchema } from "../../schema";
import { toast } from "sonner";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  company: {
    id: string;
    name: string;
    description: string;
  };
}

export const UpdateCompanyDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  company,
}) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCompanyForm>({
    resolver: zodResolver(createCompanySchema),
  });

  useEffect(() => {
    if (isOpen && company.id) {
      reset({
        name: company.name,
        description: company.description,
      });
    }
  }, [isOpen, company, reset]);

  const onSubmit = (data: CreateCompanyForm) => updateCompanyMutation(data);

  const onSuccess = () => {
    toast.success("Empresa actualizada correctamente", {
      description:
        "La empresa se ha actualizado correctamente, puedes verla en la lista de empresas.",
    });
    queryClient.invalidateQueries({ queryKey: ["companies"] });
    reset();
    onClose();
  };

  const onError = () => {
    toast.error("Error al actualizar la empresa", {
      description:
        "Por favor, intenta nuevamente, si el problema persiste, contacta al administrador.",
    });
  };

  const { mutate: updateCompanyMutation, isPending } = useMutation({
    mutationFn: (data: CreateCompanyForm) => updateCompany(company.id, data),
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar empresa</DialogTitle>

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
                {isPending ? "Actualizando..." : "Actualizar empresa"}
              </Button>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
