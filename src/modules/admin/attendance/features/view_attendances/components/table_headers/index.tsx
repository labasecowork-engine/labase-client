import { TableHeader, TableRow, TableHead } from "@/components/ui";
import {
  UserIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

export const TableHeaders = () => (
  <TableHeader>
    <TableRow>
      <TableHead className="w-[200px] py-4 px-6 text-left">
        <div className="flex items-center gap-2 font-semibold text-stone-700">
          <UserIcon className="h-4 w-4" />
          Empleado
        </div>
      </TableHead>
      <TableHead className="w-[140px] py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-2 font-semibold text-stone-700">
          <CalendarDaysIcon className="h-4 w-4" />
          Fecha
        </div>
      </TableHead>
      <TableHead className="w-[140px] py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-2 font-semibold text-stone-700">
          <ChartBarIcon className="h-4 w-4" />
          Horas trabajadas
        </div>
      </TableHead>
      <TableHead className="w-[100px] py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-2 font-semibold text-stone-700">
          <ClockIcon className="h-4 w-4" />
          Hora
        </div>
      </TableHead>
      <TableHead className="w-[120px] py-4 px-4 text-center">
        <div className="flex items-center justify-center gap-2 font-semibold text-stone-700">
          Tipo
        </div>
      </TableHead>
    </TableRow>
  </TableHeader>
);
