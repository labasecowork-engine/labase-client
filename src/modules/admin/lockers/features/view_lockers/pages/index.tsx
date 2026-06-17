import { useEffect, useMemo, useState } from "react";
import { AsyncBoundary, Button, CustomHeader } from "@/components/ui";
import { KeyRound, LayoutGrid, List } from "lucide-react";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import {
  AssignLockerDialog,
  AssignmentsTable,
  DeliveriesTable,
  LockerMap,
  SegmentedControl,
  StatsCards,
  TableEmpty,
  TableError,
  TableLoading,
} from "../components";
import { useLockers } from "../hooks";

// Vista activa de la página: el mapa de lockers o los registros (tablas).
type LockerView = "map" | "records";
// Tabla activa dentro de la vista de registros.
type LockerSection = "deliveries" | "assignments";

export default function ViewLockersPage() {
  const { changeTitle } = useTitle();
  const { lockersQuery, statsQuery, deliveriesQuery, assignmentsQuery } =
    useLockers();

  const [view, setView] = useState<LockerView>("map");
  const [section, setSection] = useState<LockerSection>("deliveries");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [preselectedLocker, setPreselectedLocker] = useState<number | null>(
    null
  );

  useEffect(() => {
    changeTitle("Control de Lockers - La base");
  }, [changeTitle]);

  const freeLockers = useMemo(
    () => (lockersQuery.data ?? []).filter((l) => l.status === "free"),
    [lockersQuery.data]
  );

  const openDialog = (lockerNumber: number | null) => {
    setPreselectedLocker(lockerNumber);
    setDialogOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <CustomHeader to={ROUTES.Admin.ViewTools} title="Control de Lockers" />
        <Button onClick={() => openDialog(null)}>
          <KeyRound className="size-4" />
          Entregar llave
        </Button>
      </div>

      <div className="space-y-6">
        {/* Cambio de vista a todo el ancho: una sola zona densa a la vez */}
        <SegmentedControl
          value={view}
          onChange={setView}
          fullWidth
          options={[
            {
              value: "map",
              label: "Mapa",
              icon: <LayoutGrid className="size-4" />,
            },
            {
              value: "records",
              label: "Registros",
              icon: <List className="size-4" />,
            },
          ]}
        />

        <StatsCards stats={statsQuery.data} isLoading={statsQuery.isLoading} />

        {view === "map" ? (
          <LockerMap
            lockers={lockersQuery.data}
            isLoading={lockersQuery.isLoading}
            isError={lockersQuery.isError}
            onSelectFree={openDialog}
          />
        ) : (
          <section className="rounded-lg bg-stone-50 p-5">
            <div className="mb-4">
              <SegmentedControl
                value={section}
                onChange={setSection}
                options={[
                  {
                    value: "deliveries",
                    label: "Entregas activas",
                    count: deliveriesQuery.data?.length,
                  },
                  {
                    value: "assignments",
                    label: "Por reserva",
                    count: assignmentsQuery.data?.length,
                  },
                ]}
              />
            </div>

            {section === "deliveries" ? (
              <AsyncBoundary
                isLoading={deliveriesQuery.isLoading}
                isError={deliveriesQuery.isError}
                data={deliveriesQuery.data}
                LoadingComponent={<TableLoading />}
                ErrorComponent={<TableError />}
                EmptyComponent={
                  <TableEmpty
                    title="Sin entregas activas"
                    description="Cuando entregues una llave aparecerá aquí hasta que sea devuelta."
                  />
                }
              >
                {(deliveries) => <DeliveriesTable deliveries={deliveries} />}
              </AsyncBoundary>
            ) : (
              <AsyncBoundary
                isLoading={assignmentsQuery.isLoading}
                isError={assignmentsQuery.isError}
                data={assignmentsQuery.data}
                LoadingComponent={<TableLoading />}
                ErrorComponent={<TableError />}
                EmptyComponent={
                  <TableEmpty
                    title="Sin asignaciones"
                    description="Las reservas y contratos con locker asignado aparecerán aquí."
                  />
                }
              >
                {(assignments) => <AssignmentsTable assignments={assignments} />}
              </AsyncBoundary>
            )}
          </section>
        )}
      </div>

      <AssignLockerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        freeLockers={freeLockers}
        preselectedLocker={preselectedLocker}
      />
    </div>
  );
}
