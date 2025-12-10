import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
} from "@/components/ui";
import { cancelReservationRequest } from "../../service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  reservationId: string;
  spaceName: string;
}

export const CancelReservationDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  reservationId,
  spaceName,
}) => {
  const [reason, setReason] = useState("");
  const queryClient = useQueryClient();

  const { mutate: cancelReservation, isPending } = useMutation({
    mutationFn: (reason: string) => cancelReservationRequest(reservationId, reason),
    onSuccess: () => {
      toast.success("Reserva cancelada exitosamente", {
        description: `La reserva del espacio "${spaceName}" ha sido cancelada.`,
      });
      queryClient.invalidateQueries({ queryKey: ["myReservations"] });
      onClose();
      setReason("");
    },
    onError: (error: Error) => {
      toast.error("Error al cancelar la reserva", {
        description: error.message || "Ha ocurrido un error inesperado.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      toast.error("Razón requerida", {
        description: "Por favor, proporciona una razón para la cancelación.",
      });
      return;
    }

    cancelReservation(reason.trim());
  };

  const handleClose = () => {
    onClose();
    setReason("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancelar reserva</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas cancelar la reserva del espacio "{spaceName}"?
            Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="reason"
              type="text"
              placeholder="Escribe la razón de la cancelación..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              disabled={isPending}
              required
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="submit"
              variant="destructive"
              className="px-6 py-2.5 text-sm"
              disabled={isPending || !reason.trim()}
            >
              {isPending ? "Cancelando..." : "Cancelar reserva"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
