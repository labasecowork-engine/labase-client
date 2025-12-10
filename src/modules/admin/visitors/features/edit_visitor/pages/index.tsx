import { VisitorForm } from "../components/visitor_form";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVisitorDetails } from "../services";
import { useQuery } from "@tanstack/react-query";
import { AsyncBoundary } from "@/components/ui";
import { ErrorState, LoadingState } from "../components";

export default function EditVisitorPage() {
  const { changeTitle } = useTitle();
  const { id } = useParams<{ id: string }>();
  const {
    data: visitor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["visitor", id],
    queryFn: () => getVisitorDetails(id || ""),
    enabled: !!id,
  });

  useEffect(() => {
    changeTitle("Editar visitante - La base");
  }, [changeTitle]);

  return (
    <AsyncBoundary
      isLoading={isLoading}
      isError={isError}
      data={visitor}
      LoadingComponent={<LoadingState />}
      ErrorComponent={<ErrorState />}
    >
      {(data) => <VisitorForm defaultValues={data} />}
    </AsyncBoundary>
  );
}
