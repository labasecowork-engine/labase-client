import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSpaceRequest } from "../../service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import type { EditSpaceData } from "../../types";
import type { SpaceImage } from "@/types";

export const useUpdateSpace = (spaceId: string) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateSpaceRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spaces"] });
    },
  });

  const update = (
    data: EditSpaceData,
    images: File[],
    existingImages: SpaceImage[]
  ) => {
    const formData = new FormData();
    const jsonData = {
      ...data,
      prices: data.prices.map((p) => ({ ...p, amount: Number(p.amount) })),
      keep_images: existingImages.map((img, index) => ({
        id: img.id,
        url: img.url,
        position: index,
      })),
    };

    formData.append("data", JSON.stringify(jsonData));
    images.forEach((image) => formData.append("images", image));

    mutate(
      { id: spaceId, data: formData },
      {
        onSuccess: () => {
          toast.success("Espacio actualizado exitosamente", {
            description: `El espacio "${jsonData.name}" ha sido actualizado.`,
          });
          navigate(ROUTES.Admin.ViewSpaces);
        },
        onError: (error: Error) => {
          toast.error("Error al actualizar el espacio", {
            description: error.message,
          });
        },
      }
    );
  };

  return { updateSpace: update, isPending };
};
