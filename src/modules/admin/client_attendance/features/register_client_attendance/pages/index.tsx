import { useEffect, useState } from "react";
import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { ExitDialog, PresentPanel, RegisterForm } from "../components";
import { usePresent } from "../../../hooks";
import type { ExitTarget } from "../../../types";

export default function RegisterClientAttendancePage() {
  const { changeTitle } = useTitle();
  const [exitTarget, setExitTarget] = useState<ExitTarget | null>(null);
  const [exitOpen, setExitOpen] = useState(false);

  const presentQuery = usePresent();

  useEffect(() => {
    changeTitle("Registrar asistencia - La base");
  }, [changeTitle]);

  const handleExit = (target: ExitTarget) => {
    setExitTarget(target);
    setExitOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6">
        <CustomHeader
          to={ROUTES.Admin.ViewClientAttendance}
          title="Registrar asistencia"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RegisterForm />
        </div>
        <PresentPanel
          present={presentQuery.data}
          isLoading={presentQuery.isLoading}
          isError={presentQuery.isError}
          onExit={handleExit}
        />
      </div>

      <ExitDialog open={exitOpen} onOpenChange={setExitOpen} target={exitTarget} />
    </div>
  );
}
