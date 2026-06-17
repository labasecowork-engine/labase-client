import { useState } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  pdf,
} from "@react-pdf/renderer";
import { Button } from "@/components/ui";
import { FileSpreadsheet, FileText } from "lucide-react";
import { RECORD_STATUS_STYLES, formatClock, formatDuration } from "../../../../constants";
import type { ParkingRecord } from "../../../../types";

interface Props {
  records: ParkingRecord[];
}

const fileStamp = (): string => new Date().toISOString().slice(0, 10);

const exportExcel = async (records: ParkingRecord[]): Promise<void> => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Estacionamiento");
  sheet.columns = [
    { header: "Fecha", key: "date", width: 12 },
    { header: "Cliente", key: "client_name", width: 34 },
    { header: "Empresa", key: "company", width: 24 },
    { header: "Placa", key: "plate", width: 12 },
    { header: "Espacio", key: "space_code", width: 10 },
    { header: "Entrada 1", key: "e1", width: 11 },
    { header: "Salida 1", key: "s1", width: 11 },
    { header: "Entrada 2", key: "e2", width: 11 },
    { header: "Salida 2", key: "s2", width: 11 },
    { header: "Total", key: "total", width: 12 },
    { header: "Estado", key: "status", width: 12 },
  ];
  records.forEach((r) =>
    sheet.addRow({
      date: r.date,
      client_name: r.client_name,
      company: r.company ?? "",
      plate: r.plate,
      space_code: r.space_code,
      e1: formatClock(r.entry_time_1),
      s1: formatClock(r.exit_time_1),
      e2: formatClock(r.entry_time_2),
      s2: formatClock(r.exit_time_2),
      total: formatDuration(r.total_minutes),
      status: RECORD_STATUS_STYLES[r.status].label,
    })
  );
  sheet.getRow(1).font = { bold: true };
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `estacionamiento-${fileStamp()}.xlsx`);
};

const pdfStyles = StyleSheet.create({
  page: { padding: 24, fontSize: 9 },
  title: { fontSize: 14, marginBottom: 12, fontWeight: "bold" },
  row: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#e7e5e4", paddingVertical: 4 },
  head: { fontWeight: "bold", backgroundColor: "#f5f5f4" },
  cDate: { width: "14%" },
  cClient: { width: "34%" },
  cPlate: { width: "14%" },
  cSpace: { width: "10%" },
  cTotal: { width: "14%" },
  cStatus: { width: "14%" },
});

const ParkingPdf = ({ records }: { records: ParkingRecord[] }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <Text style={pdfStyles.title}>Registros de Estacionamiento</Text>
      <View style={[pdfStyles.row, pdfStyles.head]}>
        <Text style={pdfStyles.cDate}>Fecha</Text>
        <Text style={pdfStyles.cClient}>Cliente</Text>
        <Text style={pdfStyles.cPlate}>Placa</Text>
        <Text style={pdfStyles.cSpace}>Esp.</Text>
        <Text style={pdfStyles.cTotal}>Total</Text>
        <Text style={pdfStyles.cStatus}>Estado</Text>
      </View>
      {records.map((r) => (
        <View key={r.id} style={pdfStyles.row}>
          <Text style={pdfStyles.cDate}>{r.date}</Text>
          <Text style={pdfStyles.cClient}>{r.client_name}</Text>
          <Text style={pdfStyles.cPlate}>{r.plate || "—"}</Text>
          <Text style={pdfStyles.cSpace}>{r.space_code}</Text>
          <Text style={pdfStyles.cTotal}>{formatDuration(r.total_minutes)}</Text>
          <Text style={pdfStyles.cStatus}>{RECORD_STATUS_STYLES[r.status].label}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

const exportPdf = async (records: ParkingRecord[]): Promise<void> => {
  const blob = await pdf(<ParkingPdf records={records} />).toBlob();
  saveAs(blob, `estacionamiento-${fileStamp()}.pdf`);
};

export const ExportMenu = ({ records }: Props) => {
  const [busy, setBusy] = useState<"excel" | "pdf" | null>(null);

  const run = async (kind: "excel" | "pdf") => {
    setBusy(kind);
    try {
      if (kind === "excel") await exportExcel(records);
      else await exportPdf(records);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={busy !== null || records.length === 0}
        onClick={() => run("excel")}
      >
        <FileSpreadsheet className="size-4" />
        {busy === "excel" ? "…" : "Excel"}
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={busy !== null || records.length === 0}
        onClick={() => run("pdf")}
      >
        <FileText className="size-4" />
        {busy === "pdf" ? "…" : "PDF"}
      </Button>
    </div>
  );
};
