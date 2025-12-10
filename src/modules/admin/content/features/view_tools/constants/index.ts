import { ROUTES } from "@/routes/routes";
import {
  MailIcon,
  NewspaperIcon,
  Container,
  UserPlusIcon,
  BellIcon,
  MessageCircle,
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
    title: "Recordatorios",
    description:
      "Con esto podras gestionar los recordatorios en la página web.",
    icon: BellIcon,
    to: ROUTES.Admin.ViewReminders,
  },
  {
    title: "Mensajes",
    description: "Con esto podras comunicarte con todo el equipo.",
    icon: MessageCircle,
    to: ROUTES.Admin.ViewCommunication,
  },
];
