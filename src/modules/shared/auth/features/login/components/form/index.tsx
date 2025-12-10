import { Button, Input, Label } from "@/components/ui";
import { loginSchema } from "../../schemas";
import type { LoginCredentials, LoginResponse } from "../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../../service";

export const Form = () => {
  const { mutate: login, isPending } = useMutation({
    mutationFn: loginRequest,
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginCredentials) => {
    login(data, {
      onSuccess: onSuccess,
      onError: onError,
    });
  };

  const onSuccess = (response: LoginResponse) => {
    toast.success("Bienvenido de vuelta", {
      description: "Te redirigiremos a tu panel de reservas.",
    });
    localStorage.setItem("TOKEN_AUTH", response.token);
    navigate(ROUTES.Client.ViewReservations);
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
          className="h-12 px-4 border-stone-300 focus:outline-none transition-colors rounded-lg"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-rose-800 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label
          htmlFor="password"
          className="text-sm font-medium text-stone-700 mb-2 block"
        >
          Contraseña
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="Ej. asgSWas%!ga12"
          className="h-12 px-4 border-stone-300 rounded-lg focus:outline-none transition-colors"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-rose-800 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="text-right">
        <Link
          to="/recover-password"
          className="text-sm text-stone-600 hover:text-stone-900 hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-stone-500 hover:bg-stone-500/90 text-white font-semibold  transition-all duration-200"
        disabled={isPending}
      >
        {isPending ? "Iniciando sesión..." : "Ingresar"}
      </Button>
    </form>
  );
};
