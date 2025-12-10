export type SpaceType = "unit" | "shared_site" | "full_room";
export type AccessType = "public" | "private";
export type DurationUnit = "hour" | "day" | "week" | "month";
export type PriceMode = "individual" | "group";

export const SPACE_TYPE_UNIT = "unit" as const;
export const SPACE_TYPE_SHARED_SITE = "shared_site" as const;
export const SPACE_TYPE_FULL_ROOM = "full_room" as const;

export const ACCESS_TYPE_PUBLIC = "public" as const;
export const ACCESS_TYPE_PRIVATE = "private" as const;

export const DURATION_UNIT_HOUR = "hour" as const;
export const DURATION_UNIT_DAY = "day" as const;
export const DURATION_UNIT_WEEK = "week" as const;
export const DURATION_UNIT_MONTH = "month" as const;

export const PRICE_MODE_INDIVIDUAL = "individual" as const;
export const PRICE_MODE_GROUP = "group" as const;

export interface Space {
  id: string;
  name: string;
  description: string | null;
  type: SpaceType;
  access: AccessType;
  capacity_min: number;
  capacity_max: number;
  allow_by_unit: boolean;
  allow_full_room: boolean;
  disabled: boolean;
  created_at: string;
  prices: Price[];
  space_images: SpaceImage[];
}

export interface SpaceImage {
  id: string;
  url: string;
  alt: string;
  position?: number;
}

export interface Price {
  id: string;
  duration: DurationUnit;
  amount: number;
  mode: PriceMode;
}
export interface SpacesResponse {
  spaces: Space[];
}
