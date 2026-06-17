import { useEffect } from "react";
import { Clock } from "lucide-react";
import { CustomHeader, StatusMessage } from "@/components/ui";
import { useTitle } from "@/hooks";

interface Props {
  title: string;
  description?: string;
}

export default function ComingSoonPage({ title, description }: Props) {
  const { changeTitle } = useTitle();

  useEffect(() => {
    changeTitle(`${title} - La base`);
  }, [title]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-8">
      <CustomHeader title={title} />

      <div className="mt-8">
        <StatusMessage
          icon={Clock}
          color="stone"
          title="Próximamente"
          description={
            description ??
            "Esta sección está en construcción y estará disponible muy pronto."
          }
        />
      </div>
    </div>
  );
}
