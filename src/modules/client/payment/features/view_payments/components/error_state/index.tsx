import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => {
  return (
    <StatusMessage
      title="Sucedio un error al cargar los pagos"
      description="Al parecer no pudimos obtener los pagos, intenta nuevamente, si el problema persiste contacta al soporte."
      icon={ExclamationTriangleIcon}
    />
  );
};
