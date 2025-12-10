import { useTitle } from "@/hooks";
import type { ArticlesResponse } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getArticlesRequest } from "../service";
import { getCategoriesRequest } from "@/modules/admin/articles_categories/features/view_categories/service";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use_debounce";
import { EmptyState, ErrorState, LoadingState } from "../components";
import { ArticlesTable } from "../components/articles_table";
import { AsyncBoundary, Pagination } from "@/components/ui";
import { ArticleFilters } from "../components/article_filters";
import { Header } from "../components/header";
import type { CategoriesResponse } from "@/modules/admin/articles_categories/features/view_categories/types";

export default function ViewArticlesPage() {
  const { changeTitle } = useTitle();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  const debouncedSearch = useDebounce(search, 500);

  const { data: articlesResponse, isLoading: isLoadingArticles } =
    useQuery<ArticlesResponse>({
      queryKey: ["articles", page, debouncedSearch, categoryId],
      queryFn: () => getArticlesRequest(page, debouncedSearch, categoryId),
    });

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery<CategoriesResponse>({
    queryKey: ["categories"],
    queryFn: () => getCategoriesRequest(),
  });

  const isLoading = isLoadingArticles || isLoadingCategories;

  useEffect(() => {
    changeTitle("Gestionar artículos - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <Header />

      <ArticleFilters
        searchTerm={search}
        selectedCategoryId={categoryId || undefined}
        categories={categoriesData?.categories || []}
        isLoadingCategories={isLoadingCategories}
        isErrorCategories={isErrorCategories}
        onSearchChange={setSearch}
        onCategoryChange={setCategoryId}
      />

      <AsyncBoundary
        isLoading={isLoading}
        isError={!articlesResponse || !categoriesData}
        data={articlesResponse?.data?.articles || []}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
        EmptyComponent={<EmptyState />}
      >
        {() => (
          <>
            <ArticlesTable articles={articlesResponse?.data?.articles || []} />
            <Pagination
              page={articlesResponse?.data?.pagination.page || 1}
              totalPages={articlesResponse?.data?.pagination.total_pages || 1}
              onPageChange={setPage}
            />
          </>
        )}
      </AsyncBoundary>
    </div>
  );
}
