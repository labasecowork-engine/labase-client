import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { KeyRound, StarIcon, Undo2 } from "lucide-react";
import { useReturnKey } from "../../hooks";
import type { LockerDelivery } from "../../../../types";

interface Props {
  deliveries: LockerDelivery[];
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const DeliveriesTable = ({ deliveries }: Props) => {
  const { returnDelivery, isReturning } = useReturnKey();

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="border-b border-stone-200">
            <TableHead className="px-4 py-3 text-stone-700">Fecha</TableHead>
            <TableHead className="px-4 py-3 text-stone-700">Persona</TableHead>
            <TableHead className="px-4 py-3 text-stone-700">
              DNI / Celular
            </TableHead>
            <TableHead className="px-4 py-3 text-stone-700">Llave</TableHead>
            <TableHead className="px-4 py-3 text-stone-700">Entrega</TableHead>
            <TableHead className="px-4 py-3 text-stone-700">Tipo</TableHead>
            <TableHead className="px-4 py-3 text-right text-stone-700">
              Acción
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow
              key={delivery.id}
              className="border-b border-stone-100 bg-stone-50 transition-colors hover:bg-stone-100"
            >
              <TableCell className="px-4 py-3 font-mono text-xs text-stone-600">
                {formatDate(delivery.delivered_at)}
              </TableCell>
              <TableCell className="px-4 py-3">
                <p className="font-medium text-stone-900">
                  {delivery.person_name}
                </p>
                {delivery.company && (
                  <p className="text-xs text-stone-500">{delivery.company}</p>
                )}
              </TableCell>
              <TableCell className="px-4 py-3 text-stone-600">
                {delivery.document ?? "—"}
              </TableCell>
              <TableCell className="px-4 py-3">
                <span className="inline-flex items-center gap-1 font-mono text-sm text-stone-700">
                  <KeyRound className="size-3.5" />#{delivery.locker_number}
                </span>
              </TableCell>
              <TableCell className="px-4 py-3 text-stone-600">
                {formatTime(delivery.delivered_at)}
              </TableCell>
              <TableCell className="px-4 py-3">
                {delivery.is_vip ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-medium text-amber-700">
                    <StarIcon className="size-3" /> VIP
                  </span>
                ) : (
                  <span className="text-xs text-stone-500">Normal</span>
                )}
              </TableCell>
              <TableCell className="px-4 py-3 text-right">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={isReturning}
                  onClick={() => returnDelivery(delivery.id)}
                >
                  <Undo2 className="size-3.5" />
                  Devolver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
