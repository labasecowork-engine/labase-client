import * as guard from "@/components/guards";
import * as layout from "@/components/layouts";
import { clientRoutes } from "@/routes/client_routes";
import { adminRoutes } from "@/routes/admin_routes";
import { employeeRoutes } from "@/routes/employee_routes";

export const appRoutes = {
  path: "/",
  element: <guard.AuthGuard />,
  children: [
    {
      element: <guard.RoleGuard />,
      children: [
        {
          element: <layout.Sidebar />,
          children: [clientRoutes, adminRoutes, employeeRoutes],
        },
      ],
    },
  ],
};
