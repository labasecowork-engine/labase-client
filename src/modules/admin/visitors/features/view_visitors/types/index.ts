import type { Pagination, Visitor } from "@/types";

export interface VisitorsResponse {
  visitors: Visitor[];
  pagination: Pagination;
}

export interface SearchVisitorResponse {
  visitor: Visitor | null;
  found: boolean;
}
