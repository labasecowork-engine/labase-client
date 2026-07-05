import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { PlanForm } from "@/modules/admin/reservations/plans/components";
import { CustomHeader } from "@/components/ui";

export default function CreatePlanPage() {
  const { changeTitle } = useTitle();
  const navigate = useNavigate();

  useEffect(() => {
    changeTitle("Nuevo plan - La base");
  }, [changeTitle]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CustomHeader
        title="Nuevo plan"
        to={ROUTES.Admin.ViewPlans}
        classNameTitle="mb-4"
      />
      <PlanForm onSuccess={() => navigate(ROUTES.Admin.ViewPlans)} />
    </div>
  );
}
