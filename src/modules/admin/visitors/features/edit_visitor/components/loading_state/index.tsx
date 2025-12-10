import { CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";

export const LoadingState = () => {
  return (
    <>
      <CustomHeader title="Editar visitante" to={ROUTES.Admin.ViewVisitors} />
      <div className="w-full h-[600px] bg-stone-50 animate-pulse mt-8 rounded-lg"></div>
    </>
  );
};
