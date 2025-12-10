import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui";
import {
  EditIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  Trash2,
  BuildingIcon,
  ShieldUser,
} from "lucide-react";
import type { Visitor } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVisitor } from "../../services";
import { toast } from "sonner";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

interface Props {
  visitors: Visitor[];
}
export const VisitorsTable = ({ visitors }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync } = useMutation({
    mutationFn: deleteVisitor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
      toast.success("Visitante eliminado correctamente", {
        description: "El visitante ha sido eliminado correctamente.",
      });
    },
    onError: (error: Error) => {
      toast.error("Error al eliminar el visitante", {
        description: error.message,
      });
    },
  });
  const handleDelete = (id: string) => {
    toast.promise(mutateAsync(id), {
      loading: "Eliminando visitante...",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className=" w-full">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-stone-200">
            <TableHead className="w-[200px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <UserIcon className="size-4" />
                Visitante
              </div>
            </TableHead>
            <TableHead className="w-[200px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <ShieldUser className="size-4" />
                Alfitrion
              </div>
            </TableHead>
            <TableHead className="w-[200px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <BuildingIcon className="size-4" />
                Espacio
              </div>
            </TableHead>
            <TableHead className="w-[250px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <MailIcon className="size-4" />
                Email
              </div>
            </TableHead>
            <TableHead className="w-[140px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <PhoneIcon className="size-4" />
                Teléfono
              </div>
            </TableHead>

            <TableHead className="w-[180px] px-4 py-4">
              <div className="flex items-center gap-2 font-semibold text-stone-700">
                <CalendarIcon className="size-4" />
                Fecha de registro
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitors.map((visitor, index) => (
            <ContextMenu key={visitor.id}>
              <ContextMenuTrigger asChild>
                <TableRow
                  className={`border-b border-stone-100 hover:bg-stone-100 cursor-pointer transition-colors ${
                    index % 2 === 0 ? "bg-stone-50" : "bg-stone-50"
                  }`}
                >
                  <TableCell className="font-medium px-4 py-4 text-stone-900 truncate max-w-[200px]">
                    {visitor.first_name} {visitor.last_name}
                  </TableCell>
                  <TableCell className="font-medium px-4 py-4 text-stone-900 truncate max-w-[200px]">
                    {visitor.user.first_name} {visitor.user.last_name}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[200px]">
                    {visitor.space.name}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[250px]">
                    {visitor.email}
                  </TableCell>
                  <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[140px]">
                    {visitor.phone}
                  </TableCell>

                  <TableCell className="px-4 py-4 text-stone-700 truncate max-w-[180px]">
                    {formatDate(visitor.created_at)}
                  </TableCell>
                </TableRow>
              </ContextMenuTrigger>

              <ContextMenuContent className="w-48">
                <ContextMenuItem
                  onClick={() =>
                    navigate(
                      `${ROUTES.Admin.EditVisitor.replace(":id", visitor.id)}`
                    )
                  }
                  className="cursor-pointer text-sm"
                >
                  <EditIcon className="h-4 w-4 mr-2" />
                  Editar
                </ContextMenuItem>
                <ContextMenuItem
                  onClick={() => handleDelete(visitor.id)}
                  className="cursor-pointer text-sm"
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
