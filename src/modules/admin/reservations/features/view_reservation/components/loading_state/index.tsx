import { CustomHeader } from "@/components/ui/custom_header";
import { ROUTES } from "@/routes/routes";

export const LoadingState = () => (
  <>
    <CustomHeader title="Ver reserva" to={ROUTES.Admin.ViewAllReservations} />
    <div className="w-full animate-pulse bg-stone-50 h-[500px] mt-8 rounded-lg"></div>
  </>
);
