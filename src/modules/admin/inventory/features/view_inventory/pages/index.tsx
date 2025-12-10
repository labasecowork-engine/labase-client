import { AsyncBoundary, Pagination } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import { ProductsTable } from "../components/products_table";
import { ProductsGrid } from "../components/products_grid";
import { Header } from "../components/header";
import { getProductsRequest } from "../service";
import { EmptyState, ErrorState, LoadingState } from "../components";
import { useQuery } from "@tanstack/react-query";

export default function ViewInventoryPage() {
  const { changeTitle } = useTitle();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);
  const {
    data: dataProducts,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProductsRequest(page),
  });

  useEffect(() => {
    changeTitle("Gestionar inventario - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <Header
        totalProducts={dataProducts?.pagination.total || 0}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <main className="mt-8">
        <AsyncBoundary
          isLoading={isLoadingProducts}
          isError={!!errorProducts}
          data={dataProducts?.products || []}
          LoadingComponent={<LoadingState />}
          ErrorComponent={<ErrorState />}
          EmptyComponent={<EmptyState />}
        >
          {() =>
            viewMode === "list" ? (
              <>
                <ProductsTable products={dataProducts?.products || []} />
                <Pagination
                  page={page}
                  totalPages={dataProducts?.pagination.total_pages || 0}
                  onPageChange={setPage}
                />
              </>
            ) : (
              <>
                <ProductsGrid products={dataProducts?.products || []} />
                <Pagination
                  page={page}
                  totalPages={dataProducts?.pagination.total_pages || 0}
                  onPageChange={setPage}
                />
              </>
            )
          }
        </AsyncBoundary>
      </main>
    </div>
  );
}
