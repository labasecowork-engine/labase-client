import { StatusMessage } from "@/components/ui";
import { AlertTriangleIcon, InboxIcon, Loader2 } from "lucide-react";

export const TableLoading = () => (
  <div className="flex items-center justify-center gap-2 mt-4 text-stone-500">
    <Loader2 className="size-5 animate-spin" />
    <span className="text-sm">Cargando…</span>
  </div>
);

export const TableError = () => (
  <div className="mt-4">
    <StatusMessage
      title="No se pudo cargar la información"
      description="Ocurrió un problema al obtener los planes. Intenta nuevamente en unos segundos."
      icon={AlertTriangleIcon}
      color="rose"
    />
  </div>
);

interface EmptyProps {
  title: string;
  description: string;
}

export const TableEmpty = ({ title, description }: EmptyProps) => (
  <div className="mt-4">
    <StatusMessage
      title={title}
      description={description}
      icon={InboxIcon}
      color="stone"
    />
  </div>
);
