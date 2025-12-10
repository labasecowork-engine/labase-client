import { Button, CustomHeader } from "@/components/ui";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const Header = () => (
  <div className="flex items-end justify-between gap-4 flex-wrap">
    <CustomHeader
      title="Gestionar Espacios"
      to={ROUTES.Admin.ViewAllReservations}
    />
    <Link to={ROUTES.Admin.CreateSpace}>
      <Button>
        <PlusIcon className="size-3 sm:size-4" />
        Crear espacio
      </Button>
    </Link>
  </div>
);
