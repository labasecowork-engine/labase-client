import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { calculateTotalWorkedHours } from "@/utilities";
import {
  CalendarDaysIcon,
  ChartBarIcon,
  ClockIcon,
  PlayIcon,
} from "lucide-react";
import React from "react";
import type { AttendanceDay, AttendanceRecord } from "../../types";

interface Props {
  attendanceData: AttendanceDay[];
}

export const TableAttendance = ({ attendanceData }: Props) => {
  return (
    <Table className="table-fixed">
      <TableHeader>
        <TableRow className="bg-stone-50/80">
          <TableHead className="w-[220px] py-4 text-center">
            <div className="flex items-center justify-center gap-2 font-semibold">
              <CalendarDaysIcon className="size-4 text-stone-600" />
              Día
            </div>
          </TableHead>
          <TableHead className="w-[180px] py-4 text-center">
            <div className="flex items-center justify-center gap-2 font-semibold">
              <ChartBarIcon className="size-4 text-stone-600" />
              Horas trabajadas
            </div>
          </TableHead>
          <TableHead className="w-[120px] py-4 text-center">
            <div className="flex items-center justify-center gap-2 font-semibold">
              <ClockIcon className="size-4 text-stone-600" />
              Hora
            </div>
          </TableHead>
          <TableHead className="w-[140px] py-4 text-center">
            <div className="flex items-center justify-center gap-2 font-semibold">
              <PlayIcon className="size-4 text-stone-600" />
              Tipo
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendanceData.map((day: AttendanceDay, dayIndex: number) => {
          return (
            <React.Fragment key={dayIndex}>
              {day.records.map(
                (record: AttendanceRecord, recordIndex: number) => (
                  <TableRow
                    key={`${dayIndex}-${recordIndex}`}
                    className={`hover:bg-stone-50/50 ${
                      recordIndex === 0 && dayIndex > 0
                        ? "border-t border-stone-200"
                        : ""
                    }`}
                  >
                    {recordIndex === 0 ? (
                      <TableCell
                        rowSpan={day.records.length}
                        className="py-6 px-4 bg-stone-50/60 border-r border-stone-200 text-center align-middle"
                      >
                        <div className="space-y-1">
                          <div className="font-semibold text-stone-900 text-sm">
                            {day.dayName}
                          </div>
                          <div className="text-xs text-stone-600 font-medium">
                            {day.date}
                          </div>
                        </div>
                      </TableCell>
                    ) : null}
                    {recordIndex === 0 ? (
                      <TableCell
                        rowSpan={day.records.length}
                        className="py-6 px-4 bg-stone-50/60 border-r border-stone-200 text-center align-middle"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-mono text-sm font-semibold text-stone-700">
                            {calculateTotalWorkedHours(day.records)}
                          </span>
                        </div>
                      </TableCell>
                    ) : null}
                    <TableCell className="py-4 px-4 text-center align-middle border-r border-stone-200">
                      <span className="font-mono text-sm font-medium text-stone-700">
                        {record.time}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-4 text-center align-middle">
                      <span
                        className={`flex w-full items-center gap-1.5 px-3 py-1.5 text-xs font-medium justify-center ${
                          record.type === "entry"
                            ? "bg-stone-100 text-stone-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {record.type === "entry" ? "Entrada" : "Salida"}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              )}
            </React.Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
};
