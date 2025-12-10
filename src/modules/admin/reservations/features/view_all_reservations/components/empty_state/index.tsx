import { StatusMessage } from "@/components/ui/status_message";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => {
  return (
    <div className="mt-4">
      <StatusMessage
        color="stone"
        title="No se encontraron reservas"
        description="Aún no tienes ninguna reserva, puedes crear una nueva reserva pulsando en el botón de crear reserva, ¡animate a crear una!."
        icon={InboxArrowDownIcon}
      />
    </div>
  );
};
