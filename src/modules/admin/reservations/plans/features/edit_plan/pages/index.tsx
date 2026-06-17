import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AsyncBoundary } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import {
  PlanForm,
  TableError,
  TableLoading,
} from "@/modules/admin/reservations/plans/components";
import { usePlan } from "@/modules/admin/reservations/plans/hooks";

export default function EditPlanPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { changeTitle } = useTitle();
  const navigate = useNavigate();
  const planQuery = usePlan(id);

  useEffect(() => {
    changeTitle("Editar plan - La base");
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
        Editar plan
      </h1>

      <AsyncBoundary
        isLoading={planQuery.isLoading}
        isError={planQuery.isError}
        data={planQuery.data}
        LoadingComponent={<TableLoading />}
        ErrorComponent={<TableError />}
      >
        {(plan) => (
          <PlanForm
            initialPlan={plan}
            onSuccess={() => navigate(ROUTES.Admin.ViewPlans)}
          />
        )}
      </AsyncBoundary>
    </div>
  );
}
