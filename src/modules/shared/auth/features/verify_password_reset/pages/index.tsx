import { useLocation } from "react-router-dom";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { Form } from "../components";
import { Header, InvalidProcess } from "../../../components";

export default function VerifyPasswordResetPage() {
  const location = useLocation();
  const email = location.state?.email;
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Verificar código - La base");
  }, []);

  if (!email) {
    return <InvalidProcess />;
  }

  return (
    <div className="w-full">
      <Header
        title="Verificar código"
        description={`Hemos enviado un código de 4 dígitos a tu correo electrónico ${email}`}
      />

      <Form email={email} />
    </div>
  );
}
