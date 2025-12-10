import { TableCell, TableRow } from "@/components/ui";
import type { transformAttendanceData } from "../../utils";
import { calculateTotalWorkedHours } from "@/utilities";

interface Props {
  dayRecord: ReturnType<typeof transformAttendanceData>[0];
  record: ReturnType<typeof transformAttendanceData>[0]["records"][0];
  recordIndex: number;
}

export const AttendanceRow: React.FC<Props> = ({
  dayRecord,
  record,
  recordIndex,
}) => (
  <TableRow>
    {recordIndex === 0 ? (
      <TableCell
        rowSpan={dayRecord.records.length}
        className="py-4 px-6 bg-stone-50/60 border-r border-stone-200"
      >
        <div>
          <p className="font-medium text-stone-900">
            {dayRecord.employee_name}
          </p>
          <p className="text-xs text-stone-500">
            {dayRecord.records.length} registro
            {dayRecord.records.length !== 1 ? "s" : ""}
          </p>
        </div>
      </TableCell>
    ) : null}

    {recordIndex === 0 ? (
      <TableCell
        rowSpan={dayRecord.records.length}
        className="py-4 px-4 bg-stone-50/60 border-r border-stone-200 text-center"
      >
        <div className="space-y-1">
          <p className="font-medium text-stone-900 text-sm">
            {dayRecord.day_name}
          </p>
          <p className="text-xs text-stone-600">{dayRecord.date}</p>
        </div>
      </TableCell>
    ) : null}

    {recordIndex === 0 ? (
      <TableCell
        rowSpan={dayRecord.records.length}
        className="py-4 px-4 bg-stone-50/60 border-r border-stone-200 text-center"
      >
        <div className="font-mono text-sm font-semibold text-stone-700 bg-stone-100 px-2 py-1 inline-block">
          {calculateTotalWorkedHours(dayRecord.records)}
        </div>
      </TableCell>
    ) : null}

    <TableCell className="py-3 px-4 text-center border-r border-stone-200">
      <span className="font-mono text-sm font-medium text-stone-700">
        {record.time}
      </span>
    </TableCell>

    <TableCell className="py-3 px-4 text-center">
      <span
        className={`flex rounded-lg w-full items-center gap-1.5 px-3 py-1.5 text-xs font-medium justify-center ${
          record.type === "entry"
            ? "bg-stone-100 text-stone-800"
            : "bg-orange-100 text-orange-800"
        }`}
      >
        {record.type === "entry" ? "Entrada" : "Salida"}
      </span>
    </TableCell>
  </TableRow>
);
