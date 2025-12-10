import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui";
import { Edit, FileText, Trash2 } from "lucide-react";
import type { Article } from "../../types";
import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { ROUTES } from "@/routes/routes";
import { TagIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArticleRequest } from "../../service";
import { toast } from "sonner";

export const ArticlesTable: React.FC<{ articles: Article[] }> = ({
  articles,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteArticle } = useMutation({
    mutationFn: deleteArticleRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Eliminado exitosamente", {
        description:
          "El artículo ha sido eliminado exitosamente, no se puede recuperar.",
      });
    },
    onError: (error) => {
      toast.error("Error al eliminar el artículo", {
        description:
          error.message ||
          "Ocurrió un error desconocido al eliminar el artículo.",
      });
    },
  });

  const handleEdit = (articleId: string) => {
    const editUrl = ROUTES.Admin.EditArticle.replace(":id", articleId);
    navigate(editUrl);
  };

  const handleDelete = (articleId: string) => {
    toast.promise(deleteArticle(articleId), {
      loading: "Eliminando artículo...",
    });
  };

  return (
    <div className="w-full mt-4">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-stone-200">
            <TableHead className="px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <FileText className="size-4" />
                Título
              </div>
            </TableHead>
            <TableHead className="px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <TagIcon className="size-4" />
                Categoría
              </div>
            </TableHead>
            <TableHead className="px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                Fecha de creación
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {articles.map((article) => {
            return (
              <ContextMenu key={article.id}>
                <ContextMenuTrigger asChild>
                  <TableRow className="border-b border-stone-100 cursor-context-menu hover:bg-stone-50">
                    <TableCell
                      className="font-medium px-4 py-4 text-stone-900 max-w-xs truncate"
                      title={article.title}
                    >
                      {article.title}
                    </TableCell>

                    <TableCell className="px-4 py-4 text-stone-700">
                      {article.article_category.name}
                    </TableCell>

                    <TableCell className="px-4 py-4 text-stone-700">
                      {article.publication_timestamp
                        ? format(
                            parseISO(article.publication_timestamp),
                            "dd MMMMMM, yyyy",
                            {
                              locale: es,
                            }
                          )
                        : "Sin fecha de publicación"}
                    </TableCell>
                  </TableRow>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem
                    className="cursor-pointer"
                    onClick={() => handleEdit(article.id)}
                  >
                    <Edit className="size-4 mr-2" />
                    Editar artículo
                  </ContextMenuItem>
                  <ContextMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => handleDelete(article.id)}
                  >
                    <Trash2 className="size-4 mr-2" />
                    Eliminar artículo
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
