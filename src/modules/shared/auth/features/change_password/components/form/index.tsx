import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button, Input, Label } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { confirmNewPasswordRequest } from "../../service";
import { changePasswordSchema } from "../../schemas";
import type { ChangePasswordData } from "../../types";
import { useMutation } from "@tanstack/react-query";

interface Props {
  email: string;
}

export const Form: React.FC<Props> = ({ email }) => {
  const navigate = useNavigate();

  const { mutate: confirmPassword, isPending } = useMutation({
    mutationFn: confirmNewPasswordRequest,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (data: ChangePasswordData) => {
    if (!email) {
      toast.error("Ups! Algo salió mal", {
        description: "No se proporcionó un email. Vuelve a intentarlo.",
      });
      return;
    }
    confirmPassword(
      { ...data, email },
      {
        onSuccess: () => onSuccess(),
        onError,
      }
    );
  };

  const onSuccess = () => {
    toast.success("Contraseña actualizada", {
      description: "Tu contraseña ha sido cambiada. Ya puedes iniciar sesión",
    });
    navigate(ROUTES.Auth.Login);
  };

  const onError = (error: Error) => {
    toast.error("Ups! Algo salió mal", {
      description: error.message,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label
          htmlFor="password"
          className="text-sm font-medium text-stone-700 mb-2 block w-full"
        >
          Nueva contraseña
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Ej. EadqWC%1235"
          className="h-12 px-4 border-stone-300 rounded-lg focus:outline-none transition-colors"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-rose-800 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="confirm_password"
          className="text-sm font-medium text-stone-700 mb-2 block w-full"
        >
          Confirmar contraseña
        </Label>
        <Input
          id="confirm_password"
          type="password"
          placeholder="Ej. EadqWC%1235"
          className="h-12 px-4 border-stone-300 rounded-lg focus:outline-none transition-colors"
          {...register("confirm_password")}
        />
        {errors.confirm_password && (
          <p className="text-rose-800 text-sm mt-1">
            {errors.confirm_password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-stone-500 hover:bg-stone-500/90 text-white font-semibold rounded-full transition-all duration-200"
        disabled={isPending}
      >
        {isPending ? "Guardando..." : "Guardar nueva contraseña"}
      </Button>
    </form>
  );
};
