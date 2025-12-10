import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <StatusMessage
    color="rose"
    title="Error al cargar los suscriptores"
    description="Sucedio un error al cargar los suscriptores, porfavor intenta nuevamente, si el problema persiste, por favor contacta al soporte."
    icon={ExclamationTriangleIcon}
  />
);
