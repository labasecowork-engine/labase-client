import { Button, CustomHeader, AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect, useRef } from "react";
import { ROUTES } from "@/routes/routes";
import { useParams, useNavigate } from "react-router-dom";
import { CategoryForm, type CategoryFormRef, type CategoryFormData } from "@/modules/admin/articles_categories/components";
import { EmptyState, ErrorState, LoadingState } from "../components";
import type { EditCategoryPayload } from "../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategory, updateCategoryRequest } from "../service";
import { toast } from "sonner";

export const EditCategoryPage = () => {
  const { changeTitle } = useTitle();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const formRef = useRef<CategoryFormRef>(null);
  const queryClient = useQueryClient();
  const { data: category, isLoading: isLoadingCategory, isError } = useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategory(id || ""),
    enabled: !!id,
  });

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: (payload: EditCategoryPayload) => updateCategoryRequest(id || "", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const handleSubmit = (data: CategoryFormData) => {
    updateCategory(
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

  const handleSuccess = (data: CategoryFormData) => {
    toast.success("Categoría actualizada exitosamente", {
      description: `La categoría "${data.name}" ha sido actualizada.`,
    });
    navigate(ROUTES.Admin.ViewCategoriesArticles);
  };

  const handleError = (error: Error) => {
    toast.error("Error al actualizar la categoría", {
      description: error.message,
    });
  };

  useEffect(() => {
    changeTitle("Editar categoría - La base");
  }, [changeTitle]);
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex items-end justify-between gap-4 flex-wrap">
        <CustomHeader
          title="Editar Categoría"
          to={ROUTES.Admin.ViewCategoriesArticles}
        />
        {(!isError && !isLoadingCategory) && (
          <Button
            onClick={() => formRef.current?.submitForm()}
            disabled={isUpdating}
          >
            {isUpdating ? "Guardando..." : "Guardar cambios"}
          </Button>
        )}
      </div>

      <AsyncBoundary
        isLoading={isLoadingCategory}
        isError={isError}
        data={category}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
        EmptyComponent={<EmptyState />}
      >
        {(categoryData) => (
          <CategoryForm
            ref={formRef}
            defaultValues={{
              name: categoryData.name,
              description: categoryData.description,
            }}
            onSubmit={handleSubmit}
          />
        )}
      </AsyncBoundary>
    </div>
  );
};

export default EditCategoryPage;
