import { CustomHeader, AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArticleForm } from "@/modules/admin/articles/components/article_form";
import { ROUTES } from "@/routes/routes";
import {
  getArticleRequest,
  updateArticleRequest,
  getContentArticleRequest,
} from "../service";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ErrorState, LoadingState } from "../components";

export default function EditArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { changeTitle } = useTitle();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["articles", id],
    queryFn: () => getArticleRequest(id || ""),
    enabled: !!id,
  });

  const { data: articleContent, isLoading: isLoadingContent } = useQuery({
    queryKey: ["article-content", article?.content],
    queryFn: () => getContentArticleRequest(article!.content),
    enabled: !!article?.content,
  });

  const { mutate: updateArticle, isPending: isUpdating } = useMutation({
    mutationFn: (payload: FormData) => updateArticleRequest(id || "", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const handleSubmit = (formData: FormData) => {
    updateArticle(formData, {
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  const handleSuccess = () => {
    toast.success("Artículo actualizado exitosamente", {
      description: `El artículo ha sido actualizado, te redirigimos a la lista de artículos.`,
    });
    navigate(ROUTES.Admin.ViewArticles);
  };

  const handleError = (error: Error) => {
    toast.error("Error al actualizar el artículo", {
      description: error.message,
    });
  };

  useEffect(() => {
    changeTitle(`Editar artículo - La base`);
  }, [changeTitle]);

  const isLoadingData = isLoading || isLoadingContent;
  const hasError = !!error || !article;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader title="Editar Artículo" to={ROUTES.Admin.ViewArticles} />
      <div className="mt-4">
        <AsyncBoundary
          isLoading={isLoadingData}
          isError={hasError}
          data={article}
          LoadingComponent={<LoadingState />}
          ErrorComponent={<ErrorState />}
        >
          {(article) => (
            <ArticleForm
              defaultValues={{
                title: article.title,
                category_id: article.category_id,
                content: articleContent || "",
              }}
              defaultBannerUrl={article.banner}
              onSubmit={handleSubmit}
              isSubmitting={isUpdating}
              submitLabel="Guardar cambios"
              submittingLabel="Guardando cambios..."
              title="Editar Artículo"
              description="Modifica la información del artículo y guarda los cambios."
            />
          )}
        </AsyncBoundary>
      </div>
    </div>
  );
}
