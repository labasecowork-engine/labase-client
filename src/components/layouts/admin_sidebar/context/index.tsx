import { useEffect, useState, type ReactNode } from "react";
import { useWindowSize } from "@/hooks";
import {
  AdminSidebarContext,
  ADMIN_SIDEBAR_MOBILE_BREAKPOINT,
  ADMIN_SIDEBAR_STORAGE_KEY,
} from "./store";

export const AdminSidebarProvider = ({ children }: { children: ReactNode }) => {
  const { width } = useWindowSize();
  const isMobile = width > 0 && width < ADMIN_SIDEBAR_MOBILE_BREAKPOINT;

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(ADMIN_SIDEBAR_STORAGE_KEY) === "true";
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = () => {
    if (isMobile) {
      setMobileOpen((open) => !open);
      return;
    }
    setCollapsed((current) => {
      const next = !current;
      localStorage.setItem(ADMIN_SIDEBAR_STORAGE_KEY, String(next));
      return next;
    });
  };

  // Al pasar a desktop, cierra el drawer móvil.
  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
  }, [isMobile]);

  return (
    <AdminSidebarContext.Provider
      value={{ collapsed, toggle, mobileOpen, setMobileOpen, isMobile }}
    >
      {children}
    </AdminSidebarContext.Provider>
  );
};
