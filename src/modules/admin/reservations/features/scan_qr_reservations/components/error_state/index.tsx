import { CustomHeader } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes/routes";
import { CameraIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  requestPermission: () => void;
}
export const ErrorState = ({ requestPermission }: Props) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(ROUTES.Admin.ViewAllReservations);
  };
  return (
    <div className="px-4 py-8 h-full w-full max-w-5xl mx-auto">
      <CustomHeader
        title="Escanear código QR"
        to={ROUTES.Admin.ViewAllReservations}
      />
      <div className="flex h-full w-full items-center rounded-lg justify-center bg-rose-500/10 mx-auto max-w-5xl p-8 sm:p-24 mt-8">
        <div className="text-center mx-auto max-w-md">
          <h1 className="text-lg sm:text-2xl font-serif text-rose-800 font-bold">
            No tienes acceso a la cámara
          </h1>
          <p className="text-xs sm:text-sm text-rose-700 mt-0 sm:mt-2">
            Tienes que permitir el acceso a la cámara en tu navegador para poder
            escanear los códigos QR, o bien, intenta con otro navegador.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            <Button
              onClick={handleBack}
              className=" text-rose-800 text-xs sm:text-sm shadow-none border border-rose-500/30 bg-transparent hover:bg-rose-500/20 w-full sm:w-auto"
            >
              Volver atrás
            </Button>
            <Button
              onClick={requestPermission}
              className="bg-rose-500/10 text-rose-800 text-xs sm:text-sm shadow-none hover:bg-rose-500/20 w-full sm:w-auto"
            >
              <CameraIcon className="w-4 h-4" />
              Permitir acceso
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
