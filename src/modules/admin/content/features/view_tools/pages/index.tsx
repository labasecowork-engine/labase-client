import { CardNavigation, CustomHeader } from "@/components/ui";
import { actions } from "../constants";
import { useTitle } from "@/hooks";
import { useEffect } from "react";

export default function ViewToolsPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Herramientas - La base");
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-8">
      <CustomHeader title="Herramientas" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 mt-4">
        {actions.map((action) => (
          <CardNavigation
            key={action.title}
            to={action.to}
            title={action.title}
            description={action.description}
            icon={action.icon}
          />
        ))}
      </div>
    </div>
  );
}
