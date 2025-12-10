import { ROUTES } from "@/routes/routes";
import { useEffect } from "react";
import { useTitle } from "@/hooks";
import { Footer, Header } from "../../../components";
import { Form } from "../components";

export default function RegisterPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Crear cuenta - La base");
  }, []);
  return (
    <div className="w-full">
      <Header
        title="Crear cuenta"
        description="Completa los siguientes campos para empezar a usar la plataforma."
      />

      <Form />

      <Footer
        link={ROUTES.Auth.Login}
        text="Iniciar sesión"
        description="¿Ya tienes una cuenta?"
      />
    </div>
  );
}
