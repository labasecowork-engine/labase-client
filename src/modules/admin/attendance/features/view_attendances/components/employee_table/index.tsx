import { Table, TableBody } from "@/components/ui";
import { TableHeaders } from "..";
import { AttendanceRow } from "..";
import { transformAttendanceData } from "../../utils";

interface Props {
  data: ReturnType<typeof transformAttendanceData>;
}

export const EmployeeTable: React.FC<Props> = ({ data }) => (
  <div className=" overflow-hidden">
    <Table>
      <TableHeaders />
      <TableBody>
        {data.map((dayRecord, idx) =>
          dayRecord.records.map((record, recordIndex) => (
            <AttendanceRow
              key={`${idx}-${recordIndex}`}
              dayRecord={dayRecord}
              record={record}
              recordIndex={recordIndex}
            />
          ))
        )}
      </TableBody>
    </Table>
  </div>
);
