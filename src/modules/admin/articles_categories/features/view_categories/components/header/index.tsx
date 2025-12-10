import { CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => (
  <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
    <CustomHeader title="Gestionar Categoría" to={ROUTES.Admin.ViewArticles} />
    <Link
      to={ROUTES.Admin.CreateCategoryArticles}
      className="bg-stone-500 text-xs text-stone-50 font-medium hover:bg-stone-400 transition-all sm:text-sm px-8 py-3 rounded-full flex items-center gap-2"
    >
      <PlusIcon className="size-3 sm:size-4" />
      Crear categoría
    </Link>
  </div>
);
