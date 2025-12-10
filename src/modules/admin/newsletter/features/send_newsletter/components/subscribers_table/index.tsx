import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { MailIcon, UserIcon } from "lucide-react";
import type { Subscriber } from "../../types";

export const SubscribersTable: React.FC<{
  subscribers: Subscriber[];
}> = ({ subscribers }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="border-b border-stone-200">
          <TableHead className="w-[280px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <MailIcon className="size-4" />
              Correo electrónico
            </div>
          </TableHead>
          <TableHead className="w-[180px] px-4 py-4">
            <div className="flex items-center gap-2 font-semibold text-stone-700">
              <UserIcon className="size-4" />
              Nombre
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {subscribers.map((subscriber, index) => (
          <TableRow
            key={subscriber.id}
            className={`border-b border-stone-100 hover:bg-stone-100 transition-colors ${
              index % 2 === 0 ? "bg-stone-50" : "bg-stone-50"
            }`}
          >
            <TableCell className="font-medium px-4 py-4 text-stone-900">
              {subscriber.email}
            </TableCell>
            <TableCell className="px-4 py-4 text-stone-700">
              {subscriber.name}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
