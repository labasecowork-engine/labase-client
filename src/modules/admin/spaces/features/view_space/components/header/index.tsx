import { Button, CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircleIcon, Edit, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { activateSpaceRequest, deactivateSpaceRequest } from "../../service";
import { toast } from "sonner";

interface Props {
  name: string;
  id: string;
  disabled: boolean;
  isLoading: boolean;
}
export const Header: React.FC<Props> = ({ name, id, disabled, isLoading }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const onSuccess = (title: string, description: string) => {
    toast.success(title, {
      description: description,
    });

    queryClient.invalidateQueries({ queryKey: ["spaces"] });
    navigate(ROUTES.Admin.ViewSpaces);
  };

  const onError = (error: Error, title: string) => {
    toast.error(title, {
      description: error.message,
    });
  };

  const { mutateAsync: deactivateSpace, isPending: isDeactivating } =
    useMutation({
      mutationFn: deactivateSpaceRequest,
      onSuccess: () =>
        onSuccess(
          "Espacio desactivado correctamente",
          `El espacio "${name}" ha sido desactivado correctamente`
        ),
      onError: (error: Error) =>
        onError(error, "Error al desactivar el espacio"),
    });
  const { mutateAsync: activateSpace, isPending: isActivating } = useMutation({
    mutationFn: activateSpaceRequest,
    onSuccess: () =>
      onSuccess(
        "Espacio activado correctamente",
        `El espacio "${name}" ha sido activado correctamente`
      ),
    onError: (error: Error) => onError(error, "Error al activar el espacio"),
  });

  const handleConfirmActivate = () => {
    toast.promise(activateSpace(id), {
      loading: "Activando espacio...",
    });
  };

  const handleConfirmDeactivate = () => {
    toast.promise(deactivateSpace(id), {
      loading: "Desactivando espacio...",
    });
  };

  return (
    <div className="flex items-end gap-4 justify-between">
      <CustomHeader
        title={name || "Detalle del espacio"}
        to={ROUTES.Admin.ViewSpaces}
      />
      {!isLoading && (
        <div className="flex items-center gap-2">
          {!disabled ? (
            <Button
              disabled={isDeactivating}
              className="text-stone-800 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 border-none font-sans shadow-none w-full flex md:w-auto"
              onClick={handleConfirmDeactivate}
            >
              <Trash2 className="size-4 mr-2" />
              {isDeactivating ? "Desactivando..." : "Desactivar"}
            </Button>
          ) : (
            <Button
              disabled={isActivating}
              className="text-stone-800 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 border-none font-sans shadow-none w-full flex md:w-auto"
              onClick={handleConfirmActivate}
            >
              <CheckCircleIcon className="size-4 mr-2" />
              {isActivating ? "Activando..." : "Activar"}
            </Button>
          )}
          <Link to={ROUTES.Admin.EditSpace.replace(":id", id)}>
            <Button>
              <Edit className="size-4 mr-2" />
              Actualizar
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
