import { CustomHeader, StatusMessage } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <div className="w-full max-w-5xl mx-auto px-4 py-10">
    <CustomHeader title="Ver reserva" to={ROUTES.Client.ViewReservations} />
    <div className="mt-4">
      <StatusMessage
        title="Ups! Sucedio un error"
        description="No se pudo encontrar la reserva solicitada, posiblemente no existe o ya fue cancelada, si crees que esto es un error, por favor contacta a soporte."
        color="rose"
        icon={ExclamationTriangleIcon}
      />
    </div>
  </div>
);
