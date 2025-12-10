import { Button, CustomHeader } from "@/components/ui";
import { Save } from "lucide-react";
interface Props {
  isPending: boolean;
  isDirty: boolean;
}
export const Header = ({ isPending, isDirty }: Props) => (
  <div className="flex justify-between items-end">
    <CustomHeader title="Mi perfil" />
    <Button type="submit" disabled={isPending || !isDirty} className="min-w-32">
      <Save className="mr-2 h-4 w-4" />
      {isPending ? "Guardando..." : "Guardar cambios"}
    </Button>
  </div>
);
