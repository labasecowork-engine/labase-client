import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  LogOut,
  Search,
  Settings,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ScrollArea,
  Input,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";
import { cn } from "@/utilities";
import { useAuth } from "@/hooks";
import { ROUTES } from "@/routes/routes";
import { isActiveRoute } from "@/components/layouts/sidebar/utils";
import { ADMIN_NAV, type AdminNavGroup } from "../../constants";
import { useAdminSidebar } from "../../context/store";

const Avatar = ({ name }: { name: string }) => (
  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-stone-700 text-sm font-medium text-white">
    {name.charAt(0).toUpperCase()}
  </div>
);

interface BodyProps {
  collapsed: boolean;
  onNavigate?: () => void; // drawer móvil: cierra al navegar
  onToggle?: () => void; // desktop: botón de colapsar (oculto en drawer)
}

const SidebarBody = ({ collapsed, onNavigate, onToggle }: BodyProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Texto del buscador para filtrar las opciones del sidebar (solo expandido).
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();

  // Grupos visibles según la búsqueda: si el título del grupo coincide, se
  // muestran todos sus items; si no, solo los items cuyo nombre coincide.
  const visibleGroups = query
    ? ADMIN_NAV.map((group) => {
        if (group.label.toLowerCase().includes(query)) return group;
        const items = group.items.filter((item) =>
          item.name.toLowerCase().includes(query),
        );
        return items.length ? { ...group, items } : null;
      }).filter((group): group is AdminNavGroup => group !== null)
    : ADMIN_NAV;

  // Grupos plegados por su título (solo aplica con el sidebar expandido).
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    new Set(),
  );
  const toggleGroup = (label: string) =>
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  const handleLogout = () => {
    logout?.();
    navigate(ROUTES.Auth.Login);
  };

  const handleSettings = () => {
    navigate(ROUTES.Admin.ViewProfile);
    onNavigate?.();
  };

  // Colapsado: al hacer clic en un grupo, expande el sidebar y navega a su
  // primer sub-item.
  const handleCollapsedGroupClick = (group: AdminNavGroup) => {
    onToggle?.();
    const first = group.items[0];
    if (!first) return;
    if (first.external) {
      window.open(first.href, "_blank", "noopener,noreferrer");
    } else {
      navigate(first.href);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-stone-800 py-2",
          collapsed ? "justify-center px-2" : "px-4",
        )}
      >
        {collapsed ? (
          <img src="/favicon.svg" alt="Labase" className="size-9 rounded-md" />
        ) : (
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md bg-stone-800 px-3 py-1.5">
            <img
              alt="Labase"
              src="/logo.png"
              className="max-h-full w-32 object-contain"
            />
          </div>
        )}
      </div>

      {/* Buscador (solo en modo expandido) */}
      {!collapsed && (
        <div className="shrink-0 px-2 pt-3">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-500" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar opción..."
              aria-label="Buscar opción del menú"
              className="h-9 border-stone-800 bg-stone-900 pr-8 pl-9 text-white placeholder:text-stone-500 focus:border-stone-600"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Limpiar búsqueda"
                className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-0.5 text-stone-500 transition-colors hover:text-white"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navegación (con scroll) */}
      <ScrollArea className="min-h-0 flex-1 [&_[data-slot=scroll-area-thumb]]:bg-stone-700 [&_[data-slot=scroll-area-scrollbar]]:w-2">
        <nav className="space-y-1 px-2 py-4">
          {!collapsed && query && visibleGroups.length === 0 && (
            <p className="px-3 py-2 text-sm text-stone-500">
              Sin resultados para "{search.trim()}"
            </p>
          )}
          {visibleGroups.map((group) => {
            const GroupIcon = group.icon;
            // Al buscar, los grupos se muestran abiertos para ver los resultados.
            const groupOpen = !!query || !collapsedGroups.has(group.label);
            const groupActive = group.items.some(
              (item) =>
                !item.external && isActiveRoute(item.href, location.pathname),
            );

            // Modo iconos (rail): un icono por grupo; al hacer clic se expande.
            if (collapsed) {
              return (
                <Tooltip key={group.label}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => handleCollapsedGroupClick(group)}
                      className={cn(
                        "flex w-full items-center justify-center rounded-md py-2 transition-colors",
                        groupActive
                          ? "bg-stone-800 text-white"
                          : "text-stone-300 hover:bg-stone-800/60 hover:text-white",
                      )}
                    >
                      <GroupIcon className="size-5 shrink-0" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{group.label}</TooltipContent>
                </Tooltip>
              );
            }

            // Modo expandido: título con icono (colapsable) + sub-items sin icono.
            return (
              <div key={group.label}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-stone-800/60 hover:text-white",
                    groupActive ? "text-white" : "text-stone-300",
                  )}
                >
                  <GroupIcon className="size-5 shrink-0" />
                  <span className="flex-1 text-left">{group.label}</span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-stone-500 transition-transform",
                      !groupOpen && "-rotate-90",
                    )}
                  />
                </button>

                {groupOpen && (
                  <ul className="mt-1 space-y-0.5">
                    {group.items.map((item) => {
                      const active =
                        !item.external &&
                        isActiveRoute(item.href, location.pathname);
                      const className = cn(
                        "block rounded-md py-1.5 pr-3 pl-11 text-sm transition-colors",
                        active
                          ? "bg-stone-800 text-white"
                          : "text-stone-400 hover:bg-stone-800/60 hover:text-white",
                      );
                      return (
                        <li key={item.href}>
                          {item.external ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={className}
                              onClick={onNavigate}
                            >
                              {item.name}
                            </a>
                          ) : (
                            <Link
                              to={item.href}
                              className={className}
                              onClick={onNavigate}
                            >
                              {item.name}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer: colapsar (arriba) + usuario (abajo) */}
      <div className="shrink-0 space-y-1 border-t border-stone-800 p-3">
        {onToggle &&
          (collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={onToggle}
                  className="flex w-full items-center justify-center rounded-md p-2 text-stone-400 transition-colors hover:bg-stone-800 hover:text-white"
                >
                  <ChevronsRight className="size-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Expandir</TooltipContent>
            </Tooltip>
          ) : (
            <button
              type="button"
              onClick={onToggle}
              className="flex w-full items-center gap-2 rounded-md p-2 text-sm text-stone-400 transition-colors hover:bg-stone-800 hover:text-white"
            >
              <ChevronsLeft className="size-4" />
              Colapsar
            </button>
          ))}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className={cn(
                "flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-stone-800",
                collapsed && "justify-center",
              )}
            >
              <Avatar name={user?.name ?? "A"} />
              {!collapsed && (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {user?.name ?? "Admin"}
                    </p>
                    <p className="truncate text-xs text-stone-400">
                      {user?.email}
                    </p>
                  </div>
                  <ChevronsUpDown className="size-4 shrink-0 text-stone-400" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="truncate text-sm font-medium">
                {user?.name ?? "Admin"}
              </p>
              <p className="text-muted-foreground truncate text-xs font-normal">
                {user?.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSettings}>
              <Settings />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={handleLogout}>
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export const AdminSidebar = () => {
  const { collapsed, toggle, mobileOpen, setMobileOpen } = useAdminSidebar();

  return (
    <>
      {/* Desktop */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r border-stone-800 bg-stone-950 transition-[width] duration-200 md:block",
          collapsed ? "w-[4.5rem]" : "w-64",
        )}
      >
        <SidebarBody collapsed={collapsed} onToggle={toggle} />
      </aside>

      {/* Móvil (drawer) */}
      <DialogPrimitive.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 md:hidden" />
          <DialogPrimitive.Content className="fixed inset-y-0 left-0 z-50 w-64 bg-stone-950 shadow-xl duration-200 focus:outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left md:hidden">
            <DialogPrimitive.Title className="sr-only">
              Navegación de administración
            </DialogPrimitive.Title>
            <SidebarBody
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
            />
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
};
