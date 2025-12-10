import { StatusMessage } from "@/components/ui";
import { CustomHeader } from "@/components/ui/custom_header";
import { ROUTES } from "@/routes/routes";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export const ErrorState = () => (
  <>
    <CustomHeader title="Ver reserva" to={ROUTES.Admin.ViewAllReservations} />
    <div className="mt-8">
      <StatusMessage
        title="Ups! Sucedio un error"
        description="No se pudo encontrar la reserva solicitada, posiblemente no existe o ya fue cancelada, si crees que esto es un error, por favor contacta a soporte."
        color="rose"
        icon={ExclamationTriangleIcon}
      />
    </div>
  </>
);
