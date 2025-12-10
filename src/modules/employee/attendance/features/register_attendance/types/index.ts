import type {
  USER_STATUS_ACTIVE,
  USER_STATUS_INACTIVE,
  USER_TYPE_ADMIN,
  USER_TYPE_CLIENT,
  USER_TYPE_EMPLOYEE,
  ATTENDANCE_TYPE_ENTRY,
  ATTENDANCE_TYPE_EXIT,
} from "@/types";

export interface Attendance {
  id: string;
  type: string;
  date: string;
  check_time: string;
}

export interface AttendanceResponse {
  attendances: Attendance[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface RegisterAttendanceResponse {
  message: string;
  attendance_id: string;
  type: typeof ATTENDANCE_TYPE_EXIT | typeof ATTENDANCE_TYPE_ENTRY;
  date: string;
  check_time: string;
  user: {
    id: string;
    user_type:
      | typeof USER_TYPE_EMPLOYEE
      | typeof USER_TYPE_ADMIN
      | typeof USER_TYPE_CLIENT;
    status: typeof USER_STATUS_ACTIVE | typeof USER_STATUS_INACTIVE;
    admin_details: null;
  };
}

export interface AttendanceRecord {
  time: string;
  type: string;
}

export interface AttendanceDay {
  date: string;
  dayName: string;
  records: AttendanceRecord[];
}
