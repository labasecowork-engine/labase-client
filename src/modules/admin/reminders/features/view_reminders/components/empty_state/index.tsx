import { StatusMessage } from "@/components/ui";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => {
  return (
    <StatusMessage
      title="No hay recordatorios disponibles"
      description="No hay recordatorios disponibles, puedes crear uno pulsando en el botón de crear recordatorio."
      icon={InboxArrowDownIcon}
      color="stone"
    />
  );
};
