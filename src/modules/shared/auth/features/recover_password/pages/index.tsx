import { ROUTES } from "@/routes/routes";
import { useEffect } from "react";
import { useTitle } from "@/hooks";
import { Back, Header } from "../../../components";
import { Form } from "../components";

export default function RecoverPasswordPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Recuperar contraseña - La base");
  }, []);
  return (
    <div className="w-full">
      <Header
        title="Recuperar contraseña"
        description="Ingresa tu email y te enviaremos un código para recuperar tu cuenta"
      />
      <Form />
      <Back link={ROUTES.Auth.Login} text="Volver a iniciar sesión" />
    </div>
  );
}
