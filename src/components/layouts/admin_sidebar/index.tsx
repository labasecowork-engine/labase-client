import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import { AdminSidebarProvider } from "./context";
import { useAdminSidebar } from "./context/store";
import { AdminSidebar } from "./components/admin_sidebar";

function AdminLayoutInner() {
  const { toggle } = useAdminSidebar();

  return (
    <div className="flex min-h-screen w-full bg-white">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Barra mínima solo en móvil para abrir el menú */}
        <header className="flex h-14 items-center border-b border-stone-200 bg-white px-4 md:hidden">
          <button
            type="button"
            onClick={toggle}
            aria-label="Abrir menú"
            className="flex size-9 items-center justify-center rounded-md text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900"
          >
            <Menu className="size-5" />
          </button>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function AdminSidebarLayout() {
  return (
    <AdminSidebarProvider>
      <AdminLayoutInner />
    </AdminSidebarProvider>
  );
}
