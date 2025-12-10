export const ROUTES = {
  Auth: {
    Login: "/login",
    Register: "/register",
    VerifyAccount: "/verify-account",
    RecoverPassword: "/recover-password",
    VerifyPasswordReset: "/verify-password-reset",
    ChangePassword: "/change-password",
  },

  Client: {
    // Profile
    ViewProfile: "/client/profile",
    // Reservations
    ViewReservations: "/client/reservations",
    CreateReservation: "/client/reservations/create",
    ViewReservation: "/client/reservations/:id",

    // Payments
    ViewPayments: "/client/payments",
  },

  Admin: {
    // Profile
    ViewProfile: "/admin/profile",

    // Calendar
    ViewCalendar: "/admin/calendar",

    // Reservations
    ViewAllReservations: "/admin/reservations",
    ViewDetailsReservation: "/admin/reservations/:id",
    ScanCodeQRReservation: "/admin/reservations/scan-qr",
    CreateReservation: "/admin/reservations/create",

    // Newsletter
    SendNewsletter: "/admin/newsletter",

    // Spaces
    ViewSpaces: "/admin/spaces",
    CreateSpace: "/admin/spaces/create",
    ViewSpace: "/admin/spaces/:id",
    EditSpace: "/admin/spaces/:id/edit",

    // Employees
    ViewEmployees: "/admin/employees",
    CreateEmployee: "/admin/employees/create",
    EditEmployee: "/admin/employees/:id/edit",

    // Attendances
    ViewAttendances: "/admin/attendances",

    // Articles
    ViewArticles: "/admin/articles",
    CreateArticle: "/admin/articles/create",
    EditArticle: "/admin/articles/:id/edit",

    // Articles Categories
    ViewCategoriesArticles: "/admin/articles/categories",
    CreateCategoryArticles: "/admin/articles/categories/create",
    EditCategoryArticles: "/admin/articles/categories/:id/edit",

    // Tools
    ViewTools: "/admin/tools",

    // Inventory
    ViewInventory: "/admin/inventory",
    CreateProduct: "/admin/inventory/create",
    EditProduct: "/admin/inventory/:id/edit",

    // Visitors
    ViewVisitors: "/admin/visitors",
    CreateVisitor: "/admin/visitors/create",
    EditVisitor: "/admin/visitors/edit/:id",

    // Reminders
    ViewReminders: "/admin/reminders",
    CreateReminder: "/admin/reminders/create",
    EditReminder: "/admin/reminders/:id/edit",

    // Communication
    ViewCommunication: "/admin/communication",
  },

  Employee: {
    RegisterAttendance: "/employee/attendance/register",
    ViewProfile: "/employee/profile",

    // Communication
    ViewCommunication: "/employee/communication",
  },

  Error: {
    NotFound: "*",
    Internal: "/500",
  },
};
