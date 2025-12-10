import { Button, CustomHeader } from "@/components/ui";
import { UserPlusIcon } from "lucide-react";
import { ROUTES } from "@/routes/routes";

interface Props {
  isPending: boolean;
}
export const Header: React.FC<Props> = ({ isPending }) => {
  return (
    <div className="flex items-end justify-between mb-8">
      <CustomHeader title="Crear empleado" to={ROUTES.Admin.ViewEmployees} />
      <Button type="submit" disabled={isPending} className="min-w-[200px]">
        <UserPlusIcon className="w-4 h-4 mr-2" />
        {isPending ? "Creando..." : "Crear empleado"}
      </Button>
    </div>
  );
};
