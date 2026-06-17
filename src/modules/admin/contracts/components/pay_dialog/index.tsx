import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@/components/ui";
import { usePayContract } from "../../hooks";
import { formatMoney, pendingAmount } from "../../constants";
import type { Contract } from "../../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contract: Contract | null;
}

export const PayDialog = ({ open, onOpenChange, contract }: Props) => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const { payContract, isPaying } = usePayContract(() => onOpenChange(false));

  useEffect(() => {
    if (open && contract) {
      setAmount(String(pendingAmount(contract)));
      setNote("");
    }
  }, [open, contract]);

  const handleSubmit = () => {
    if (!contract) return;
    payContract({
      id: contract.id,
      input: { amount: Number(amount) || 0, note: note.trim() || null },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar pago</DialogTitle>
          <DialogDescription>
            {contract
              ? `${contract.client_name} · pendiente ${formatMoney(pendingAmount(contract))}`
              : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pay-amount">Monto (S/.)</Label>
            <Input
              id="pay-amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pay-note">Nota</Label>
            <Input
              id="pay-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Opcional"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" disabled={isPaying} onClick={handleSubmit}>
            {isPaying ? "Registrando…" : "Registrar pago"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
