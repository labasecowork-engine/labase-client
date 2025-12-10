import { Button, CustomHeader } from "@/components/ui";
import { Link } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useTitle } from "@/hooks";
import { RemindersList } from "../components";

export default function ViewRemindersPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Recordatorios - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between gap-4 mb-8">
        <CustomHeader to={ROUTES.Admin.ViewTools} title="Recordatorios" />
        <div className="flex items-center gap-2">
          <Link to={ROUTES.Admin.CreateReminder}>
            <Button>
              <PlusIcon className="w-4 h-4" />
              Nuevo recordatorio
            </Button>
          </Link>
        </div>
      </div>
      <RemindersList />
    </div>
  );
}
