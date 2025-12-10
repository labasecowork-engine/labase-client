interface Attendance {
  id: string;
  employee_id: string;
  type: string;
  date: string;
  check_time: string;
  employee: {
    employee_id: string;
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}

interface AttendanceResponse {
  attendances: Attendance[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

interface StatsAttendanceResponse {
  total_employees: number;
  total_hours: string;
  total_records: number;
  total_registered_days: number;
}

export type { Attendance, AttendanceResponse, StatsAttendanceResponse };
