import { Button, CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect, useRef } from "react";
import { CategoryForm, type CategoryFormRef, type CategoryFormData } from "@/modules/admin/articles_categories/components";
import { createCategoryRequest } from "../service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { PlusIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateCategoryResponse } from "../types";

export const CreateCategoryPage = () => {
  const { changeTitle } = useTitle();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const formRef = useRef<CategoryFormRef>(null);
  const { mutate: createCategory, isPending } = useMutation({
    mutationFn: createCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const handleSubmit = (data: CategoryFormData) => {
    createCategory(
      {
        name: data.name,
        description: data.description,
      },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      }
    );
  };

  const handleSuccess = (response: CreateCategoryResponse) => {
    toast.success("Categoría creada exitosamente", {
      description: `La categoría "${response?.category?.name || "Nueva"}" ha sido creada.`,
    });
    navigate(ROUTES.Admin.ViewCategoriesArticles);
  };

  const handleError = (error: Error) => {
    toast.error("Error al crear la categoría", {
      description: error.message,
    });
  };

  useEffect(() => {
    changeTitle("Crear categoría - La base");
  }, [changeTitle]);
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
        <CustomHeader
          title="Crear categoría"
          to={ROUTES.Admin.ViewCategoriesArticles}
        />
        <Button
          onClick={() => formRef.current?.submitForm()}
          disabled={isPending}
        >
          <PlusIcon className="size-3 sm:size-4" />
          {isPending ? "Creando..." : "Crear categoría"}
        </Button>
      </div>
      <CategoryForm
        ref={formRef}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateCategoryPage;
