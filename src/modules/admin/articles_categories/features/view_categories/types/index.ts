import type { ArticleCategory } from "../../../types";
export type CategoryStatus = "active" | "inactive";

export interface CategoriesResponse {
  categories: ArticleCategory[];
  total?: number;
}

export interface GetCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: CategoryStatus;
}
