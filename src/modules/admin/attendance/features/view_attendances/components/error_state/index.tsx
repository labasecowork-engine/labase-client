import { StatusMessage } from "@/components/ui/status_message";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <StatusMessage
    title="Error al cargar"
    description="No se pudieron cargar los registros de asistencia. Intenta nuevamente."
    icon={ExclamationTriangleIcon}
    color="rose"
  />
);
