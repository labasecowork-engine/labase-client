import { dayNames } from "@/utilities";
import type { Attendance } from "../types";

export const transformAttendanceData = (attendance: {
  attendances: Attendance[];
}) => {
  if (!attendance?.attendances) return [];

  const groupedByEmployeeAndDate: { [key: string]: Attendance[] } = {};

  attendance.attendances.forEach((record) => {
    const key = `${record.employee.user.id}-${record.date}`;
    if (!groupedByEmployeeAndDate[key]) {
      groupedByEmployeeAndDate[key] = [];
    }
    groupedByEmployeeAndDate[key].push(record);
  });

  return Object.entries(groupedByEmployeeAndDate).map(([, records]) => {
    const firstRecord = records[0];
    const date = new Date(firstRecord.date + "T00:00:00");

    return {
      employee_name: firstRecord.employee.user.name,
      date: firstRecord.date,
      day_name: dayNames[date.getDay()],
      records: records.map((record) => ({
        id: record.id,
        time: record.check_time.substring(0, 5),
        type: record.type,
      })),
    };
  });
};
