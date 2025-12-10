import { ROUTES } from "@/routes/routes";
import { Clock } from "lucide-react";

export const actions = [
  {
    title: "Ver asistencia",
    description: "Con esto podras ver la asistencia de los empleados.",
    icon: Clock,
    to: ROUTES.Admin.ViewAttendances,
  },
];
