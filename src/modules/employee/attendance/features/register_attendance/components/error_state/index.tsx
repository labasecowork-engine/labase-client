import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <div className="h-[600px]">
    <StatusMessage
      title="Error al cargar asistencias"
      description="Hubo un problema al obtener los datos de asistencias. Por favor, inténtalo de nuevo."
      icon={ExclamationTriangleIcon}
    />
  </div>
);
