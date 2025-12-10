import { AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useParams } from "react-router-dom";
import { getSpaceByIdRequest } from "../../../features/edit_space/service";
import { useEffect } from "react";
import { ErrorState, LoadingState, Header, SpaceDetails } from "../components";
import { useQuery } from "@tanstack/react-query";

export default function ViewSpacePage() {
  const { id } = useParams<{ id: string }>();
  const { changeTitle } = useTitle();

  const {
    data,
    isError,
    isPending: isLoading,
  } = useQuery({
    queryKey: ["space", id],
    queryFn: () => getSpaceByIdRequest(id || ""),
    enabled: !!id,
  });

  useEffect(() => {
    changeTitle("Ver espacio - La base");
  }, [changeTitle, data]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Header
        name={data?.name || ""}
        isLoading={isLoading}
        id={id || ""}
        disabled={data?.disabled || false}
      />

      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        data={data}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
      >
        {(data) => <SpaceDetails {...(data || data)} />}
      </AsyncBoundary>
    </div>
  );
}
