import {
  ACCESS_TYPE_PRIVATE,
  DURATION_UNIT_HOUR,
  PRICE_MODE_GROUP,
  PRICE_MODE_INDIVIDUAL,
  type Space,
} from "@/types/spaces";
import { Image } from "@/components/ui";

interface Props {
  space: Space;
  selectedSpace: string | null;
  onSpaceSelect: (spaceId: string) => void;
}

export const SpaceCardList = ({
  space,
  selectedSpace,
  onSpaceSelect,
}: Props) => {
  return (
    <div
      key={space.id}
      onClick={() => onSpaceSelect(space.id)}
      className={`flex-shrink-0 w-80 rounded-lg bg-white border overflow-hidden cursor-pointer transition-all duration-200 ${
        selectedSpace === space.id
          ? "border-stone-900 border-2"
          : " border-stone-200"
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={
            space?.space_images[0].url === undefined
              ? ""
              : space.space_images[0].url
          }
          alt={space.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-stone-900 text-sm leading-tight">
            {space.name}
          </h3>
          <span className="text-xs font-bold text-stone-900 ml-2">
            {space.prices.find(
              (p) =>
                p.duration === DURATION_UNIT_HOUR &&
                p.mode === PRICE_MODE_INDIVIDUAL
            )?.amount
              ? `S/${
                  space.prices.find(
                    (p) =>
                      p.duration === DURATION_UNIT_HOUR &&
                      p.mode === PRICE_MODE_INDIVIDUAL
                  )?.amount
                }`
              : space.prices.find(
                    (p) =>
                      p.duration === DURATION_UNIT_HOUR &&
                      p.mode === PRICE_MODE_GROUP
                  )?.amount
                ? `S/${
                    space.prices.find(
                      (p) =>
                        p.duration === DURATION_UNIT_HOUR &&
                        p.mode === PRICE_MODE_GROUP
                    )?.amount
                  }`
                : "N/A"}{" "}
            x hora
          </span>
        </div>
        <p className="text-stone-400 text-xs mb-3 leading-relaxed">
          {space.description}
        </p>

        <div className="mb-2">
          <span className="text-xs text-stone-500">
            Capacidad:{" "}
            {space.capacity_min === space.capacity_max
              ? `${space.capacity_max} personas`
              : `${space.capacity_min}-${space.capacity_max} personas`}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1 flex-wrap">
            {space.allow_by_unit && (
              <span className="text-xs bg-stone-200 text-stone-800 px-2 py-1 rounded">
                Individual
              </span>
            )}
            {space.allow_full_room && (
              <span className="text-xs bg-stone-200 text-stone-800 px-2 py-1 rounded">
                Grupal
              </span>
            )}
            {space.access === ACCESS_TYPE_PRIVATE && (
              <span className="text-xs bg-stone-200 text-stone-800 px-2 py-1 rounded">
                Privado
              </span>
            )}
            {space.disabled && (
              <span className="text-xs bg-stone-200 text-stone-800 px-2 py-1 rounded">
                Deshabilitado
              </span>
            )}
          </div>
          {selectedSpace === space.id && (
            <span className="text-xs font-medium text-stone-50 bg-stone-900 px-2 py-1 rounded">
              Seleccionado
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
