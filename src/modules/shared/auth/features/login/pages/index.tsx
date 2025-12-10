import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { Footer, Header } from "../../../components";
import { Form } from "../components";
import { ROUTES } from "@/routes/routes";

export default function LoginPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Ingresar - La base");
  }, []);
  return (
    <div className="w-full">
      <Header
        title="Ingresar a tu cuenta"
        description="Ingresa tu correo electrónico y contraseña para continuar."
      />

      <Form />

      <Footer
        link={ROUTES.Auth.Register}
        text="Registrarse"
        description="¿No tienes una cuenta?"
      />
    </div>
  );
}
