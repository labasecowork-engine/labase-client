import { CustomHeader } from "@/components/ui";
import { ROUTES } from "@/routes/routes";

export const LoadingState = () => {
  return (
    <div className="mx-auto max-w-4xl w-full px-4 mt-8">
      <CustomHeader title="Editar empleado" to={ROUTES.Admin.ViewEmployees} />
      <div className="w-full h-[600px] mt-8 bg-stone-50 animate-pulse rounded-lg"></div>
    </div>
  );
};
