import { Button, CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { PencilIcon } from "@heroicons/react/24/solid";

interface Props {
  isPending: boolean;
  hasChanges: boolean;
}

export const Header: React.FC<Props> = ({ isPending, hasChanges }) => {
  return (
    <div className="flex items-end justify-between mb-8">
      <CustomHeader title="Editar empleado" to={ROUTES.Admin.ViewEmployees} />
      <Button
        type="submit"
        disabled={isPending || !hasChanges}
        className="min-w-[200px]"
      >
        <PencilIcon className="w-4 h-4 mr-2" />
        {isPending ? "Editando..." : "Editar empleado"}
      </Button>
    </div>
  );
};
