import { CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";

export const LoadingState = () => (
  <div className="px-4 py-10 w-full mx-auto max-w-5xl">
    <CustomHeader title="Ver reserva" to={ROUTES.Client.ViewReservations} />
    <div className="w-full animate-pulse bg-stone-50 h-[500px] mt-8 rounded-lg"></div>
  </div>
);
