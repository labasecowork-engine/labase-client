import { CustomHeader, StatusMessage } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { UserMinusIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => {
  return (
    <div className="mx-auto max-w-4xl w-full px-4 mt-8">
      <CustomHeader title="Editar empleado" to={ROUTES.Admin.ViewEmployees} />
      <div className="mt-8">
        <StatusMessage
          title="No se encontró el empleado"
          description="El empleado no existe, por favor verifica la URL o regresa a la lista de empleados, si el error persiste, contacta al administrador."
          icon={UserMinusIcon}
          color="stone"
        />
      </div>
    </div>
  );
};
