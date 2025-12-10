import { StatusMessage } from "@/components/ui";
import { InboxArrowDownIcon } from "@heroicons/react/24/outline";

export const EmptyState = () => {
  return (
    <StatusMessage
      title="No hay productos disponibles"
      description="No hay productos disponibles, puedes crear uno pulsando en el botón de crear producto."
      icon={InboxArrowDownIcon}
      color="stone"
    />
  );
};
