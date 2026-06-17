import { useEffect, useMemo, useState } from "react";
import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { RegisterForm, SpacesPanel } from "../components";
import { ExitDialog } from "../../../components";
import { useSpaces } from "../../../hooks";
import type { ExitTarget } from "../../../types";

export default function RegisterParkingPage() {
  const { changeTitle } = useTitle();
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | undefined>(
    undefined
  );
  const [exitTarget, setExitTarget] = useState<ExitTarget | null>(null);
  const [exitOpen, setExitOpen] = useState(false);

  const spacesQuery = useSpaces();

  useEffect(() => {
    changeTitle("Registrar ingreso - La base");
  }, [changeTitle]);

  const freeSpaces = useMemo(
    () => (spacesQuery.data ?? []).filter((s) => s.status === "free"),
    [spacesQuery.data]
  );

  const handleExit = (target: ExitTarget) => {
    setExitTarget(target);
    setExitOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6">
        <CustomHeader
          to={ROUTES.Admin.ViewParking}
          title="Registrar ingreso"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RegisterForm
            freeSpaces={freeSpaces}
            preselectedSpaceId={selectedSpaceId}
            onReset={() => setSelectedSpaceId(undefined)}
          />
        </div>
        <SpacesPanel
          spaces={spacesQuery.data}
          isLoading={spacesQuery.isLoading}
          isError={spacesQuery.isError}
          selectedSpaceId={selectedSpaceId}
          onSelectFree={setSelectedSpaceId}
          onExit={handleExit}
        />
      </div>

      <ExitDialog open={exitOpen} onOpenChange={setExitOpen} target={exitTarget} />
    </div>
  );
}
