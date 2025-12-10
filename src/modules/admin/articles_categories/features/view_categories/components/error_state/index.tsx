import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <StatusMessage
    title="Error al cargar las categorías"
    description="No se pudieron cargar las categorías, por favor intenta nuevamente, si el problema persiste, contacta al soporte."
    icon={ExclamationTriangleIcon}
  />
);