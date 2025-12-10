import { useTitle } from "@/hooks";
import type { EditProductFormData } from "../types";
import { useEffect, useRef, useState } from "react";
import { CustomHeader, Button, AsyncBoundary } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { EditProductForm, ErrorState, LoadingState } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { SaveIcon } from "lucide-react";
import { getProductRequest, updateProductRequest } from "../service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function EditProductPage() {
  const { changeTitle } = useTitle();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const queryClient = useQueryClient();
  const [hasChanges, setHasChanges] = useState(false);

  const {
    data: initialData,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductRequest(id || ""),
    enabled: !!id,
  });

  const onSuccess = () => {
    toast.success("Producto actualizado correctamente", {
      description:
        "El producto se ha actualizado correctamente, puedes verlo en la lista de productos.",
    });
    queryClient.invalidateQueries({ queryKey: ["products"] });
    navigate(ROUTES.Admin.ViewInventory);
  };

  const onError = (error: Error) => {
    toast.error("Error al actualizar el producto", {
      description: error.message,
    });
  };

  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: (data: FormData) => updateProductRequest(id || "", data),
    onSuccess,
    onError,
  });

  const handleSubmit = async (data: EditProductFormData) => {
    const formData = new FormData();
    const dataForm = {
      name: data.productName,
      brand_id: data.brand,
      quantity: data.quantity,
      unit_of_measure: data.unit,
      description: data.description,
      observations: data.observations,
    };
    formData.append("data", JSON.stringify(dataForm));
    if (data.images) {
      formData.append("images", data.images[0]);
    }
    updateProduct(formData);
  };

  const handleUpdateProduct = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  useEffect(() => {
    changeTitle("Editar Producto - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between gap-4 mb-8">
        <CustomHeader title="Editar Producto" to={ROUTES.Admin.ViewInventory} />
        <Button
          onClick={handleUpdateProduct}
          disabled={isUpdating || !hasChanges}
          className="min-w-[150px]"
        >
          <SaveIcon className="size-4" />
          {isUpdating ? "Actualizando..." : "Actualizar producto"}
        </Button>
      </div>

      <div>
        <AsyncBoundary
          isLoading={isLoading}
          isError={isError}
          data={initialData}
          LoadingComponent={<LoadingState />}
          ErrorComponent={<ErrorState />}
        >
          {(initialData) => (
            <EditProductForm
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={initialData}
              onChangesDetected={setHasChanges}
            />
          )}
        </AsyncBoundary>
      </div>
    </div>
  );
}
