import type { Reminder } from "@/types";
import type { Pagination } from "@/types/services";

export interface RemindersResponse {
  reminders: Reminder[];
  pagination: Pagination;
}
