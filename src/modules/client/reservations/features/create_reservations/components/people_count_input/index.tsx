import { Input } from "@/components/ui";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { forwardRef } from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
  minCapacity?: number;
  maxCapacity?: number;
  error?: string;
}

export const PeopleCountInput = forwardRef<HTMLDivElement, Props>(
  ({ value, onChange, minCapacity = 1, maxCapacity, error }, ref) => {
    const handleIncrement = () => {
      const newValue = value + 1;
      if (!maxCapacity || newValue <= maxCapacity) {
        onChange(newValue);
      }
    };

    const handleDecrement = () => {
      const newValue = value - 1;
      if (newValue >= minCapacity) {
        onChange(newValue);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Permitir campo vacío
      if (inputValue === "") {
        onChange(0);
        return;
      }

      // Solo permitir números (dígitos)
      if (!/^\d+$/.test(inputValue)) {
        return;
      }

      const newValue = parseInt(inputValue);

      // Validar que sea un número válido
      if (isNaN(newValue)) {
        return;
      }

      // Permitir escribir cualquier número, incluso si está fuera del rango
      // La validación se mostrará como error pero no bloqueará la escritura
      onChange(newValue);
    };

    return (
      <div ref={ref} className="flex flex-col w-full">
        <label className="text-sm/6 text-stone-500 mb-2">
          Ingresa cantidad de personas:
        </label>

        <div className="relative w-full">
          <Input
            type="text"
            value={value === 0 ? "" : value.toString()}
            onChange={handleInputChange}
            className={`pr-8 rounded-lg h-9.5 ${error ? "border-rose-800" : ""}`}
            placeholder="0"
          />
          <div className="absolute right-0 top-0 h-full flex flex-col">
            <button
              className="h-full w-6 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-tr-lg"
              type="button"
              onClick={handleIncrement}
              disabled={maxCapacity ? value >= maxCapacity : false}
            >
              <ChevronUpIcon className="size-4" />
            </button>
            <button
              className="h-full w-6 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-br-lg"
              type="button"
              onClick={handleDecrement}
              disabled={value <= minCapacity}
            >
              <ChevronDownIcon className="size-4" />
            </button>
          </div>
        </div>

        {error && <p className="text-rose-800 text-xs mt-1">{error}</p>}
        {(minCapacity || maxCapacity) && (
          <p className="text-xs text-stone-400 mt-1">
            {minCapacity && maxCapacity && minCapacity !== maxCapacity
              ? `Capacidad: ${minCapacity}-${maxCapacity} personas`
              : maxCapacity
                ? `Capacidad máxima: ${maxCapacity} personas`
                : `Capacidad mínima: ${minCapacity} personas`}
          </p>
        )}
      </div>
    );
  }
);
