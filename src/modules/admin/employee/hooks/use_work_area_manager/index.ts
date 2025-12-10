import { toast } from "sonner";
import { deleteWorkArea, getAreas } from "../../services";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useWorkAreaManager = () => {
  const {
    data: areas,
    isPending: isPendingAreas,
    isError: isErrorAreas,
  } = useQuery({
    queryKey: ["areas"],
    queryFn: getAreas,
  });
  const [isOpenWorkArea, setIsOpenWorkArea] = useState(false);
  const [isDeleteWorkArea, setIsDeleteWorkArea] = useState(false);
  const [isOpenUpdateWorkArea, setIsOpenUpdateWorkArea] = useState(false);
  const queryClient = useQueryClient();

  const onSuccess = () => {
    toast.success("Área de trabajo eliminada correctamente", {
      description:
        "El área de trabajo se ha eliminado correctamente, puedes verlo en la lista de áreas de trabajo.",
    });
    setIsDeleteWorkArea(false);
    queryClient.invalidateQueries({ queryKey: ["areas"] });
  };

  const onError = () => {
    toast.error("Error al eliminar el área de trabajo", {
      description:
        "Sucedio un error al eliminar el área de trabajo, si el error persiste, por favor contacta al administrador.",
    });
  };

  const {
    mutateAsync: deleteWorkAreaMutation,
    isPending: isPendingDeleteWorkArea,
  } = useMutation({
    mutationFn: deleteWorkArea,
    onSuccess: onSuccess,
    onError: onError,
  });

  const onDeleteWorkArea = async (id: string) => {
    toast.promise(deleteWorkAreaMutation(id), {
      loading: "Eliminando área de trabajo...",
    });
  };
  return {
    // work area
    areas,
    isPendingAreas,
    isErrorAreas,

    // dialogs
    isOpenWorkArea,
    setIsOpenWorkArea,
    isDeleteWorkArea,
    setIsDeleteWorkArea,
    isOpenUpdateWorkArea,
    setIsOpenUpdateWorkArea,

    // mutations
    onDeleteWorkArea,
    isPendingDeleteWorkArea,
  };
};
