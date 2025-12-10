import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import type { transformAttendanceData } from "../../utils";

type AttendanceData = ReturnType<typeof transformAttendanceData>;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "Helvetica",
    color: "#666666",
    marginBottom: 25,
  },
  table: {
    display: "flex",
    width: "auto",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#cccccc",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  colHeader: {
    padding: 6,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  tableCol: {
    padding: 6,
    fontSize: 9,
  },
  colDate: { width: "20%" },
  colDay: { width: "20%" },
  colEmployee: { width: "40%" },
  colTime: { width: "10%" },
});

interface Props {
  data: AttendanceData;
  reportDate: string;
}

export const AttendancePDFDocument: React.FC<Props> = ({
  data,
  reportDate,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Reporte de Asistencia</Text>
      <Text style={styles.subtitle}>Generado el: {reportDate}</Text>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.colHeader, styles.colDate]}>Fecha</Text>
          <Text style={[styles.colHeader, styles.colDay]}>Día</Text>
          <Text style={[styles.colHeader, styles.colEmployee]}>Empleado</Text>
          <Text style={[styles.colHeader, styles.colTime]}>Hora</Text>
          <Text style={[styles.colHeader, styles.colTime]}>Tipo</Text>
        </View>

        {data.flatMap((dayRecord) =>
          dayRecord.records.map((record) => (
            <View
              style={styles.tableRow}
              key={`${dayRecord.date}-${record.id}`}
            >
              <Text style={[styles.tableCol, styles.colDate]}>
                {dayRecord.date}
              </Text>
              <Text style={[styles.tableCol, styles.colDay]}>
                {dayRecord.day_name}
              </Text>
              <Text style={[styles.tableCol, styles.colEmployee]}>
                {dayRecord.employee_name || "Empleado no encontrado"}
              </Text>
              <Text style={[styles.tableCol, styles.colTime]}>
                {record.time}
              </Text>
              <Text style={[styles.tableCol, styles.colTime]}>
                {record.type === "entry" ? "Entrada" : "Salida"}
              </Text>
            </View>
          ))
        )}
      </View>
    </Page>
  </Document>
);
