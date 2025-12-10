import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Image,
  type DocumentProps,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import * as QRCode from "qrcode";
import type { PaymentResponse } from "@/modules/client/payment/types";
import type { Reservation } from "../types";
import React from "react";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: "#000000",
    paddingBottom: 20,
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1C1C1C",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1C1C1C",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#374151",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingVertical: 4,
  },
  label: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "bold",
  },
  value: {
    fontSize: 12,
    color: "#1F2937",
    textAlign: "right",
  },
  section: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottom: 1,
    borderBottomColor: "#E5E7EB",
  },
  qrSection: {
    alignItems: "center",
    marginTop: 30,
    paddingTop: 20,
    borderTop: 2,
    borderTopColor: "#000000",
  },
  qrCode: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  qrLabel: {
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
  },
  totalSection: {
    backgroundColor: "#F3F4F6",
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#059669",
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: 1,
    borderTopColor: "#E5E7EB",
    alignItems: "center",
  },
  footerText: {
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 5,
  },
});

interface ReceiptDocumentProps {
  paymentResult: PaymentResponse;
  reservation: Reservation;
  qrCodeDataUrl: string;
}

const ReceiptDocument: React.FC<ReceiptDocumentProps> = ({
  paymentResult,
  reservation,
  qrCodeDataUrl,
}) => {
  const formatTransactionDate = (dateStr: string) => {
    const year = "20" + dateStr.substring(0, 2);
    const month = dateStr.substring(2, 4);
    const day = dateStr.substring(4, 6);
    const hour = dateStr.substring(6, 8);
    const minute = dateStr.substring(8, 10);
    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`);
    return format(date, "dd/MM/yyyy HH:mm", { locale: es });
  };

  return React.createElement(
    Document,
    {},
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      // Header
      React.createElement(
        View,
        { style: styles.header },
        React.createElement(Text, { style: styles.logo }, "LA BASE"),
        React.createElement(
          Text,
          { style: { fontSize: 12, color: "#6B7280" } },
          "Boleta de Pago"
        )
      ),

      React.createElement(
        Text,
        { style: styles.title },
        "COMPROBANTE DE RESERVA"
      ),

      React.createElement(
        View,
        { style: styles.section },
        React.createElement(
          Text,
          { style: styles.subtitle },
          "Detalles de la Reserva"
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "ID de Reserva:"),
          React.createElement(Text, { style: styles.value }, reservation.id)
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Espacio:"),
          React.createElement(
            Text,
            { style: styles.value },
            reservation.space.name
          )
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Cliente:"),
          React.createElement(
            Text,
            { style: styles.value },
            reservation.user.id
          )
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Email:"),
          React.createElement(
            Text,
            { style: styles.value },
            reservation.user.email
          )
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Fecha:"),
          React.createElement(
            Text,
            { style: styles.value },
            format(new Date(reservation.start_time), "dd/MM/yyyy", {
              locale: es,
            })
          )
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Horario:"),
          React.createElement(
            Text,
            { style: styles.value },
            `${format(new Date(reservation.start_time), "HH:mm")} - ${format(
              new Date(reservation.end_time),
              "HH:mm"
            )}`
          )
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Personas:"),
          React.createElement(
            Text,
            { style: styles.value },
            reservation.people.toString()
          )
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(
            Text,
            { style: styles.label },
            "Espacio Completo:"
          ),
          React.createElement(
            Text,
            { style: styles.value },
            reservation.full_room ? "Sí" : "No"
          )
        )
      ),

      // Información del pago
      React.createElement(
        View,
        { style: styles.section },
        React.createElement(
          Text,
          { style: styles.subtitle },
          "Detalles del Pago"
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(
            Text,
            { style: styles.label },
            "ID de Transacción:"
          ),
          React.createElement(
            Text,
            { style: styles.value },
            paymentResult.purchase_number
          )
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Fecha de Pago:"),
          React.createElement(
            Text,
            { style: styles.value },
            formatTransactionDate(paymentResult.transaction_date)
          )
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Tarjeta:"),
          React.createElement(
            Text,
            { style: styles.value },
            paymentResult.card_masked
          )
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(
            Text,
            { style: styles.label },
            "Código de Autorización:"
          ),
          React.createElement(
            Text,
            { style: styles.value },
            paymentResult.authorization_code
          )
        ),

        React.createElement(
          View,
          { style: styles.row },
          React.createElement(Text, { style: styles.label }, "Estado:"),
          React.createElement(Text, { style: styles.value }, "✓ Aprobado")
        )
      ),

      // Total
      React.createElement(
        View,
        { style: styles.totalSection },
        React.createElement(
          View,
          { style: styles.totalRow },
          React.createElement(
            Text,
            { style: styles.totalLabel },
            "TOTAL PAGADO:"
          ),
          React.createElement(
            Text,
            { style: styles.totalValue },
            `S/${paymentResult.amount.toFixed(2)}`
          )
        )
      ),

      // Código QR
      React.createElement(
        View,
        { style: styles.qrSection },
        React.createElement(
          Text,
          { style: styles.subtitle },
          "Código QR de la Reserva"
        ),
        React.createElement(Image, {
          style: styles.qrCode,
          src: qrCodeDataUrl,
        }),
        React.createElement(
          Text,
          { style: styles.qrLabel },
          "Presenta este código QR en el espacio reservado"
        )
      ),

      // Footer
      React.createElement(
        View,
        { style: styles.footer },
        React.createElement(
          Text,
          { style: styles.footerText },
          "Gracias por elegir La Base para tu reserva."
        ),
        React.createElement(
          Text,
          { style: styles.footerText },
          "Este comprobante es válido como prueba de pago y reserva."
        ),
        React.createElement(
          Text,
          { style: styles.footerText },
          `Generado el ${format(new Date(), "dd/MM/yyyy HH:mm", {
            locale: es,
          })}`
        )
      )
    )
  );
};

export const generateReceiptPDF = async (
  paymentResult: PaymentResponse,
  reservation: Reservation
): Promise<boolean> => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(reservation.code_qr, {
      width: 120,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    const doc = React.createElement(ReceiptDocument, {
      paymentResult,
      reservation,
      qrCodeDataUrl,
    });

    const asPdf = pdf(doc as React.ReactElement<DocumentProps>);
    const blob = await asPdf.toBlob();

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `boleta-reserva-${reservation.id}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error("Error generando el PDF:", error);
    throw new Error("No se pudo generar el PDF de la boleta");
  }
};
