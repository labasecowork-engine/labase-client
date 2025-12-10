import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { ArticleForm } from "@/modules/admin/articles/components/article_form";
import { ROUTES } from "@/routes/routes";
import { useCreateArticle } from "../service";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function CreateArticlePage() {
  const { changeTitle } = useTitle();
  const navigate = useNavigate();
  const { mutate: createArticle, isPending } = useCreateArticle();

  useEffect(() => {
    changeTitle("Crear artículo - La base");
  }, [changeTitle]);

  const handleSubmit = (formData: FormData) => {
    createArticle(formData, {
      onSuccess: (response) => {
        toast.success("Artículo creado exitosamente", {
          description: `El artículo "${response.title}" ha sido creado.`,
        });
        navigate(ROUTES.Admin.ViewArticles);
      },
      onError: (error: Error) => {
        toast.error("Error al crear el artículo", {
          description: error.message,
        });
      },
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader
        title="Crear Artículo"
        to={ROUTES.Admin.ViewArticles}
      />
      <ArticleForm
        onSubmit={handleSubmit}
        isSubmitting={isPending}
        submitLabel="Crear artículo"
        submittingLabel="Creando artículo..."
        title="Contenido del Artículo"
        description="Escribe el título y el cuerpo principal de tu artículo."
      />
    </div>
  );
}
