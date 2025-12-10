import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Button,
  Label,
} from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { verifyAccountRequest } from "../../service";
import { verifyCodeSchema } from "../../schemas";
import type { VerifyCodeData } from "../../types";
import { useMutation } from "@tanstack/react-query";

interface Props {
  email: string;
}

export const Form: React.FC<Props> = ({ email }) => {
  const navigate = useNavigate();
  const { mutate: verifyAccount, isPending } = useMutation({
    mutationFn: verifyAccountRequest,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VerifyCodeData>({
    resolver: zodResolver(verifyCodeSchema),
  });

  const onSubmit = (data: VerifyCodeData) => {
    if (!email) {
      toast.error("Ups! Algo salió mal", {
        description: "No se proporcionó un email. Vuelve a intentarlo.",
      });
      return;
    }
    verifyAccount(
      { code: data.code, email },
      {
        onSuccess: () => onSuccess(),
        onError,
      }
    );
  };

  const onSuccess = () => {
    toast.success("¡Cuenta verificada con éxito!", {
      description: "Ahora puedes iniciar sesión",
    });
    navigate(ROUTES.Auth.Login);
  };

  const onError = (error: Error) => {
    toast.error("Ups! Algo salió mal", {
      description: error.message,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
      <div>
        <Label
          htmlFor="code"
          className="text-sm font-medium text-stone-700 mb-2 block w-full"
        >
          Código de verificación
        </Label>
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <InputOTP maxLength={4} {...field}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {errors.code && (
          <p className="text-rose-800 text-sm mt-1">{errors.code.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="h-12 px-15 bg-stone-500 hover:bg-stone-500/90 text-white font-semibold  transition-all duration-200 rounded-full w-full mt-4"
        disabled={isPending}
      >
        {isPending ? "Verificando..." : "Verificar cuenta"}
      </Button>
    </form>
  );
};
