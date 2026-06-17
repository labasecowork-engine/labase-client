import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AsyncBoundary } from "@/components/ui";
import { ArrowLeft } from "lucide-react";
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
      <Link
        to={ROUTES.Admin.ViewContract.replace(":id", id)}
        className="mb-4 inline-flex items-center gap-1 text-sm text-stone-500 transition-colors hover:text-stone-800"
      >
        <ArrowLeft className="size-4" />
        Detalle del contrato
      </Link>
      <h1 className="mb-6 font-serif text-2xl font-bold text-stone-900 sm:text-3xl">
        Editar contrato
      </h1>

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
