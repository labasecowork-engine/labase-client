import { z } from "zod";
import type { loginSchema } from "../schemas";
import type {
  USER_TYPE_ADMIN,
  USER_TYPE_CLIENT,
  USER_TYPE_EMPLOYEE,
} from "@/types";

export type LoginCredentials = z.infer<typeof loginSchema>;

export interface LoginResponse {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: string | null;
    user_type:
      | typeof USER_TYPE_ADMIN
      | typeof USER_TYPE_CLIENT
      | typeof USER_TYPE_EMPLOYEE;
  };
  token: string;
}
