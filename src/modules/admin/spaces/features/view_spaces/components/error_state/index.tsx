import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <div className="mt-8">
    <StatusMessage
      title="Error al cargar los espacios"
      description="Ocurrió un error inesperado al obtener la lista de espacios. Por favor, intenta de nuevo más tarde."
      icon={ExclamationTriangleIcon}
      color="rose"
    />
  </div>
);
