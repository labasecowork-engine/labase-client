import { ROUTES } from "@/routes/routes";
import {
  MailIcon,
  NewspaperIcon,
  Container,
  UserPlusIcon,
  BellIcon,
  LockIcon,
  CarIcon,
  UserCheck,
} from "lucide-react";

export const actions = [
  {
    title: "Gestionar articulos",
    description: "Con esto podras gestionar los articulos en la página web.",
    icon: NewspaperIcon,
    to: ROUTES.Admin.ViewArticles,
  },
  {
    title: "Newsletter",
    description: "Con esto podras enviar un newsletter a todos los clientes.",
    icon: MailIcon,
    to: ROUTES.Admin.SendNewsletter,
  },
  {
    title: "Gestionar inventario",
    description: "Con esto podras gestionar los inventarios en la página web.",
    icon: Container,
    to: ROUTES.Admin.ViewInventory,
  },
  {
    title: "Nuevos visitantes",
    description: "Con esto podras gestionar los visitantes de los espacios.",
    icon: UserPlusIcon,
    to: ROUTES.Admin.ViewVisitors,
  },
  {
    title: "Lockers",
    description:
      "Con esto podras controlar los lockers, entregas de llave y asignaciones por reserva.",
    icon: LockIcon,
    to: ROUTES.Admin.ViewLockers,
  },
  {
    title: "Estacionamiento",
    description:
      "Con esto podras controlar el ingreso y salida de vehículos por espacio.",
    icon: CarIcon,
    to: ROUTES.Admin.ViewParking,
  },
  {
    title: "Asistencia de Clientes",
    description:
      "Con esto podras controlar el ingreso y salida de clientes por contrato o reserva.",
    icon: UserCheck,
    to: ROUTES.Admin.ViewClientAttendance,
  },
  {
    title: "Recordatorios",
    description:
      "Con esto podras gestionar los recordatorios en la página web.",
    icon: BellIcon,
    to: ROUTES.Admin.ViewReminders,
  },
];
