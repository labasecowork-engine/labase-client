import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { AsyncBoundary } from "@/components/ui";
import {
  CategoriesTable,
  EmptyState,
  ErrorState,
  Header,
  LoadingState,
} from "../components";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesRequest } from "../service";

export const ViewCategoriesPage = () => {
  const { changeTitle } = useTitle();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesRequest(),
  });

  useEffect(() => {
    changeTitle("Gestionar categorias - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <Header />

      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        data={data?.categories}
        EmptyComponent={<EmptyState />}
        ErrorComponent={<ErrorState />}
        LoadingComponent={<LoadingState />}
      >
        {(data) => <CategoriesTable categories={data} />}
      </AsyncBoundary>
    </div>
  );
};

export default ViewCategoriesPage;
