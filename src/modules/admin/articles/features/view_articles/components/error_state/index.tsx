import { StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => {
  return (
    <div className="mt-4">
      <StatusMessage
        title="Error al cargar los artículos"
        description="Error al cargar los artículos, por favor intenta nuevamente."
        icon={ExclamationTriangleIcon}
        color="rose"
      />
    </div>
  );
};
