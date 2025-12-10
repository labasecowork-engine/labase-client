import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => {
  return (
    <StatusMessage
      title="Error al cargar los recordatorios"
      description="Error al cargar los recordatorios, por favor intenta nuevamente."
      icon={ExclamationTriangleIcon}
      color="rose"
    />
  );
};
