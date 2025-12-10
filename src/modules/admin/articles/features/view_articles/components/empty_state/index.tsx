import { StatusMessage } from "@/components/ui";
import { InboxArrowDownIcon } from "@heroicons/react/24/solid";

export const EmptyState = () => {
  return (
    <div className="mt-4">
      <StatusMessage
        title="No hay artículos disponibles"
        description="No hay artículos disponibles, puedes crear uno pulsando en el botón de crear artículo."
        icon={InboxArrowDownIcon}
        color="stone"
      />
    </div>
  );
};
