import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { PlanForm } from "@/modules/admin/reservations/plans/components";

export default function CreatePlanPage() {
  const { changeTitle } = useTitle();
  const navigate = useNavigate();

  useEffect(() => {
    changeTitle("Nuevo plan - La base");
  }, [changeTitle]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <Link
        to={ROUTES.Admin.ViewPlans}
        className="mb-4 inline-flex items-center gap-1 text-sm text-stone-500 transition-colors hover:text-stone-800"
      >
        <ArrowLeft className="size-4" />
        Planes
      </Link>
      <h1 className="mb-6 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
        Crear nuevo plan
      </h1>
      <PlanForm onSuccess={() => navigate(ROUTES.Admin.ViewPlans)} />
    </div>
  );
}
