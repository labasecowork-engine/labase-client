import { StatusMessage } from "@/components/ui";
import { UserMinusIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => {
  return (
    <StatusMessage
      title="No hay empleados registrados"
      description="Comienza agregando tu primer empleado"
      icon={UserMinusIcon}
      color="stone"
    />
  );
};
