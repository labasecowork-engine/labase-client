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
import { useRegisterExit } from "../../hooks";
import type { ExitTarget } from "../../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: ExitTarget | null;
}

const pad = (n: number): string => String(n).padStart(2, "0");
const nowStr = (): string => {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const ExitDialog = ({ open, onOpenChange, target }: Props) => {
  const [exitTime, setExitTime] = useState(nowStr());
  const { registerExit, isExiting } = useRegisterExit(() => onOpenChange(false));

  useEffect(() => {
    if (open) setExitTime(nowStr());
  }, [open]);

  const handleSubmit = () => {
    if (!target) return;
    registerExit({ id: target.id, input: { exit_time: exitTime } });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Registrar salida</DialogTitle>
          <DialogDescription>
            {target
              ? `${target.client_name} · espacio ${target.space_code}`
              : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="exit-time">Hora de salida</Label>
          <Input
            id="exit-time"
            type="time"
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="button" disabled={isExiting} onClick={handleSubmit}>
            {isExiting ? "Registrando…" : "Registrar salida"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
