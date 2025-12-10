import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => {
  return (
    <StatusMessage
      title="Error al cargar el inventario"
      description="Error al cargar el inventario, por favor intenta nuevamente."
      icon={ExclamationTriangleIcon}
      color="rose"
    />
  );
};
