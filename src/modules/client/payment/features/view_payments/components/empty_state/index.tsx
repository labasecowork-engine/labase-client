import { StatusMessage } from "@/components/ui";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => {
  return (
    <StatusMessage
      title="No tienes pagos"
      description="Cuando realices un pago, aparecerán aquí."
      icon={InboxArrowDownIcon}
      color="stone"
    />
  );
};
