import { CustomHeader } from "@/components/ui/custom_header";
import { ROUTES } from "@/routes/routes";

export const LoadingState = () => {
  return (
    <div className="mx-auto max-w-4xl w-full px-4 mt-8">
      <CustomHeader
        title="Editar recordatorio"
        to={ROUTES.Admin.ViewReminders}
      />
      <div className="w-full h-[600px] bg-stone-50 animate-pulse mt-8 rounded-lg"></div>
    </div>
  );
};
