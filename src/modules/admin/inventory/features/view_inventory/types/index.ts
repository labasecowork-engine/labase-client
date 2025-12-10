import type { Pagination } from "@/types";
import type { Product } from "@/types/inventory";

export interface ProductResponse {
  products: Product[];
  pagination: Pagination;
}
