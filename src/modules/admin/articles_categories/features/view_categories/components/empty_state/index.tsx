import { StatusMessage } from "@/components/ui";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => (
  <StatusMessage
    title="No hay categorías"
    description="No hay categorías disponibles, por favor agrega una nueva categoría."
    icon={InboxArrowDownIcon}
    color="stone"
  />
);