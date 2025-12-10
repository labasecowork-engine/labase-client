import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { USER_TYPE_ADMIN, USER_TYPE_CLIENT, USER_TYPE_EMPLOYEE } from "@/types";

export default function RoleGuard() {
  const { user } = useAuth();
  const location = useLocation();
  const path = location.pathname;

  if (!user?.user_type) return null;

  const isAdminRoute = path.startsWith("/admin");
  const isClientRoute = path.startsWith("/client");
  const isEmployeeRoute = path.startsWith("/employee");

  const canAccess =
    (user.user_type === USER_TYPE_ADMIN && isAdminRoute) ||
    (user.user_type === USER_TYPE_CLIENT && isClientRoute) ||
    (user.user_type === USER_TYPE_EMPLOYEE && isEmployeeRoute);

  if (!canAccess) {
    const fallback =
      user.user_type === USER_TYPE_ADMIN
        ? ROUTES.Admin.ViewAllReservations
        : user.user_type === USER_TYPE_EMPLOYEE
          ? ROUTES.Employee.RegisterAttendance
          : ROUTES.Client.ViewReservations;

    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
}
