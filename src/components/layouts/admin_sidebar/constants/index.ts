import { ROUTES } from "@/routes/routes";
import { Briefcase, Globe, LayoutDashboard, Users, Wrench } from "lucide-react";

export interface AdminNavItem {
  name: string;
  href: string;
  external?: boolean;
}

export interface AdminNavGroup {
  label: string;
  icon: React.ElementType;
  items: AdminNavItem[];
}

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    label: "Operación",
    icon: LayoutDashboard,
    items: [
      { name: "Reservas", href: ROUTES.Admin.ViewAllReservations },
      { name: "Planes", href: ROUTES.Admin.ViewPlans },
      { name: "Contratos", href: ROUTES.Admin.ViewContracts },
      { name: "Calendario", href: ROUTES.Admin.ViewCalendar },
      { name: "Espacios", href: ROUTES.Admin.ViewSpaces },
    ],
  },
  {
    label: "Personas",
    icon: Users,
    items: [
      { name: "Clientes", href: ROUTES.Admin.ViewClients },
      { name: "Visitantes", href: ROUTES.Admin.ViewVisitors },
      { name: "Asistencia", href: ROUTES.Admin.ViewClientAttendance },
    ],
  },
  {
    label: "Herramientas",
    icon: Wrench,
    items: [
      { name: "Estacionamiento", href: ROUTES.Admin.ViewParking },
      { name: "Lockers", href: ROUTES.Admin.ViewLockers },
      { name: "Recordatorios", href: ROUTES.Admin.ViewReminders },
      { name: "Inventario", href: ROUTES.Admin.ViewInventory },
    ],
  },
  {
    label: "Equipo",
    icon: Briefcase,
    items: [
      { name: "Miembros", href: ROUTES.Admin.ViewEmployees },
      { name: "Asistencias", href: ROUTES.Admin.ViewAttendances },
    ],
  },
  {
    label: "Página web",
    icon: Globe,
    items: [
      { name: "Enlace", href: "https://www.labase.pe", external: true },
      { name: "Administrar", href: "https://cms.labase.pe", external: true },
    ],
  },
];
