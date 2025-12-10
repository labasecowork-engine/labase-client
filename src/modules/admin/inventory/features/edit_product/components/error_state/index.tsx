import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <StatusMessage
    title="Error al cargar el producto"
    description="Error al cargar el producto, por favor intenta nuevamente."
    icon={ExclamationTriangleIcon}
    color="rose"
  />
);
