import type { SpaceType, DurationUnit, PriceMode } from "@/types";

const spaceTypeMap: Record<SpaceType, string> = {
  full_room: "Sala Completa",
  shared_site: "Sitio Compartido",
  unit: "Unidad",
};

export const formatSpaceType = (type: SpaceType): string => {
  return spaceTypeMap[type] || type;
};

const durationUnitMap: Record<DurationUnit, string> = {
  hour: "Por hora",
  day: "Por día",
  week: "Por semana",
  month: "Por mes",
};

export const formatDurationUnit = (unit: DurationUnit): string => {
  return durationUnitMap[unit] || unit;
};

const priceModeMap: Record<PriceMode, string> = {
  individual: "Individual",
  group: "Grupal",
};

export const formatPriceMode = (mode: PriceMode): string => {
  return priceModeMap[mode] || mode;
};
