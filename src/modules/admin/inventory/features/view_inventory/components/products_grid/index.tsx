import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Image,
} from "@/components/ui";
import { Edit, Trash2 } from "lucide-react";
import type { Product } from "@/types/inventory";
import { useDeleteProduct } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const ProductsGrid: React.FC<{ products: Product[] }> = ({
  products,
}) => {
  const { handleDelete, isPending } = useDeleteProduct();
  const navigate = useNavigate();

  const handleEdit = (productId: string) => {
    const editUrl = ROUTES.Admin.EditProduct.replace(":id", productId);
    navigate(editUrl);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 mt-8">
      {products.map((product) => (
        <ContextMenu key={product.id}>
          <ContextMenuTrigger>
            <div className="bg-stone-50 rounded-lg overflow-hidden  transition-all cursor-context-menu hover:bg-stone-100">
              <Image
                src={product.photo_url}
                alt={product.name}
                className="w-full h-48 object-cover bg-stone-100"
              />
              <div className="p-4">
                <h3
                  className="font-semibold text-sm text-stone-900 truncate"
                  title={product.name}
                >
                  {product.name}
                </h3>
                <p className="text-xs text-stone-500 mt-2 h-[50px] line-clamp-1 text-ellipsis overflow-hidden">
                  {product.description}
                </p>
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-stone-500">Marca</span>
                    <span className="font-semibold text-sm font-serif text-stone-800">
                      {product.brand.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-stone-500">Cantidad</span>
                    <span className="font-semibold text-sm font-serif text-stone-800">
                      {product.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              className="cursor-pointer"
              onClick={() => handleEdit(product.id)}
            >
              <Edit className="size-4 mr-2" />
              Editar
            </ContextMenuItem>
            <ContextMenuItem
              variant="destructive"
              className="cursor-pointer"
              disabled={isPending}
              onClick={() => handleDelete(product.id)}
            >
              <Trash2 className="size-4 mr-2" />
              Eliminar
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  );
};
