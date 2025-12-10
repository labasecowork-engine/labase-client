import {
  DURATION_UNIT_HOUR,
  PRICE_MODE_GROUP,
  PRICE_MODE_INDIVIDUAL,
  type Space,
} from "@/types/spaces";
import { BuildingOfficeIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  BuildingOfficeIcon as BuildingOfficeIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";
import { forwardRef, useEffect, useMemo } from "react";

interface Props {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  selectedSpace: Space | null;
  peopleCount: number;
  error?: string;
}

export const FullSpaceSwitch = forwardRef<HTMLDivElement, Props>(
  ({ checked, onCheckedChange, selectedSpace, peopleCount, error }, ref) => {
    const priceInfo = useMemo(() => {
      if (!selectedSpace) return { individual: null, group: null };

      const individualPrice = selectedSpace.prices.find(
        (p) =>
          p.duration === DURATION_UNIT_HOUR && p.mode === PRICE_MODE_INDIVIDUAL
      );
      const groupPrice = selectedSpace.prices.find(
        (p) => p.duration === DURATION_UNIT_HOUR && p.mode === PRICE_MODE_GROUP
      );

      return {
        individual: individualPrice
          ? {
              available: selectedSpace.allow_by_unit,
              total: individualPrice.amount * peopleCount,
              unit: individualPrice.amount,
            }
          : null,
        group: groupPrice
          ? {
              available: selectedSpace.allow_full_room,
              total: groupPrice.amount,
              unit: groupPrice.amount,
            }
          : null,
      };
    }, [selectedSpace, peopleCount]);

    useEffect(() => {
      console.log(selectedSpace);
    }, [selectedSpace]);

    return (
      <div ref={ref} className="w-full">
        {selectedSpace && (
          <>
            <div className="flex flex-col">
              <label className="text-sm/6 text-stone-500 mb-2">
                Modalidad de reserva
              </label>
              {error && <p className="text-rose-800 text-xs mt-1">{error}</p>}
            </div>

            <div className="space-x-2 flex items-center">
              {/* Botón Individual */}
              <button
                type="button"
                onClick={() => onCheckedChange(false)}
                disabled={!priceInfo.individual?.available}
                className={`w-full flex flex-col p-4 rounded-lg transition-all ${
                  !checked && priceInfo.individual?.available
                    ? "  bg-white text-stone-900 border-stone-900 border-2 "
                    : " bg-white border border-stone-200 "
                } ${
                  !priceInfo.individual?.available
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center flex-col gap-3">
                    <div className="text-left ">
                      {checked && priceInfo.individual?.available ? (
                        <UserIcon className="size-5 text-stone-500" />
                      ) : (
                        <UserIconSolid className="size-5 text-stone-500" />
                      )}
                      <span className="font-medium text-stone-800 text-sm">
                        Por persona
                      </span>
                      {!priceInfo.individual?.available && (
                        <span className="text-rose-800 text-xs ml-2">
                          (No disponible)
                        </span>
                      )}
                    </div>
                  </div>
                  {priceInfo.individual?.available && (
                    <div className="flex flex-col gap-1 justify-end items-end">
                      <div className="text-right flex gap-2 justify-end items-end">
                        <div className="text-xs opacity-70">
                          S/{priceInfo.individual.unit} × {peopleCount}
                        </div>
                        <span className="font-bold font-serif text-sm">
                          S/{priceInfo.individual.total.toFixed(2)}
                        </span>
                      </div>
                      {!checked && priceInfo.individual?.available && (
                        <div className="text-xs bg-stone-900 text-white px-2 py-1 rounded-sm w-fit">
                          Seleccionado
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </button>

              {/* Botón Espacio Completo */}
              <button
                type="button"
                onClick={() => onCheckedChange(true)}
                disabled={!priceInfo.group?.available}
                className={`w-full flex items-start justify-between p-4 rounded-lg border transition-all ${
                  checked && priceInfo.group?.available
                    ? "bg-white border-stone-900 border-2"
                    : "bg-white border-stone-200 hover:border-stone-300"
                } ${
                  !priceInfo.group?.available
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div className="text-left ">
                      {!checked && priceInfo.group?.available ? (
                        <BuildingOfficeIcon className="size-5 text-stone-500 " />
                      ) : (
                        <BuildingOfficeIconSolid className="size-5 text-stone-500 " />
                      )}
                      <span className="font-medium text-stone-800 text-sm">
                        Espacio completo
                      </span>
                      {!priceInfo.group?.available && (
                        <span className="text-rose-800 text-xs ml-2">
                          (No disponible)
                        </span>
                      )}
                    </div>
                  </div>
                  {priceInfo.group?.available && (
                    <div className="flex flex-col gap-1 justify-end items-end">
                      <div className="text-right flex gap-2 justify-end items-end">
                        <div className="text-stone-500 text-xs">
                          Precio fijo
                        </div>
                        <span className="font-bold font-serif text-sm">
                          S/{priceInfo.group.total.toFixed(2)}
                        </span>
                      </div>
                      {checked && priceInfo.group?.available && (
                        <div className="text-xs bg-stone-900 text-white px-2 py-1 rounded-sm w-fit">
                          Seleccionado
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
);
