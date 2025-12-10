import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <div className="mt-4">
    <StatusMessage
      title="Error al cargar las reservas"
      description="Sucedio un error al cargar las reservas, porfavor intenta nuevamente, si el problema persiste, por favor contacta al soporte."
      icon={ExclamationTriangleIcon}
      color="rose"
    />
  </div>
);
