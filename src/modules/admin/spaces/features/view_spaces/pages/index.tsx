import { AsyncBoundary } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { Header, LoadingState, ErrorState, SpacesTable } from "../components/";
import { useQuery } from "@tanstack/react-query";
import { getSpacesRequest } from "@/services";

export default function ViewSpacesPage() {
  const { changeTitle } = useTitle();
  const { data, isPending, isError } = useQuery({
    queryKey: ["spaces"],
    queryFn: () => getSpacesRequest(),
  });

  useEffect(() => {
    changeTitle("Gestionar espacios - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <Header />

      <AsyncBoundary
        isLoading={isPending}
        isError={isError}
        data={data}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
      >
        {(data) => <SpacesTable spaces={data || []} />}
      </AsyncBoundary>
    </div>
  );
}
