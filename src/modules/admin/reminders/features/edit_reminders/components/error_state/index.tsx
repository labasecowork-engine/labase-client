import { CustomHeader } from "@/components/ui/custom_header";
import { StatusMessage } from "@/components/ui/status_message";
import { ROUTES } from "@/routes/routes";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => {
  return (
    <div className="mx-auto max-w-4xl w-full px-4 mt-8">
      <CustomHeader
        title="Editar recordatorio"
        to={ROUTES.Admin.ViewReminders}
      />
      <div className="mt-8">
        <StatusMessage
          title="Error al cargar el recordatorio"
          description="Error al cargar el recordatorio, por favor intenta nuevamente."
          icon={ExclamationTriangleIcon}
        />
      </div>
    </div>
  );
};
