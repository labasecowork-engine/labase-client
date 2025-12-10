import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuContent,
  ContextMenuTrigger,
} from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { REMINDER_FREQUENCY_VALUES } from "@/types";
import { format } from "date-fns";
import { EditIcon, EyeIcon, EyeOffIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useActivateReminder,
  useDeactivateReminder,
  useDeleteReminder,
} from "../../hooks";

interface Props {
  title: string;
  contact: string;
  frequency: (typeof REMINDER_FREQUENCY_VALUES)[keyof typeof REMINDER_FREQUENCY_VALUES];
  send_date: string;
  id: string;
  is_active: boolean;
}

export const ReminderCard: React.FC<Props> = ({
  title,
  contact,
  frequency,
  send_date,
  id,
  is_active,
}) => {
  const navigate = useNavigate();
  const { handleDelete, isPending: isRemoving } = useDeleteReminder(id);
  const { handleDeactivate, isPending: isDeactivating } =
    useDeactivateReminder(id);
  const { handleActivate, isPending: isActivating } = useActivateReminder(id);

  const handleEdit = () => {
    const editUrl = ROUTES.Admin.EditReminder.replace(":id", id);
    navigate(editUrl);
  };

  const isLoading = isRemoving || isDeactivating || isActivating;
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="bg-stone-50 rounded-md max-w-sm ">
          <div className="px-4 pt-4">
            <span className="text-xs text-stone-500 uppercase">
              #{id.slice(0, 6)}
            </span>
            <h2 className="text-sm font-semibold ">{title}</h2>
          </div>
          <div className="mt-4 space-y-2 border-t border-stone-200 pt-4 px-4 pb-4">
            <div className="text-xs text-stone-500 flex justify-between items-center gap-2">
              <span className="block font-medium w-[100px]">Contacto:</span>
              <span className="text-right">
                <span>+51</span> <span>{contact}</span>
              </span>
            </div>
            <div className="text-xs text-stone-500 flex justify-between items-center gap-2">
              <span className="block font-medium w-[100px]">Frecuencia:</span>
              <span className="text-right">
                {
                  REMINDER_FREQUENCY_VALUES[
                    frequency as keyof typeof REMINDER_FREQUENCY_VALUES
                  ]
                }
              </span>
            </div>
            <div className="text-xs text-stone-500 flex justify-between items-center gap-2">
              <span className="block font-medium w-[100px]">
                Fecha de envío:
              </span>
              <span className="text-right">
                {format(send_date, "dd/MM/yyyy")}
              </span>
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleEdit} disabled={isLoading}>
          <EditIcon className="w-4 h-4" />
          Editar
        </ContextMenuItem>
        {is_active && (
          <ContextMenuItem onClick={handleDeactivate} disabled={isLoading}>
            <EyeOffIcon className="w-4 h-4" />
            Desactivar
          </ContextMenuItem>
        )}
        {!is_active && (
          <ContextMenuItem onClick={handleActivate} disabled={isLoading}>
            <EyeIcon className="w-4 h-4" />
            Activar
          </ContextMenuItem>
        )}
        <ContextMenuItem
          variant="destructive"
          onClick={handleDelete}
          disabled={isLoading}
        >
          <Trash2Icon className="w-4 h-4" />
          Eliminar
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
