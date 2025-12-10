import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Button,
  FormInput,
} from "@/components/ui";
import { useForm } from "react-hook-form";
import { createUserSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateUserFormData } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserRequest } from "../../service";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export const CreateUserDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });
  const onSuccessCreateUser = () => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
    toast.success("Usuario creado correctamente", {
      description:
        "El usuario se ha creado correctamente, puedes verlo en la lista de usuarios.",
    });
    onClose();
    reset();
  };
  const onErrorCreateUser = (error: Error) => {
    toast.error("Error al crear el usuario", {
      description: error.message,
    });
  };

  const { mutate: createUserMutation, isPending } = useMutation({
    mutationFn: createUserRequest,
    onSuccess: onSuccessCreateUser,
    onError: onErrorCreateUser,
  });

  const onSubmit = (data: CreateUserFormData) => createUserMutation(data);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear usuario</DialogTitle>
          <DialogDescription>
            Crea un nuevo usuario para tu reserva.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Nombre"
              name="first_name"
              placeholder="Ej. Juan"
              register={register}
              errors={errors}
            />
            <FormInput
              label="Apellido"
              name="last_name"
              placeholder="Ej. Pérez"
              register={register}
              errors={errors}
            />
          </div>
          <FormInput
            label="Correo electrónico"
            name="email"
            placeholder="Ej. ejemplo@labase.com"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Contraseña"
            name="password"
            type="password"
            placeholder="Ej. sgagBxaS152%"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Confirmar contraseña"
            name="confirm_password"
            type="password"
            placeholder="Ej. sgagBxaS152%"
            register={register}
            errors={errors}
          />
          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? "Creando usuario..." : "Crear usuario"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
