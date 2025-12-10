import { StatusMessage } from "@/components/ui";
import { UsersIcon } from "lucide-react";

export const EmptyState = () => (
  <div className="w-full mt-8" style={{ height: "calc(100vh - 250px)" }}>
    <StatusMessage
      title="No hay visitantes registrados"
      description="Aún no has registrado ningún visitante. Comienza creando el primer visitante para gestionar tu lista de visitas."
      icon={UsersIcon}
      color="stone"
    />
  </div>
);
