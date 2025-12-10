import { ROUTES } from "@/routes/routes";
import { CustomHeader } from "@/components/ui";
import { Button } from "@/components/ui";
import { PlusIcon } from "lucide-react";

interface Props {
  isChecking: boolean;
  isCreating: boolean;
}

export const Header = ({ isChecking, isCreating }: Props) => {
  return (
    <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
      <CustomHeader title="Crear reserva" to={ROUTES.Client.ViewReservations} />
      <Button
        type="submit"
        variant="default"
        disabled={isChecking || isCreating}
        className=" text-xs sm:text-sm"
      >
        <PlusIcon className="size-4" />
        {isChecking
          ? "Verificando..."
          : isCreating
            ? "Creando reserva..."
            : "Crear reserva"}
      </Button>
    </div>
  );
};
