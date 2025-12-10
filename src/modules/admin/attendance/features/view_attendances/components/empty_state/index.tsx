import { StatusMessage } from "@/components/ui/status_message";
import { DocumentIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => (
  <StatusMessage
    title="Sin registros"
    description="No hay registros de asistencia disponibles en este momento."
    icon={DocumentIcon}
    color="stone"
  />
);
