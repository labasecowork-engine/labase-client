import { CustomHeader } from "@/components/ui";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { GeneralSection } from "../components";
import { ROUTES } from "@/routes/routes";

export default function CreateSpacePage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Crear espacio - La base");
  }, [changeTitle]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <CustomHeader title="Crear Espacio" to={ROUTES.Admin.ViewSpaces} />
      <GeneralSection />
    </div>
  );
}
