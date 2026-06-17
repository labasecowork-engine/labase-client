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
import { Archive, LogIn, LogOut } from "lucide-react";
import { RECORD_STATUS_STYLES, formatClock, formatDuration } from "../../../../constants";
import type { ExitTarget, ParkingRecord } from "../../../../types";

interface Props {
  records: ParkingRecord[];
  onExit: (target: ExitTarget) => void;
  onReenter: (id: string) => void;
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
  onExit,
  onReenter,
  onArchive,
  isBusy,
}: Props) => (
  <div className="overflow-x-auto">
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-b border-stone-200">
          <Th>Fecha</Th>
          <Th>Cliente</Th>
          <Th>Placa</Th>
          <Th>Espacio</Th>
          <Th>Entrada 1</Th>
          <Th>Salida 1</Th>
          <Th>Entrada 2</Th>
          <Th>Salida 2</Th>
          <Th>Total</Th>
          <Th>Estado</Th>
          <Th>Obs.</Th>
          <TableHead className="px-3 py-3 text-right text-stone-700">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.map((record) => {
          const status = RECORD_STATUS_STYLES[record.status];
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
              <TableCell className="px-3 py-3">
                <p className="font-medium text-stone-900">{record.client_name}</p>
                {record.company && (
                  <p className="text-xs text-stone-500">{record.company}</p>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-3 font-mono text-sm text-stone-700">
                {record.plate || "—"}
              </TableCell>
              <TableCell className="px-3 py-3">
                <span className="rounded-full bg-stone-200 px-2 py-0.5 font-mono text-xs text-stone-700">
                  {record.space_code}
                </span>
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-3 text-stone-600">
                {formatClock(record.entry_time_1)}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-3 text-stone-600">
                {formatClock(record.exit_time_1)}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-3 text-stone-600">
                {formatClock(record.entry_time_2)}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-3 text-stone-600">
                {formatClock(record.exit_time_2)}
              </TableCell>
              <TableCell className="whitespace-nowrap px-3 py-3 font-medium text-stone-800">
                {formatDuration(record.total_minutes)}
              </TableCell>
              <TableCell className="px-3 py-3">
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", status.badge)}>
                  {status.label}
                </span>
              </TableCell>
              <TableCell className="max-w-[140px] truncate px-3 py-3 text-stone-600">
                {record.observations ?? "—"}
              </TableCell>
              <TableCell className="px-3 py-3">
                <div className="flex items-center justify-end gap-1">
                  {record.status === "active" && (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isBusy}
                      onClick={() =>
                        onExit({
                          id: record.id,
                          client_name: record.client_name,
                          space_code: record.space_code,
                        })
                      }
                    >
                      <LogOut className="size-3.5" />
                      Salida
                    </Button>
                  )}
                  {canReenter && (
                    <Button size="sm" variant="outline" disabled={isBusy} onClick={() => onReenter(record.id)}>
                      <LogIn className="size-3.5" />
                      Reingreso
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={isBusy}
                    onClick={() => onArchive(record.id)}
                    aria-label="Archivar"
                  >
                    <Archive className="size-4" />
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
