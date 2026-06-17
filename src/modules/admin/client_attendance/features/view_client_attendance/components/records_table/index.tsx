import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/utilities";
import { Archive, LogIn, Pencil, Trash2 } from "lucide-react";
import {
  SOURCE_LABEL,
  STATUS_STYLES,
  formatClock,
  formatDuration,
} from "../../../../constants";
import type { ClientAttendance, ExitTarget } from "../../../../types";

interface Props {
  records: ClientAttendance[];
  onReenter: (id: string) => void;
  onEdit: (record: ClientAttendance) => void;
  onDelete: (target: ExitTarget) => void;
  onArchive: (id: string) => void;
  isBusy: boolean;
}

const Th = ({ children }: { children: React.ReactNode }) => (
  <TableHead className="whitespace-nowrap px-3 py-3 text-stone-700">
    {children}
  </TableHead>
);

export const RecordsTable = ({
  records,
  onReenter,
  onEdit,
  onDelete,
  onArchive,
  isBusy,
}: Props) => (
  <div className="overflow-x-auto">
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-b border-stone-200">
          <Th>Fecha</Th>
          <Th>Nombre</Th>
          <Th>Empresa</Th>
          <Th>Locker</Th>
          <Th>Entrada 1</Th>
          <Th>Salida 1</Th>
          <Th>Entrada 2</Th>
          <Th>Salida 2</Th>
          <Th>Hora límite</Th>
          <Th>Estado</Th>
          <Th>Fuente</Th>
          <TableHead className="px-3 py-3 text-right text-stone-700">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => {
          const status = STATUS_STYLES[record.status];
          const canReenter =
            record.status === "exited" &&
            record.exit_time_1 !== null &&
            record.entry_time_2 === null;
          return (
            <TableRow
              key={record.id}
              className="border-b border-stone-100 bg-stone-50 transition-colors hover:bg-stone-100"
            >
              <TableCell className="whitespace-nowrap px-3 py-3 font-mono text-xs text-stone-600">
                {record.date}
              </TableCell>
              <TableCell className="px-3 py-3 font-medium text-stone-900">
                {record.client_name}
              </TableCell>
              <TableCell className="px-3 py-3 text-stone-600">
                {record.company ?? "—"}
              </TableCell>
              <TableCell className="px-3 py-3 text-stone-600">
                {record.locker_ref ?? "—"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-3 text-stone-600">
                {formatClock(record.entry_time_1)}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-3 text-stone-600">
                {record.status === "present" && record.exit_time_1 === null ? (
                  <span className="text-xs italic text-stone-400">En curso</span>
                ) : (
                  formatClock(record.exit_time_1)
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-3 text-stone-600">
                {formatClock(record.entry_time_2)}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-3 text-stone-600">
                {formatClock(record.exit_time_2)}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-3 text-stone-500">
                {formatClock(record.limit_time)}
              </TableCell>
              <TableCell className="px-3 py-3">
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", status.badge)}>
                  {status.label}
                </span>
                {record.status === "exited" && record.total_minutes !== null && (
                  <p className="mt-1 text-xs font-medium text-stone-700">
                    {formatDuration(record.total_minutes)}
                  </p>
                )}
              </TableCell>
              <TableCell className="px-3 py-3">
                <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs text-stone-700">
                  {SOURCE_LABEL[record.source]}
                </span>
              </TableCell>
              <TableCell className="px-3 py-3">
                <div className="flex items-center justify-end gap-1">
                  {canReenter && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isBusy}
                      onClick={() => onReenter(record.id)}
                    >
                      <LogIn className="size-3.5" />
                      Reingreso
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={isBusy}
                    onClick={() => onEdit(record)}
                    aria-label="Editar"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={isBusy}
                    onClick={() => onArchive(record.id)}
                    aria-label="Archivar"
                  >
                    <Archive className="size-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={isBusy}
                    onClick={() =>
                      onDelete({ id: record.id, client_name: record.client_name })
                    }
                    aria-label="Eliminar"
                    className="text-rose-700 hover:text-rose-800"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </div>
);
