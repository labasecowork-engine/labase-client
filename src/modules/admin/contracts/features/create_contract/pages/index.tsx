import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { ContractForm } from "@/modules/admin/contracts/components";
import { usePlans } from "@/modules/admin/contracts/hooks";
import { CustomHeader } from "@/components/ui";

export default function CreateContractPage() {
  const { changeTitle } = useTitle();
  const navigate = useNavigate();
  const { data: plans = [] } = usePlans();

  useEffect(() => {
    changeTitle("Nuevo contrato - La base");
  }, [changeTitle]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CustomHeader
        title="Nuevo contrato"
        classNameTitle="mb-4"
        to={ROUTES.Admin.ViewContracts}
      />
      <ContractForm
        planSuggestions={plans}
        onSuccess={() => navigate(ROUTES.Admin.ViewContracts)}
      />
    </div>
  );
}
