import {
  PRICE_MODE_GROUP,
  PRICE_MODE_INDIVIDUAL,
  type Space,
} from "@/types/spaces";
import { forwardRef, useMemo } from "react";

interface Props {
  selectedSpace: Space | null;
  isFullRoom: boolean;
  selectedDuration: string | null;
  onDurationSelect: (duration: string) => void;
  error?: string;
}

const PriceCard = ({
  price,
  isSelected,
  onClick,
}: {
  price: Space["prices"][0];
  isSelected: boolean;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`p-4 border rounded-lg cursor-pointer transition-all ${
      isSelected
        ? "bg-stone-900 text-white border-stone-900"
        : "bg-white hover:border-stone-400"
    }`}
  >
    <p className="font-bold text-lg">S/{price.amount}</p>
    <p
      className={`text-sm ${isSelected ? "text-stone-300" : "text-stone-500"}`}
    >
      x {price.duration.toLowerCase()}
    </p>
  </div>
);

export const DurationSelector = forwardRef<HTMLDivElement, Props>(
  (
    { selectedSpace, isFullRoom, selectedDuration, onDurationSelect, error },
    ref
  ) => {
    const availablePrices = useMemo(() => {
      if (!selectedSpace) return [];
      const mode = isFullRoom ? PRICE_MODE_GROUP : PRICE_MODE_INDIVIDUAL;
      return selectedSpace.prices.filter((p) => p.mode === mode);
    }, [selectedSpace, isFullRoom]);

    if (!selectedSpace) {
      return null;
    }

    return (
      <div ref={ref} className="mb-6">
        <label className="text-sm/6 text-stone-500 mb-2 block">
          Selecciona la duración:
        </label>
        {availablePrices.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {availablePrices.map((price) => (
              <PriceCard
                key={price.duration}
                price={price}
                isSelected={selectedDuration === price.duration}
                onClick={() => onDurationSelect(price.duration)}
              />
            ))}
          </div>
        ) : (
          <div className="p-4 border border-dashed rounded-lg text-center text-stone-500">
            <p className="text-sm">
              No hay tarifas disponibles para el modo de reserva seleccionado.
            </p>
          </div>
        )}

        {error && <p className="text-rose-800 text-xs mt-2">{error}</p>}
      </div>
    );
  }
);
