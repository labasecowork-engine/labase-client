import { createContext, useContext } from "react";

export interface AdminSidebarContextValue {
  collapsed: boolean; // colapsado a iconos (desktop)
  toggle: () => void; // colapsa en desktop / abre-cierra drawer en móvil
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
  isMobile: boolean;
}

export const AdminSidebarContext =
  createContext<AdminSidebarContextValue | null>(null);

export const ADMIN_SIDEBAR_STORAGE_KEY = "admin-sidebar-collapsed";
export const ADMIN_SIDEBAR_MOBILE_BREAKPOINT = 768;

export const useAdminSidebar = (): AdminSidebarContextValue => {
  const context = useContext(AdminSidebarContext);
  if (!context) {
    throw new Error(
      "useAdminSidebar debe usarse dentro de AdminSidebarProvider"
    );
  }
  return context;
};
