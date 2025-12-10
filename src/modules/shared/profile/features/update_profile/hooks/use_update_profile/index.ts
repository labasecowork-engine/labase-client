import { toast } from "sonner";
import type { UpdateProfileFormData } from "../../schema";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../services";

export function useUpdateProfile(
  setValue: (name: keyof UpdateProfileFormData, value: string) => void
) {
  const onSuccess = () => {
    toast.success("Perfil actualizado exitosamente", {
      description:
        "Tu perfil ha sido actualizado correctamente, vuelve a iniciar sesión para ver los cambios.",
    });
    setValue("password", "");
    setValue("confirmPassword", "");
  };

  const onError = (error: Error) => {
    toast.error("Error al actualizar el perfil", {
      description: error.message,
    });
  };

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess,
    onError,
  });

  const onSubmit = (data: UpdateProfileFormData) => {
    updateProfileMutation(data);
  };

  return {
    onSubmit,
    isPending,
  };
}
