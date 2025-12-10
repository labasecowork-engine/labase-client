import { useLocation } from "react-router-dom";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { Header, InvalidProcess } from "../../../components";
import { Form } from "../components";

export default function ChangePasswordPage() {
  const location = useLocation();
  const email = location.state?.email;
  const code = location.state?.code;
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Crear nueva contraseña - La base");
  }, []);

  if (!email || !code) {
    return <InvalidProcess />;
  }

  return (
    <div className="w-full">
      <Header
        title="Crear nueva contraseña"
        description="Tu nueva contraseña debe ser diferente a las anteriores"
      />

      <Form email={email} />
    </div>
  );
}
