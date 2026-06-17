import { cn } from "@/utilities";
import { Check, LayoutGrid } from "lucide-react";
import type { PlanSpace } from "../../types";

interface Props {
  options: PlanSpace[];
  value: string[];
  onChange: (ids: string[]) => void;
  isLoading?: boolean;
}

export const SpacePicker = ({ options, value, onChange, isLoading }: Props) => {
  const toggle = (id: string) =>
    onChange(
      value.includes(id) ? value.filter((item) => item !== id) : [...value, id]
    );

  if (isLoading) {
    return <p className="text-sm text-stone-400">Cargando espacios…</p>;
  }

  if (options.length === 0) {
    return (
      <p className="text-sm text-stone-400">No hay espacios disponibles.</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((space) => {
        const selected = value.includes(space.id);
        return (
          <button
            key={space.id}
            type="button"
            onClick={() => toggle(space.id)}
            aria-pressed={selected}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors",
              selected
                ? "border-stone-800 bg-stone-800 text-white"
                : "border-stone-200 bg-white text-stone-700 hover:border-stone-400"
            )}
          >
            <LayoutGrid className="size-4 opacity-70" />
            {space.name}
            <span
              className={cn(
                "flex size-4 items-center justify-center rounded-full border",
                selected ? "border-white bg-white/20" : "border-stone-300"
              )}
            >
              {selected && <Check className="size-3" />}
            </span>
          </button>
        );
      })}
    </div>
  );
};
