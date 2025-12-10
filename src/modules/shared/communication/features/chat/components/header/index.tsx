import { CustomHeader } from "@/components/ui/custom_header";
import { ROUTES } from "@/routes/routes";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("admin")) {
      setIsAdmin(true);
    }
  }, []);
  return (
    <div className="mb-8 flex items-end justify-between">
      <div>
        {isAdmin ? (
          <CustomHeader
            to={ROUTES.Admin.ViewTools}
            title="Conversación Grupal"
          />
        ) : (
          <CustomHeader title="Conversación Grupal" />
        )}
        <p className="text-sm text-stone-500">22 usuarios en el equipo</p>
      </div>
    </div>
  );
};
