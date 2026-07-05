import { PlanCard } from "../plan_card";
import type { Plan } from "../../types";

interface Props {
  plans: Plan[];
  onDelete: (plan: Plan) => void;
}

export const PlansGrid = ({ plans, onDelete }: Props) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4 lg:grid-cols-3">
    {plans.map((plan) => (
      <PlanCard key={plan.id} plan={plan} onDelete={onDelete} />
    ))}
  </div>
);
