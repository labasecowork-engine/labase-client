import { CustomHeader, StatusMessage } from "@/components/ui";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <div className="w-full max-w-4xl mx-auto px-4 py-10 flex justify-center">
    <CustomHeader title="Mi perfil" />
    <div className="mt-8">
      <StatusMessage
        title="Error al obtener el perfil"
        description="Por favor, intenta nuevamente en unos minutos, si el problema persiste por favor contacta al soporte."
        icon={ExclamationTriangleIcon}
        color="rose"
      />
    </div>
  </div>
);
