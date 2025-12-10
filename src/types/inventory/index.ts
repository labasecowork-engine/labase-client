export type UnitOfMeasure = "unit" | "kilogram" | "meter" | "piece";

export const UNIT_OF_MEASURE = {
  UNIT: "unit",
  KILOGRAM: "kilogram",
  METER: "meter",
  PIECE: "piece",
} as const;

export interface Brand {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  photo_url: string;
  brand_id: string;
  unit_of_measure: string;
  description: string;
  observations: string;
  quantity: number;
  brand: Brand;
}
