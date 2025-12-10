import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  valueToDelete: string;
  isPending: boolean;
}

export const DeleteDialog = ({
  isOpen,
  onClose,
  onDelete,
  valueToDelete,
  isPending,
}: DeleteDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar "{valueToDelete}"</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de querer eliminar "{valueToDelete}"? Esta acción no
            se puede deshacer, y todos los datos asociados a esta empresa se
            eliminarán.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onDelete} variant="destructive" disabled={isPending}>
            {isPending ? "Eliminando..." : "Confirmar eliminación"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
