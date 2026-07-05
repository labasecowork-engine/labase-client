import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AsyncBoundary, CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import {
  ContractForm,
  TableError,
  TableLoading,
} from "@/modules/admin/contracts/components";
import { useContract, usePlans } from "@/modules/admin/contracts/hooks";

export default function EditContractPage() {
  const { id = "" } = useParams<{ id: string }>();
  const { changeTitle } = useTitle();
  const navigate = useNavigate();
  const contractQuery = useContract(id);
  const { data: plans = [] } = usePlans();

  useEffect(() => {
    changeTitle("Editar contrato - La base");
  }, [changeTitle]);

  const backToDetail = () =>
    navigate(ROUTES.Admin.ViewContract.replace(":id", id));

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <CustomHeader
        title="Nuevo contrato"
        classNameTitle="mb-4"
        to={ROUTES.Admin.ViewContract.replace(":id", id)}
      />

      <AsyncBoundary
        isLoading={contractQuery.isLoading}
        isError={contractQuery.isError}
        data={contractQuery.data}
        LoadingComponent={<TableLoading />}
        ErrorComponent={<TableError />}
      >
        {(contract) => (
          <ContractForm
            planSuggestions={plans}
            initialContract={contract}
            onSuccess={backToDetail}
          />
        )}
      </AsyncBoundary>
    </div>
  );
}
