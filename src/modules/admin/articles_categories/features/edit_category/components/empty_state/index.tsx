import { StatusMessage } from "@/components/ui";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => (
  <StatusMessage
    title="Categoría no encontrada"
    description="No se pudo encontrar la categoría solicitada. Es posible que haya sido eliminada."
    icon={InboxArrowDownIcon}
    color="stone"
  />
);