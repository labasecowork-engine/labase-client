import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => {
  return (
    <div className="mt-8">
      <StatusMessage
        title="Error al cargar el espacio"
        description="Error al cargar el espacio, por favor intenta nuevamente, si el problema persiste, contacta al administrador."
        icon={ExclamationTriangleIcon}
        color="rose"
      />
    </div>
  );
};
