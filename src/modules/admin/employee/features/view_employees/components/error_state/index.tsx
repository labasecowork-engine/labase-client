import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => {
  return (
    <StatusMessage
      title="Error al cargar empleados"
      description="Hubo un problema al obtener la lista de empleados. Por favor, intenta de nuevo."
      icon={ExclamationTriangleIcon}
      color="rose"
    />
  );
};
