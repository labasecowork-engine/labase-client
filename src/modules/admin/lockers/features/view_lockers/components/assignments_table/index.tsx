import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { cn } from "@/utilities";
import { LOCKER_SOURCE_LABEL } from "../../constants";
import type { LockerAssignment } from "../../../../types";

interface Props {
  assignments: LockerAssignment[];
}

const formatRange = (from: string | null, to: string | null) => {
  if (!from && !to) return "—";
  const fmt = (value: string | null) =>
    value ? new Date(value).toLocaleDateString("es-PE") : "—";
  return `${fmt(from)} → ${fmt(to)}`;
};

export const AssignmentsTable = ({ assignments }: Props) => (
  <div className="overflow-x-auto">
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-b border-stone-200">
          <TableHead className="px-4 py-3 text-stone-700">Locker</TableHead>
          <TableHead className="px-4 py-3 text-stone-700">
            Cliente / Fuente
          </TableHead>
          <TableHead className="px-4 py-3 text-stone-700">Tipo</TableHead>
          <TableHead className="px-4 py-3 text-stone-700">Vigencia</TableHead>
          <TableHead className="px-4 py-3 text-stone-700">Llave</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {assignments.map((assignment) => (
          <TableRow
            key={assignment.id}
            className="border-b border-stone-100 bg-stone-50 transition-colors hover:bg-stone-100"
          >
            <TableCell className="px-4 py-3">
              {assignment.locker_number !== null ? (
                <span className="font-mono text-sm text-stone-700">
                  #{assignment.locker_number}
                </span>
              ) : (
                <span className="text-xs text-stone-400">Sin locker fijo</span>
              )}
            </TableCell>
            <TableCell className="px-4 py-3">
              <p className="font-medium text-stone-900">
                {assignment.client_name}
              </p>
              {assignment.company && (
                <p className="text-xs text-stone-500">{assignment.company}</p>
              )}
            </TableCell>
            <TableCell className="px-4 py-3 text-stone-600">
              {LOCKER_SOURCE_LABEL[assignment.source]}
            </TableCell>
            <TableCell className="px-4 py-3 font-mono text-xs text-stone-600">
              {formatRange(assignment.valid_from, assignment.valid_to)}
            </TableCell>
            <TableCell className="px-4 py-3">
              <span
                className={cn(
                  "inline-flex rounded-full px-2 py-0.5 text-xs font-medium",
                  assignment.key_status === "delivered"
                    ? "bg-emerald-500/15 text-emerald-700"
                    : "bg-yellow-500/15 text-yellow-800"
                )}
              >
                {assignment.key_status === "delivered"
                  ? "Entregada"
                  : "Pendiente"}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
