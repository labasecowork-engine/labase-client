import * as employee from "@/modules/employee";
import * as shared from "@/modules/shared";
import { ROUTES } from "../routes";

export const employeeRoutes = {
  path: "/employee",
  children: [
    // Profile
    {
      path: ROUTES.Employee.ViewProfile,
      element: <shared.UpdateProfilePage />,
    },
    // Attendance
    {
      path: ROUTES.Employee.RegisterAttendance,
      element: <employee.RegisterAttendancePage />,
    },
    {
      path: ROUTES.Employee.ViewCommunication,
      element: <shared.ChatPage />,
    },
  ],
};
