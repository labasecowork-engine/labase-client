import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Image,
} from "@/components/ui";
import type { Product } from "@/types/inventory";
import { Edit, Trash2 } from "lucide-react";
import { useDeleteProduct } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const ProductsList: React.FC<{ products: Product[] }> = ({
  products,
}) => {
  const { handleDelete, isPending } = useDeleteProduct();
  const navigate = useNavigate();
  const handleEdit = (productId: string) => {
    const editUrl = ROUTES.Admin.EditProduct.replace(":id", productId);
    navigate(editUrl);
  };

  return (
    <div className="grid grid-cols-1  gap-3 mt-8">
      {products.map((product) => (
        <ContextMenu key={product.id}>
          <ContextMenuTrigger>
            <div className="grid grid-cols-[75%_25%] md:items-center gap-4 p-4 bg-stone-50 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-4 flex-1">
                <Image
                  src={product.photo_url}
                  alt={product.name}
                  className="size-14 rounded-lg overflow-hidden object-cover bg-stone-100 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 text-sm">
                    {product.name}
                  </p>
                  <div className="text-xs text-stone-500 mt-1">
                    {product.description}
                  </div>
                </div>
              </div>

              <div className="w-full flex items-center">
                <div className="hidden md:block h-10 border-l border-stone-200 mr-6"></div>

                <div className="flex-1 flex items-center justify-end">
                  <div className=" text-right px-4">
                    <span className="text-xs text-stone-500 uppercase">
                      Cantidad
                    </span>
                    <p className="font-semibold text-sm font-serif text-stone-800">
                      {product.quantity}
                    </p>
                  </div>
                  <div className="text-right pl-4 pr-8">
                    <span className="text-xs text-stone-500 uppercase">
                      Marca
                    </span>
                    <p className="font-semibold text-sm font-serif text-stone-800">
                      {product.brand.name}
                    </p>
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

export { ProductsList as ProductsTable };
