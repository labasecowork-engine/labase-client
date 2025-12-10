import { useLocation } from "react-router-dom";
import { useTitle } from "@/hooks";
import { useEffect } from "react";
import { Header, InvalidProcess } from "../../../components";
import { Form } from "../components";

export default function VerifyAccountPage() {
  const location = useLocation();
  const email = location.state?.email;
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Verificar cuenta - La base");
  }, []);

  if (!email) {
    return <InvalidProcess />;
  }

  return (
    <div className="w-full">
      <Header
        title="Verificar cuenta"
        description={`Hemos enviado un código de 4 dígitos a tu correo electrónico ${email}`}
      />

      <Form email={email} />
    </div>
  );
}
