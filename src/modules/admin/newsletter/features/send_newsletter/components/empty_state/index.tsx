import { StatusMessage } from "@/components/ui";
import { UsersIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => (
  <StatusMessage
    color="stone"
    title="No se encontraron suscriptores"
    description="Aún no tienes suscriptores registrados en tu newsletter, para que un usuario se pueda suscribir tiene que registrase en la página."
    icon={UsersIcon}
  />
);
