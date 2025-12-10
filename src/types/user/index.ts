export const USER_TYPE_ADMIN = "admin";
export const USER_TYPE_EMPLOYEE = "employee";
export const USER_TYPE_CLIENT = "client";
export const USER_STATUS_ACTIVE = "active";
export const USER_STATUS_INACTIVE = "inactive";
export const USER_GENDER_MALE = "male";
export const USER_GENDER_FEMALE = "female";
export const USER_GENDER_UNSPECIFIED = "unspecified";

export interface User {
  id: string;
  name: string;
  email: string;
  user_type: "admin" | "employee" | "client";
}

export interface UserResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  birth_date: string | null;
  gender:
    | typeof USER_GENDER_MALE
    | typeof USER_GENDER_FEMALE
    | typeof USER_GENDER_UNSPECIFIED
    | null;
  user_type:
    | typeof USER_TYPE_ADMIN
    | typeof USER_TYPE_EMPLOYEE
    | typeof USER_TYPE_CLIENT;
  status: typeof USER_STATUS_ACTIVE | typeof USER_STATUS_INACTIVE;
  admin_details: null;
}

export interface ListUsersResponse {
  users: UserResponse[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    items_per_page: number;
    has_next_page: boolean;
    has_previous_page: boolean;
  };
}
