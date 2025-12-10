import { useState } from "react";
import { deleteBrand } from "../../services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useBrandManager = (id: string) => {
  const [createBrandDialogOpen, setCreateBrandDialogOpen] = useState(false);
  const [updateBrandDialogOpen, setUpdateBrandDialogOpen] = useState(false);
  const [deleteBrandDialogOpen, setDeleteBrandDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: deleteBrandMutation, isPending: isPendingDeleteBrand } =
    useMutation({
      mutationFn: (id: string) => deleteBrand(id),
      onSuccess: () => {
        toast.success("Marca eliminada correctamente", {
          description:
            "La marca se ha eliminado correctamente, puedes verlo en la lista de marcas.",
        });
        setDeleteBrandDialogOpen(false);
        queryClient.invalidateQueries({ queryKey: ["brands"] });
      },
      onError: () => {
        toast.error("Error al eliminar la marca", {
          description:
            "Por favor, intenta nuevamente, si el problema persiste, contacta al administrador.",
        });
      },
    });

  const onDeleteBrand = async () => {
    deleteBrandMutation(id);
  };
  return {
    // dialogs
    createBrandDialogOpen,
    setCreateBrandDialogOpen,
    updateBrandDialogOpen,
    setUpdateBrandDialogOpen,
    deleteBrandDialogOpen,
    setDeleteBrandDialogOpen,

    // mutations
    deleteBrandMutation,
    isPendingDeleteBrand,

    // functions
    onDeleteBrand,
  };
};
