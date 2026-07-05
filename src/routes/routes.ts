export const ROUTES = {
  Auth: {
    Login: "/iniciar-sesion",
    Register: "/registro",
    VerifyAccount: "/verificar-cuenta",
    RecoverPassword: "/recuperar-contrasena",
    VerifyPasswordReset: "/verificar-codigo",
    ChangePassword: "/cambiar-contrasena",
  },

  Client: {
    // Profile
    ViewProfile: "/cliente/perfil",
    // Reservations
    ViewReservations: "/cliente/reservas",
    CreateReservation: "/cliente/reservas/crear",
    ViewReservation: "/cliente/reservas/:id",
  },

  Admin: {
    // Profile
    ViewProfile: "/administrador/perfil",

    // Calendar
    ViewCalendar: "/administrador/calendario",

    // Reservations
    ViewAllReservations: "/administrador/reservas",
    ViewDetailsReservation: "/administrador/reservas/:id",
    ScanCodeQRReservation: "/administrador/reservas/escanear-qr",
    CreateReservation: "/administrador/reservas/crear",

    // Plans (catálogo de membresías)
    ViewPlans: "/administrador/planes",
    CreatePlan: "/administrador/planes/crear",
    EditPlan: "/administrador/planes/:id/editar",

    // Contracts
    ViewContracts: "/administrador/contratos",
    CreateContract: "/administrador/contratos/crear",
    ViewContract: "/administrador/contratos/:id",
    EditContract: "/administrador/contratos/:id/editar",

    // Clients (próximamente)
    ViewClients: "/administrador/clientes",

    // Website management (próximamente)
    ManageWebsite: "/administrador/pagina-web/administrar",

    // Spaces
    ViewSpaces: "/administrador/espacios",
    CreateSpace: "/administrador/espacios/crear",
    ViewSpace: "/administrador/espacios/:id",
    EditSpace: "/administrador/espacios/:id/editar",

    // Employees
    ViewEmployees: "/administrador/empleados",
    CreateEmployee: "/administrador/empleados/crear",
    EditEmployee: "/administrador/empleados/:id/editar",

    // Attendances
    ViewAttendances: "/administrador/asistencias",

    // Tools
    ViewTools: "/administrador/herramientas",

    // Inventory
    ViewInventory: "/administrador/inventario",
    CreateProduct: "/administrador/inventario/crear",
    EditProduct: "/administrador/inventario/:id/editar",

    // Visitors
    ViewVisitors: "/administrador/visitantes",
    CreateVisitor: "/administrador/visitantes/crear",
    EditVisitor: "/administrador/visitantes/editar/:id",

    // Lockers
    ViewLockers: "/administrador/casilleros",

    // Parking
    ViewParking: "/administrador/estacionamiento",
    CreateParking: "/administrador/estacionamiento/crear",

    // Client attendance
    ViewClientAttendance: "/administrador/asistencia-clientes",
    CreateClientAttendance: "/administrador/asistencia-clientes/crear",

    // Reminders
    ViewReminders: "/administrador/recordatorios",
    CreateReminder: "/administrador/recordatorios/crear",
    EditReminder: "/administrador/recordatorios/:id/editar",

    // Communication
    ViewCommunication: "/administrador/comunicacion",
  },

  Employee: {
    RegisterAttendance: "/empleado/asistencia/registrar",
    ViewProfile: "/empleado/perfil",

    // Communication
    ViewCommunication: "/empleado/comunicacion",
  },

  Error: {
    NotFound: "*",
    Internal: "/500",
  },
};
