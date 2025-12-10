import { DocumentTextIcon, TableCellsIcon } from "@heroicons/react/24/solid";
import { Button } from "../../../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../../../../../components/ui/dialog";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAttendance } from "../../services";
import { transformAttendanceData } from "../../utils";
import { AttendancePDFDocument } from "../attendance_pdf";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  search?: string;
  workAreaId?: string;
  companyId?: string;
}
export const ExportDialog: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  search,
  workAreaId,
  companyId,
}) => {
  const { data } = useQuery({
    queryKey: ["attendance", search, workAreaId, companyId],
    queryFn: () => getAttendance(1, search, workAreaId, companyId, true),
  });

  const employeeAttendance = useMemo(
    () => transformAttendanceData(data || { attendances: [] }),
    [data]
  );

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const pdfFileName = `reporte_asistencia_${formattedDate}.pdf`;
  const excelFileName = `reporte_asistencia_${formattedDate}.xlsx`;

  const handleExportExcel = async () => {
    if (employeeAttendance.length === 0) return;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Asistencia");

    const font = { name: "Calibri", size: 11 };

    worksheet.columns = [
      { header: "Fecha", key: "Fecha", width: 15 },
      { header: "Día", key: "Día", width: 15 },
      { header: "Empleado", key: "Empleado", width: 30 },
      { header: "Hora", key: "Hora", width: 12 },
      { header: "Tipo", key: "Tipo", width: 12 },
    ];

    const headerRow = worksheet.getRow(1);
    headerRow.height = 25;
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF343434" },
      };
      cell.font = {
        ...font,
        bold: true,
        color: { argb: "FFFFFFFF" },
        size: 12,
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        bottom: { style: "thin", color: { argb: "FFFFFFFF" } },
      };
    });

    const flattenedData = employeeAttendance.flatMap((dayRecord) => {
      return dayRecord.records.map((record) => ({
        Fecha: dayRecord.date,
        Día: dayRecord.day_name,
        Empleado: dayRecord.employee_name || "Empleado no encontrado",
        Hora: record.time,
        Tipo: record.type === "entry" ? "Entrada" : "Salida",
      }));
    });
    worksheet.addRows(flattenedData);

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber > 1) {
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFFFFFFF" },
          };
          cell.font = {
            ...font,
            color: { argb: "FF000000" },
          };
          cell.border = {
            top: { style: "thin", color: { argb: "FFD4D4D4" } },
            left: { style: "thin", color: { argb: "FFD4D4D4" } },
            bottom: { style: "thin", color: { argb: "FFD4D4D4" } },
            right: { style: "thin", color: { argb: "FFD4D4D4" } },
          };
        });
      }
    });

    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      column.eachCell!({ includeEmpty: true }, (cell: ExcelJS.Cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = Math.max(column.width!, maxLength + 2);
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, excelFileName);

    onOpenChange(false);
  };

  const hasData = employeeAttendance.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Exportar datos</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Selecciona el formato de exportación de los datos, los datos que se
          exportaran serán según el filtro seleccionado.
        </DialogDescription>
        <div className="flex flex-col gap-2 mt-4">
          <PDFDownloadLink
            document={
              <AttendancePDFDocument
                data={employeeAttendance}
                reportDate={formattedDate}
              />
            }
            fileName={pdfFileName}
            style={{ pointerEvents: hasData ? "auto" : "none" }}
          >
            {({ loading }) => (
              <Button
                variant="outline"
                className="w-full rounded-lg hover:bg-rose-800/10 hover:text-rose-800 hover:border-rose-800/5 disabled:opacity-50"
                disabled={loading || !hasData}
              >
                <DocumentTextIcon className="size-5 mr-2" />
                {loading ? "Generando PDF..." : "Documento de PDF"}
              </Button>
            )}
          </PDFDownloadLink>
          <Button
            variant="outline"
            onClick={handleExportExcel}
            className="rounded-lg hover:bg-emerald-800/10 hover:text-emerald-800 hover:border-emerald-800/5"
            disabled={!hasData}
          >
            <TableCellsIcon className="size-5 " />
            Hoja de cálculo de Excel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
