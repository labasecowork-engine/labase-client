import { CustomHeader, LoaderSplash } from "@/components/ui";
import { useCameraAccess, useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resolveReservationRequest } from "../service";
import { useMutation } from "@tanstack/react-query";
import type {
  AdminApiResponse,
  AdminResolveReservationResponse,
} from "../types";
import { CameraFocus, ErrorState } from "../components";
import { toast } from "sonner";
import { containerStyles, videoStyles } from "../constants";

export default function ScanQRReservationsPage() {
  const { changeTitle } = useTitle();
  const navigate = useNavigate();
  const { hasAccess, requestPermission } = useCameraAccess();
  const mutation = useMutation({
    mutationFn: (code: string) => resolveReservationRequest(code),
    onSuccess: (data) => onSuccess(data),
    onError: () => onError(),
  });

  const onSuccess = (data: AdminResolveReservationResponse) => {
    const reservationData: AdminApiResponse = {
      status: 200,
      message: "Reserva encontrada exitosamente",
      description: "",
      timestamp: new Date().toISOString(),
      path: "/reservations/resolve",
      data: data,
    };
    const route = `${ROUTES.Admin.ViewDetailsReservation.replace(
      ":id",
      data.reservation.id
    )}`;

    navigate(route, {
      state: reservationData,
    });
  };

  const onError = () => {
    toast.error("Error al escanear el código", {
      description: "Posiblemente el código no es válido, vuelve a intentarlo.",
    });
  };
  const handleScan = (result: IDetectedBarcode[]) => {
    if (result.length > 0 && result[0]?.rawValue && !mutation.isPending) {
      mutation.mutate(result[0].rawValue);
    }
  };

  useEffect(() => {
    changeTitle("Escanear código QR - La base");
  }, [changeTitle]);

  if (mutation.isPending) {
    return <LoaderSplash />;
  }

  if (!hasAccess) {
    return <ErrorState requestPermission={requestPermission} />;
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="absolute top-0 left-0 z-10 w-full">
        <div className=" mb-6 max-w-4xl mx-auto w-full mt-8 px-4">
          <CustomHeader
            title="Escanear código QR"
            to={ROUTES.Admin.ViewAllReservations}
            classNameTitle="text-white"
            classNameLink="bg-stone-50/10 text-white hover:bg-stone-50/20"
          />
        </div>
      </div>

      <div className=" h-full w-full relative">
        <Scanner
          components={{
            finder: false,
          }}
          styles={{
            container: containerStyles,
            video: videoStyles,
          }}
          onScan={handleScan}
        >
          <CameraFocus />
        </Scanner>
      </div>
    </div>
  );
}
