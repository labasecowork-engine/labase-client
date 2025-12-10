import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import type { Reservation } from "../../types";
import {
  BuildingIcon,
  CalendarIcon,
  CircleGauge,
  ClockIcon,
  DollarSignIcon,
  EditIcon,
  EyeIcon,
  TicketIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { formatDateToShort, formatTimeRange } from "@/utilities/date_utilities";
import { formatPrice } from "@/utilities/string_utilities";
import { toast } from "sonner";

interface ReservationTableProps {
  reservations: Reservation[];
}

export const ReservationTable = ({ reservations }: ReservationTableProps) => {
  const navigate = useNavigate();

  const handleContextMenu = () => {
    toast.info("Herramienta en desarrollo", {
      description:
        "Esta funcionalidad está en desarrollo, pronto estará disponible.",
    });
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-b border-stone-200">
          <TableHead className="w-[80px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <TicketIcon className="size-4" />
              ID
            </div>
          </TableHead>
          <TableHead className="w-[160px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <UserIcon className="size-4" />
              Cliente
            </div>
          </TableHead>
          <TableHead className="w-[80px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <CalendarIcon className="size-4" />
              Fecha
            </div>
          </TableHead>
          <TableHead className="w-[180px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <ClockIcon className="size-4" />
              Horario
            </div>
          </TableHead>
          <TableHead className="w-[80px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <UsersIcon className="size-4" />
              Personas
            </div>
          </TableHead>
          <TableHead className="w-[120px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <DollarSignIcon className="size-4" />
              Total
            </div>
          </TableHead>
          <TableHead className="w-[150px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <BuildingIcon className="size-4" />
              Espacio
            </div>
          </TableHead>
          <TableHead className="w-[130px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <BuildingIcon className="size-4" />
              Completo
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation, index) => (
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <TableRow
                key={reservation.id}
                onClick={() => {
                  navigate(
                    `${ROUTES.Admin.ViewAllReservations}/${reservation.id}`
                  );
                }}
                className={`border-b border-stone-100 hover:bg-stone-100 cursor-pointer transition-colors ${
                  index % 2 === 0 ? "bg-stone-50" : "bg-stone-50"
                }`}
              >
                <TableCell className="font-mono text-xs font-medium px-4 py-4 text-stone-600 truncate max-w-[100px]">
                  ...{reservation.id.slice(-4)}
                </TableCell>
                <TableCell className="font-medium px-4 py-4 text-stone-900 truncate max-w-[140px] ">
                  {reservation.user.first_name} {reservation.user.last_name}
                </TableCell>
                <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[80px]">
                  {formatDateToShort(reservation.created_at)}
                </TableCell>
                <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[180px]">
                  {formatTimeRange(
                    reservation.start_time,
                    reservation.end_time
                  )}
                </TableCell>
                <TableCell className="px-4 py-4 text-center font-medium text-stone-800 truncate max-w-[80px]">
                  {reservation.people}
                </TableCell>
                <TableCell className="px-4 py-4 font-semibold text-stone-500 truncate max-w-[120px]">
                  {formatPrice(reservation.price)}
                </TableCell>
                <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[150px]">
                  {reservation.space.name}
                </TableCell>
                <TableCell className="px-4 py-4 text-center truncate max-w-[130px]">
                  <span
                    className={`inline-flex items-center px-2 py-1 text-xs font-medium transition-all `}
                  >
                    {reservation.full_room ? "Sí" : "No"}
                  </span>
                </TableCell>
              </TableRow>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-60">
              <ContextMenuItem onClick={handleContextMenu}>
                <EyeIcon className="size-4" />
                Ver detalles
              </ContextMenuItem>
              <ContextMenuItem onClick={handleContextMenu}>
                <EditIcon className="size-4" />
                Editar
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger className="cursor-pointer gap-2 flex items-center px-3 text-stone-700">
                  <CircleGauge className="size-4 text-stone-500" />
                  Cambiar estado
                </ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-44">
                  <ContextMenuItem onClick={handleContextMenu}>
                    Pendiente
                  </ContextMenuItem>
                  <ContextMenuItem onClick={handleContextMenu}>
                    Confirmada
                  </ContextMenuItem>
                  <ContextMenuItem onClick={handleContextMenu}>
                    Cancelada
                  </ContextMenuItem>
                  <ContextMenuItem onClick={handleContextMenu}>
                    En progreso
                  </ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </TableBody>
    </Table>
  );
};
