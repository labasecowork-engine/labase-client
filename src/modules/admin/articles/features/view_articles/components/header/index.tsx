import { CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { DocumentPlusIcon, TagIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export const Header = () => (
  <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
    <CustomHeader title="Gestionar Artículos" to={ROUTES.Admin.ViewTools} />
    <div className="flex items-center gap-2">
      <Link
        to={ROUTES.Admin.ViewCategoriesArticles}
        className="bg-stone-800/10 text-xs text-stone-800 font-medium hover:bg-stone-800/20 transition-all sm:text-sm px-8 py-3 rounded-full flex items-center gap-2"
      >
        <TagIcon className="size-3 sm:size-4" />
        Gestionar categorías
      </Link>
      <Link
        to={ROUTES.Admin.CreateArticle}
        className="bg-stone-500 text-xs text-stone-50 font-medium hover:bg-stone-400 transition-all sm:text-sm px-8 py-3 rounded-full flex items-center gap-2"
      >
        <DocumentPlusIcon className="size-3 sm:size-4" />
        Crear artículo
      </Link>
    </div>
  </div>
);
