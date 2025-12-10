import { StatusMessage } from "@/components/ui";
import { AlertTriangleIcon } from "lucide-react";

export const ErrorState = () => (
  <div className="w-full mt-8" style={{ height: "calc(100vh - 250px)" }}>
    <StatusMessage
      title="Error al cargar visitantes"
      description="Ha ocurrido un error al cargar la lista de visitantes. Por favor, intenta nuevamente."
      icon={AlertTriangleIcon}
      color="rose"
    />
  </div>
);
