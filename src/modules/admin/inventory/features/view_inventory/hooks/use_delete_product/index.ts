import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProductRequest } from "../../service";
import { toast } from "sonner";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteProductMutation, isPending } = useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: () => {
      toast.success("Producto eliminado correctamente", {
        description: "El producto ha sido eliminado correctamente.",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: Error) => {
      toast.error("Error al eliminar el producto", {
        description: error.message,
      });
    },
  });

  const handleDelete = (productId: string) => {
    toast.promise(deleteProductMutation(productId), {
      loading: "Eliminando producto...",
    });
  };

  return {
    handleDelete,
    isPending,
  };
};
