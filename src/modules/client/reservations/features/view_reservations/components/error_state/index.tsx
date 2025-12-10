import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <StatusMessage
    title="Sucedio un error"
    description="Sucedio un error al cargar tus reservas, este error es inesperado, por favor intenta nuevamente, si el problema persiste, por favor contacta a soporte."
    color="rose"
    icon={ExclamationTriangleIcon}
  />
);
