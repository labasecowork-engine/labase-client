import { CustomHeader, StatusMessage } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => {
  return (
    <div className="mx-auto max-w-4xl w-full px-4 mt-8">
      <CustomHeader title="Editar empleado" to={ROUTES.Admin.ViewEmployees} />
      <div className="mt-8">
        <StatusMessage
          title="Error al obtener el empleado"
          description="Sucedio un error al obtener el empleado, si el error persiste, contacta al administrador."
          icon={ExclamationTriangleIcon}
        />
      </div>
    </div>
  );
};
