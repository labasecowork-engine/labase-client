import { UsersIcon, ClockIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import { StatsCard } from "..";
interface Props {
  totalRegisters: number;
  daysRegistered: number;
  totalEmployees: number;
  totalHours: string;
}
export const StatsGrid: React.FC<Props> = ({
  totalRegisters,
  daysRegistered,
  totalEmployees,
  totalHours,
}) => (
  <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
    <StatsCard
      title="Días registrados"
      value={daysRegistered}
      icon={ClockIcon}
      bgColor="bg-rose-800/10"
      iconColor="text-rose-800"
      textColor="text-rose-800"
    />
    <StatsCard
      title="Total registros"
      value={totalRegisters}
      icon={ChartBarIcon}
      bgColor="bg-orange-800/10"
      iconColor="text-orange-800"
      textColor="text-orange-800"
    />
    <StatsCard
      title="Total horas"
      value={totalHours}
      icon={ClockIcon}
      bgColor="bg-amber-800/10"
      iconColor="text-amber-800"
      textColor="text-amber-800"
    />
    <StatsCard
      title="Total empleados"
      value={totalEmployees}
      icon={UsersIcon}
      bgColor="bg-yellow-800/10"
      iconColor="text-yellow-800"
      textColor="text-yellow-800"
    />
  </div>
);
