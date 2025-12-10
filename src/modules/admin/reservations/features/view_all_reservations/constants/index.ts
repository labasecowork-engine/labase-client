import { ROUTES } from "@/routes/routes";
import { QrCodeIcon } from "lucide-react";
import { Building2Icon } from "lucide-react";

export const actions = [
  {
    title: "Escanear un código QR",
    description: "Con esto podras confirmar la reserva de un cliente.",
    icon: QrCodeIcon,
    to: ROUTES.Admin.ScanCodeQRReservation,
  },
  {
    title: "Gestionar espacios",
    description:
      "Crear, editar, desactivar espacios, todo para gestionar los espacios.",
    icon: Building2Icon,
    to: ROUTES.Admin.ViewSpaces,
  },
];
