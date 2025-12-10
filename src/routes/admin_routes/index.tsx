import * as admin from "@/modules/admin";
import * as shared from "@/modules/shared";
import { ROUTES } from "../routes";

export const adminRoutes = {
  path: "/admin",
  children: [
    // Profile
    {
      path: ROUTES.Admin.ViewProfile,
      element: <shared.UpdateProfilePage />,
    },
    // Calendar
    {
      path: ROUTES.Admin.ViewCalendar,
      element: <admin.ViewCalendarPage />,
    },
    // Reservations
    {
      path: ROUTES.Admin.ScanCodeQRReservation,
      element: <admin.ScanQRReservationsPage />,
    },
    {
      path: ROUTES.Admin.ViewDetailsReservation,
      element: <admin.ViewReservationPage />,
    },
    {
      path: ROUTES.Admin.ViewAllReservations,
      element: <admin.ViewAllReservationsPage />,
    },
    {
      path: ROUTES.Admin.CreateReservation,
      element: <admin.CreateReservationPage />,
    },
    // Newsletter
    {
      path: ROUTES.Admin.SendNewsletter,
      element: <admin.SendNewsletterPage />,
    },
    // Spaces
    {
      path: ROUTES.Admin.ViewSpaces,
      element: <admin.ViewSpacesPage />,
    },
    {
      path: ROUTES.Admin.CreateSpace,
      element: <admin.CreateSpacePage />,
    },
    {
      path: ROUTES.Admin.ViewSpace,
      element: <admin.ViewSpacePage />,
    },
    {
      path: ROUTES.Admin.EditSpace,
      element: <admin.EditSpacePage />,
    },
    // Employees
    {
      path: ROUTES.Admin.ViewEmployees,
      element: <admin.ViewEmployeesPage />,
    },
    {
      path: ROUTES.Admin.CreateEmployee,
      element: <admin.CreateEmployeePage />,
    },
    {
      path: ROUTES.Admin.EditEmployee,
      element: <admin.EditEmployeePage />,
    },
    // Attendances
    {
      path: ROUTES.Admin.ViewAttendances,
      element: <admin.ViewAttendancesPage />,
    },
    // Articles
    {
      path: ROUTES.Admin.ViewArticles,
      element: <admin.ViewArticlesPage />,
    },
    {
      path: ROUTES.Admin.CreateArticle,
      element: <admin.CreateArticlePage />,
    },
    {
      path: ROUTES.Admin.EditArticle,
      element: <admin.EditArticlePage />,
    },
    // Categories
    {
      path: ROUTES.Admin.ViewCategoriesArticles,
      element: <admin.ViewCategoriesPage />,
    },
    {
      path: ROUTES.Admin.CreateCategoryArticles,
      element: <admin.CreateCategoryPage />,
    },
    {
      path: ROUTES.Admin.EditCategoryArticles,
      element: <admin.EditCategoryPage />,
    },
    // Visitors
    {
      path: ROUTES.Admin.ViewVisitors,
      element: <admin.ViewVisitorsPage />,
    },
    {
      path: ROUTES.Admin.CreateVisitor,
      element: <admin.CreateVisitorPage />,
    },
    {
      path: ROUTES.Admin.EditVisitor,
      element: <admin.EditVisitorPage />,
    },
    // Inventory
    {
      path: ROUTES.Admin.ViewInventory,
      element: <admin.ViewInventoryPage />,
    },
    {
      path: ROUTES.Admin.CreateProduct,
      element: <admin.CreateProductPage />,
    },
    {
      path: ROUTES.Admin.EditProduct,
      element: <admin.EditProductPage />,
    },
    // Tools
    {
      path: ROUTES.Admin.ViewTools,
      element: <admin.ViewToolsPage />,
    },
    // Reminders
    {
      path: ROUTES.Admin.ViewReminders,
      element: <admin.ViewRemindersPage />,
    },
    {
      path: ROUTES.Admin.CreateReminder,
      element: <admin.CreateReminderPage />,
    },
    {
      path: ROUTES.Admin.EditReminder,
      element: <admin.EditReminderPage />,
    },
    // Communication
    {
      path: ROUTES.Admin.ViewCommunication,
      element: <shared.ChatPage />,
    },
  ],
};
