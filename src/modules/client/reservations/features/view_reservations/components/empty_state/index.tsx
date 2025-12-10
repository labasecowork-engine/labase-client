import { StatusMessage } from "@/components/ui";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => (
  <StatusMessage
    title="Aún no tienes ninguna reserva"
    description="Aún no tienes ninguna reserva, puedes crear una nueva reserva pulsando en el botón de crear reserva, ¡animate a crear una!."
    icon={InboxArrowDownIcon}
    color="stone"
  />
);
