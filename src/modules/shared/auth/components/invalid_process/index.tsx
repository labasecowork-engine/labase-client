import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";

export const InvalidProcess = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Error</h1>
        <p className="text-stone-600">
          Información inválida. Por favor, inicia el proceso de recuperación de
          nuevo.
        </p>
      </div>
      <Button
        onClick={() => navigate(ROUTES.Auth.RecoverPassword)}
        className="w-full h-12 bg-stone-500 hover:bg-stone-500/90 text-white font-semibold rounded-lg transition-all duration-200"
      >
        Recuperar contraseña
      </Button>
    </div>
  );
};
