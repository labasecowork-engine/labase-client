import { Label } from "@/components/ui";
import { cn } from "@/utilities";
import { CheckIcon, KeyRound, StarIcon } from "lucide-react";

interface Props {
  isVip: boolean;
  onChange: (isVip: boolean) => void;
}

interface OptionProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  activeClassName: string;
}

const Option = ({
  active,
  onClick,
  icon,
  title,
  description,
  activeClassName,
}: OptionProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "relative flex flex-col gap-1 rounded-lg border px-4 py-3 text-left transition-colors",
      active
        ? activeClassName
        : "border-stone-200 bg-stone-50 hover:bg-stone-100"
    )}
  >
    {active && (
      <span className="absolute right-3 top-3 text-current">
        <CheckIcon className="size-4" />
      </span>
    )}
    <span className="flex items-center gap-2 text-sm font-medium">
      {icon}
      {title}
    </span>
    <span className="text-xs text-stone-500">{description}</span>
  </button>
);

// Reemplaza el antiguo switch "Entrega VIP": el tipo de entrega es una decisión
// (Normal vs VIP), no un interruptor suelto. Dos tarjetas lo dejan claro.
export const DeliveryTypeToggle = ({ isVip, onChange }: Props) => (
  <div className="space-y-2">
    <Label>Tipo de entrega</Label>
    <div className="grid grid-cols-2 gap-2">
      <Option
        active={!isVip}
        onClick={() => onChange(false)}
        icon={<KeyRound className="size-4 text-stone-500" />}
        title="Normal"
        description="Entrega estándar"
        activeClassName="border-stone-900 bg-white text-stone-900"
      />
      <Option
        active={isVip}
        onClick={() => onChange(true)}
        icon={
          <StarIcon
            className={cn(
              "size-4",
              isVip ? "fill-amber-400 text-amber-500" : "text-stone-500"
            )}
          />
        }
        title="VIP"
        description="Atención preferente"
        activeClassName="border-amber-500 bg-amber-50 text-amber-900"
      />
    </div>
  </div>
);
