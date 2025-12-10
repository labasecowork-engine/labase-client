import { CustomHeader, StatusMessage } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => (
  <div className="w-full max-w-5xl mx-auto px-4 py-10">
    <CustomHeader title="Ver reserva" to={ROUTES.Client.ViewReservations} />
    <div className="mt-4">
      <StatusMessage
        title="No se pudo encontrar la reserva"
        description="No se pudo encontrar la reserva solicitada, posiblemente no existe o ya fue cancelada, si crees que esto es un error, por favor contacta a soporte."
        color="stone"
        icon={InboxArrowDownIcon}
      />
    </div>
  </div>
);
