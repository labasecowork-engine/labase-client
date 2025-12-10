import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import {
  CalendarIcon,
  CreditCardIcon,
  DollarSignIcon,
  TicketIcon,
} from "lucide-react";
import type { PaymentResponse } from "../../types";
import { formatPrice } from "@/utilities";

const formatTransactionDate = (date: string) => {
  const year = "20" + date.slice(0, 2);
  const month = date.slice(2, 4);
  const day = date.slice(4, 6);
  const hour = date.slice(6, 8);
  const minute = date.slice(8, 10);
  return `${day}/${month}/${year} ${hour}:${minute}`;
};
interface Props {
  data: PaymentResponse[];
}
export const PaymentsTable: React.FC<Props> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-stone-200">
          <TableHead className="px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <TicketIcon className="size-4" />
              N° Operación
            </div>
          </TableHead>
          <TableHead className="px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <CalendarIcon className="size-4" />
              Fecha de pago
            </div>
          </TableHead>
          <TableHead className="px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <DollarSignIcon className="size-4" />
              Monto
            </div>
          </TableHead>
          <TableHead className="px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <TicketIcon className="size-4" />
              Estado
            </div>
          </TableHead>

          <TableHead className="px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <CreditCardIcon className="size-4" />
              Tarjeta
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((payment, index) => (
          <TableRow
            key={index}
            className={`border-b border-stone-100 hover:bg-stone-100 cursor-pointer transition-colors ${
              index % 2 === 0 ? "bg-stone-50" : "bg-stone-50"
            }`}
          >
            <TableCell className="font-mono text-xs font-medium px-4 py-4 text-stone-600">
              {payment.purchase_number}
            </TableCell>
            <TableCell className="px-4 py-4 text-stone-700">
              {formatTransactionDate(payment.transaction_date)}
            </TableCell>
            <TableCell className="px-4 py-4 font-semibold text-stone-500">
              {formatPrice(payment.amount.toString())}
            </TableCell>
            <TableCell className="px-4 py-4">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium font-mono ${
                  payment.status === "APPROVED"
                    ? "bg-emerald-800/10 text-emerald-800 "
                    : "bg-rose-800/10 text-rose-800"
                }`}
              >
                {payment.status === "APPROVED" ? "APROBADO" : "RECHAZADO"}
              </span>
            </TableCell>

            <TableCell className="px-4 py-4 text-stone-700 font-mono font-medium">
              {payment.card_masked}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
