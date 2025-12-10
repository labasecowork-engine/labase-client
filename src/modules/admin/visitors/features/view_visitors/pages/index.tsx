import {
  CustomHeader,
  Button,
  AsyncBoundary,
  Pagination,
} from "@/components/ui";
import {
  EmptyState,
  ErrorState,
  FiltersPanel,
  LoadingState,
  VisitorsTable,
} from "../components";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useDebounce, useTitle } from "@/hooks";
import { useEffect, useState } from "react";
import { ROUTES } from "@/routes/routes";
import { useQuery } from "@tanstack/react-query";
import { getVisitors } from "../services";
import { getSpacesRequest, getUsers } from "@/services";
import type { DateRange } from "react-day-picker";

export default function ViewVisitorsPage() {
  const { changeTitle } = useTitle();
  const [search, setSearch] = useState("");
  const [spaceId, setSpaceId] = useState<string | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const debouncedSearch = useDebounce(search, 500);
  const {
    data: spacesData,
    isLoading: isLoadingSpaces,
    isError: isErrorSpaces,
  } = useQuery({
    queryKey: ["spaces"],
    queryFn: () => getSpacesRequest(),
  });
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["visitors", page, debouncedSearch, spaceId, dateRange, userId],
    queryFn: () =>
      getVisitors(page, debouncedSearch, spaceId, dateRange, userId),
  });

  useEffect(() => {
    changeTitle("Visitantes - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-4 mb-8">
        <CustomHeader to={ROUTES.Admin.ViewTools} title="Visitantes" />
        <div className="flex items-center gap-2">
          <Link to={ROUTES.Admin.CreateVisitor}>
            <Button>
              <PlusIcon className="w-4 h-4" />
              Nuevo visitante
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <FiltersPanel
          selectedUserId={userId}
          users={usersData?.users || []}
          isLoadingUsers={isLoadingUsers}
          isErrorUsers={isErrorUsers}
          onUserIdChange={(value: string | undefined) => setUserId(value)}
          searchTerm={search}
          selectedSpaceId={spaceId}
          spaces={spacesData || []}
          isErrorSpaces={isErrorSpaces}
          isLoadingSpaces={isLoadingSpaces}
          onSearchChange={(value: string) => setSearch(value)}
          onSpaceChange={(value: string | undefined) => setSpaceId(value)}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          clearDateRange={() => setDateRange(undefined)}
        />
        <AsyncBoundary
          isLoading={isLoading}
          isError={isError}
          data={data?.visitors}
          EmptyComponent={<EmptyState />}
          LoadingComponent={<LoadingState />}
          ErrorComponent={<ErrorState />}
        >
          {(data) => <VisitorsTable visitors={data} />}
        </AsyncBoundary>
        <Pagination
          page={page}
          totalPages={data?.pagination.total_pages || 0}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
