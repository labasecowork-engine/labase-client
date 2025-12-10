import { VisitorForm } from "../components/visitor_form";
import { useTitle } from "@/hooks";
import { useEffect } from "react";

export default function CreateVisitorPage() {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle("Crear visitante - La base");
  }, [changeTitle]);

  return <VisitorForm />;
}
