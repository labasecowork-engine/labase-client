import { CustomHeader, StatusMessage } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => {
  return (
    <>
      <CustomHeader title="Editar visitante" to={ROUTES.Admin.ViewVisitors} />
      <div className="mt-8">
        <StatusMessage
          title="Error al obtener el visitante"
          description="Sucedio un error al obtener el visitante, si el error persiste, contacta al administrador."
          icon={ExclamationTriangleIcon}
        />
      </div>
    </>
  );
};
