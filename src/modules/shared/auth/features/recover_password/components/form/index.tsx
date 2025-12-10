import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button, Input, Label } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { requestPasswordResetRequest } from "../../service";
import { forgotPasswordSchema } from "../../schemas";
import type { ForgotPasswordData } from "../../types";
import { ROUTES } from "@/routes/routes";
import { useMutation } from "@tanstack/react-query";

export const Form = () => {
  const navigate = useNavigate();
  const { mutate: requestPasswordReset, isPending } = useMutation({
    mutationFn: requestPasswordResetRequest,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordData) => {
    requestPasswordReset(data, {
      onSuccess: () => onSuccess(data),
      onError,
    });
  };

  const onSuccess = (data: ForgotPasswordData) => {
    toast.success("Solicitud enviada", {
      description:
        "Si existe una cuenta con ese email, recibirás un código para resetear tu contraseña",
    });
    navigate(ROUTES.Auth.VerifyPasswordReset, {
      state: { email: data.email },
    });
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
          htmlFor="email"
          className="text-sm font-medium text-stone-700 mb-2 block"
        >
          Correo electrónico
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Ej. tucorreo@email.com"
          className="h-12 px-4 border-stone-300 rounded-lg focus:outline-none transition-colors"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-rose-800 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-stone-500 hover:bg-stone-500/90 text-white font-semibold  transition-all duration-200"
        disabled={isPending}
      >
        {isPending ? "Enviando..." : "Enviar código"}
      </Button>
    </form>
  );
};
