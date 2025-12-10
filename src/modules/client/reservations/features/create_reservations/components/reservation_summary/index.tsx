import { format } from "date-fns";
import { es } from "date-fns/locale";
import { forwardRef, useMemo } from "react";
import { timeToMinutes } from "@/utilities/date_utilities";
import {
  DURATION_UNIT_HOUR,
  PRICE_MODE_GROUP,
  PRICE_MODE_INDIVIDUAL,
  type Space,
} from "@/types/spaces";

interface Props {
  selectedSpace: Space | null;
  date: Date | undefined;
  startTime: string | null;
  endTime: string | null;
  personCount: number;
  isFullSpace: boolean;
}

export const ReservationSummary = forwardRef<HTMLDivElement, Props>(
  ({ selectedSpace, date, startTime, endTime, personCount, isFullSpace }) => {
    const priceCalculation = useMemo(() => {
      if (!selectedSpace || !startTime || !endTime) {
        return { total: 0, unitPrice: 0, description: "", duration: 0 };
      }

      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      const durationMinutes = endMinutes - startMinutes;
      const durationHours = durationMinutes / 60;

      if (durationHours <= 0) {
        return {
          total: 0,
          unitPrice: 0,
          description: "Duración inválida",
          duration: 0,
        };
      }

      const mode = isFullSpace ? PRICE_MODE_GROUP : PRICE_MODE_INDIVIDUAL;

      const priceRule = selectedSpace.prices.find(
        (p) => p.duration === DURATION_UNIT_HOUR && p.mode === mode
      );

      if (!priceRule) {
        return {
          total: 0,
          unitPrice: 0,
          description: "Precio no disponible",
          duration: durationHours,
        };
      }

      if (isFullSpace) {
        const total = priceRule.amount * durationHours;
        return {
          total,
          unitPrice: priceRule.amount,
          description: `S/${priceRule.amount}/hora × ${durationHours}h`,
          duration: durationHours,
        };
      } else {
        const total = priceRule.amount * personCount * durationHours;
        return {
          total,
          unitPrice: priceRule.amount,
          description: `S/${priceRule.amount}/hora × ${personCount} personas × ${durationHours}h`,
          duration: durationHours,
        };
      }
    }, [selectedSpace, personCount, isFullSpace, startTime, endTime]);

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between flex-col sm:flex-row">
            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
              <div>
                <div className="flex flex-col">
                  <span className="text-sm text-stone-500">Espacio: </span>
                  <span className="text-sm text-stone-900">
                    {selectedSpace?.name || "Selecciona un espacio"}
                  </span>
                  <span className="text-xs text-stone-700">
                    {isFullSpace ? "Espacio completo" : "Individual"}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex flex-col">
                  <span className="text-sm text-stone-500">Fecha:</span>
                  <span className="text-sm text-stone-900">
                    {date
                      ? format(date, "dd MMMM yyyy", { locale: es })
                      : "Selecciona una fecha"}
                  </span>
                  <span className="text-xs text-stone-700">
                    {startTime || "Selecciona una hora"} —{" "}
                    {endTime || "Selecciona una hora"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm/6 text-stone-500 text-right">Total</p>
              <p className="text-xl text-stone-900 font-serif font-bold">
                S/ {priceCalculation.total}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
