import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <StatusMessage
    title="Error al cargar categoría"
    description="No se pudo cargar la información de la categoría. Por favor, inténtalo nuevamente."
    icon={ExclamationTriangleIcon}
  />
);