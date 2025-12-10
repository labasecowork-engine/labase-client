import { useQuery } from "@tanstack/react-query";
import { ErrorState, LoadingState, EmptyState, ReminderCard } from "../";
import { getReminders } from "../../services";
import { useState } from "react";
import {
  AsyncBoundary,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Pagination,
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui";
import { useDebounce } from "@/hooks";

export const RemindersList = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [status, setStatus] = useState("active");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reminders", page, debouncedSearch, status],
    queryFn: () => getReminders(page, debouncedSearch, status),
  });

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Criterios de búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <div className="w-full">
              <Label className="mb-2 block">Buscador</Label>
              <Input
                placeholder="Buscar recordatorio"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-[200px]">
              <Label className="mb-2 block">Estado</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        data={data?.reminders || []}
        LoadingComponent={<LoadingState />}
        ErrorComponent={<ErrorState />}
        EmptyComponent={<EmptyState />}
      >
        {() => (
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data?.reminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                title={reminder.name}
                contact={reminder.phone_number}
                frequency={reminder.frequency}
                send_date={reminder.send_date}
                id={reminder.id}
                is_active={reminder.is_active}
              />
            ))}
          </div>
        )}
      </AsyncBoundary>
      <Pagination
        page={page}
        totalPages={data?.pagination.total_pages || 0}
        onPageChange={setPage}
      />
    </>
  );
};
