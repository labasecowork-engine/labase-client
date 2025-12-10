import type z from "zod";
import type { editSpaceSchema } from "../schemas";

export type EditSpaceData = z.infer<typeof editSpaceSchema>;
export interface KeepImage {
  id: string;
  url: string;
  position: number;
}
