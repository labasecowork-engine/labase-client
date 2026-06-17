import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { ContractForm } from "@/modules/admin/contracts/components";
import { usePlans } from "@/modules/admin/contracts/hooks";

export default function CreateContractPage() {
  const { changeTitle } = useTitle();
  const navigate = useNavigate();
  const { data: plans = [] } = usePlans();

  useEffect(() => {
    changeTitle("Nuevo contrato - La base");
  }, [changeTitle]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <Link
        to={ROUTES.Admin.ViewContracts}
        className="mb-4 inline-flex items-center gap-1 text-sm text-stone-500 transition-colors hover:text-stone-800"
      >
        <ArrowLeft className="size-4" />
        Contratos
      </Link>
      <h1 className="mb-6 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
        Nuevo contrato
      </h1>
      <ContractForm
        planSuggestions={plans}
        onSuccess={() => navigate(ROUTES.Admin.ViewContracts)}
      />
    </div>
  );
}
