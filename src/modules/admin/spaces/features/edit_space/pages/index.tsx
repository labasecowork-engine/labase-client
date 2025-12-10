import { CustomHeader, AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { getSpaceByIdRequest } from "../service";
import { ErrorState, GeneralSection, LoadingState } from "../components";
import { useQuery } from "@tanstack/react-query";

export default function EditSpacePage() {
  const { id } = useParams<{ id: string }>();
  const { changeTitle } = useTitle();

  const {
    data: spaceResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["space", id],
    queryFn: () => getSpaceByIdRequest(id || ""),
    enabled: !!id,
  });

  useEffect(() => {
    changeTitle("Editar Espacio - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader title="Editar Espacio" to={ROUTES.Admin.ViewSpaces} />

      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        data={spaceResponse}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
      >
        {(data) => <GeneralSection id={id || ""} defaultValues={data} />}
      </AsyncBoundary>
    </div>
  );
}
