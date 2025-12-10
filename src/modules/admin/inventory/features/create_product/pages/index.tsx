import { useTitle } from "@/hooks";
import type { CreateProductFormData } from "../types";
import { useEffect, useRef } from "react";
import { ProductForm } from "../components/product_form";
import { CustomHeader, Button } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { PlusIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductRequest } from "../service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateProductPage() {
  const { changeTitle } = useTitle();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSuccess = () => {
    toast.success("Producto creado correctamente", {
      description:
        "El producto se ha creado correctamente, puedes verlo en la lista de productos.",
    });
    navigate(ROUTES.Admin.ViewInventory);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };
  const onError = (error: Error) => {
    toast.error("Error al crear el producto", {
      description: error.message,
    });
  };

  const { mutate: createProductMutation, isPending } = useMutation({
    mutationFn: createProductRequest,
    onSuccess: onSuccess,
    onError: onError,
  });

  useEffect(() => {
    changeTitle("Crear producto - La base");
  }, [changeTitle]);

  const handleSubmit = async (data: CreateProductFormData) => {
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
    formData.append("images", data.images[0]);
    createProductMutation(formData);
  };

  const handleCreateProduct = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between gap-4 mb-8">
        <CustomHeader title="Crear Producto" to={ROUTES.Admin.ViewInventory} />
        <Button
          onClick={handleCreateProduct}
          disabled={isPending}
          className="min-w-[150px]"
        >
          <PlusIcon className="size-4" />
          {isPending ? "Creando..." : "Crear producto"}
        </Button>
      </div>

      <div>
        <ProductForm ref={formRef} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
