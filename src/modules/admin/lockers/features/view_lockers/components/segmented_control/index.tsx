import { cn } from "@/utilities";

interface SegmentOption<T extends string> {
  value: T;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface Props<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: SegmentOption<T>[];
  fullWidth?: boolean;
  className?: string;
}

// Segmentador reutilizable (pill). Se usa para el cambio de vista de la página
// (Mapa / Registros, a todo el ancho con `fullWidth`) y para alternar tablas
// (Entregas / Por reserva, tamaño natural).
export const SegmentedControl = <T extends string>({
  value,
  onChange,
  options,
  fullWidth = false,
  className,
}: Props<T>) => (
  <div
    className={cn(
      "rounded-full bg-stone-100 p-1",
      fullWidth ? "flex w-full" : "inline-flex",
      className
    )}
  >
    {options.map((option) => {
      const isActive = option.value === value;
      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={isActive}
          className={cn(
            "inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            fullWidth && "flex-1 justify-center",
            isActive
              ? "bg-white text-stone-900 shadow-sm"
              : "text-stone-500 hover:text-stone-700"
          )}
        >
          {option.icon}
          {option.label}
          {typeof option.count === "number" && (
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-xs tabular-nums",
                isActive ? "bg-stone-100 text-stone-700" : "bg-stone-200/60"
              )}
            >
              {option.count}
            </span>
          )}
        </button>
      );
    })}
  </div>
);
