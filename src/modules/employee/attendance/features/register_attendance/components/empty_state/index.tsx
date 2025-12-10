import { StatusMessage } from "@/components/ui";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => (
  <div className="h-[600px]">
    <StatusMessage
      title="Sin registros de asistencia"
      description="No tienes registros de asistencia aún. ¡Comienza registrando tu entrada!"
      icon={InboxArrowDownIcon}
      color="stone"
    />
  </div>
);
