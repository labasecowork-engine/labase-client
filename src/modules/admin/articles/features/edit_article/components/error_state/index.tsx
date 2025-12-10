import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <StatusMessage
    title="Artículo no encontrado"
    description="No se pudo encontrar el artículo que intentas editar. Por favor, vuelve a la lista e inténtalo de nuevo."
    icon={ExclamationTriangleIcon}
  />)