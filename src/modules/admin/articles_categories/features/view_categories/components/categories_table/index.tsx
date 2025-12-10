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
import { Edit, FileText, FolderIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import type { ArticleCategory } from "../../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryRequest } from "../../service";
import { toast } from "sonner";

export const CategoriesTable: React.FC<{ categories: ArticleCategory[] }> = ({
  categories,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteCategoryRequest,
    onSuccess: () => {
      toast.success("Categoría eliminada correctamente", {
        description: "La categoría ha sido eliminada correctamente.",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      toast.error("Error al eliminar la categoría", {
        description: error.message,
      });
    },
  });

  const handleEdit = (category: ArticleCategory) => {
    const editUrl = ROUTES.Admin.EditCategoryArticles.replace(
      ":id",
      category.id
    );
    navigate(editUrl);
  };

  const handleDeleteClick = (category: ArticleCategory) => {
    toast.promise(mutate.mutateAsync(category.id), {
      loading: "Eliminando categoría...",
    });
  };

  return (
    <div
      className="w-full overflow-hidden"
      style={{ height: "calc(100vh - 250px)" }}
    >
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow className="border-b border-stone-200">
            <TableHead className="px-4 py-4 w-1/3">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <FolderIcon className="size-4" />
                Título
              </div>
            </TableHead>
            <TableHead className="px-4 py-4 w-2/3">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <FileText className="size-4" />
                Descripción
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((article) => {
            return (
              <ContextMenu key={article.id}>
                <ContextMenuTrigger asChild>
                  <TableRow className="border-b border-stone-100 cursor-context-menu hover:bg-stone-50">
                    <TableCell
                      className="font-medium px-4 py-4 text-stone-900 max-w-xs truncate"
                      title={article.name}
                    >
                      {article.name}
                    </TableCell>
                    <TableCell
                      className="px-4 py-4 text-stone-700 max-w-md truncate"
                      title={article.description}
                    >
                      {article.description}
                    </TableCell>
                  </TableRow>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem
                    className="cursor-pointer"
                    onClick={() => handleEdit(article)}
                  >
                    <Edit className="size-4" />
                    Editar categoría
                  </ContextMenuItem>
                  <ContextMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => handleDeleteClick(article)}
                  >
                    <Trash2 className="size-4" />
                    Eliminar categoría
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
