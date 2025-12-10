import type { User } from "@/types/user";
import { twMerge } from "tailwind-merge";
import { isActiveRoute } from "../../utils";
import { UserAvatar } from "../user_avatar";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import type { NavigationItem, UserNavigationItem } from "../../types";

interface Props {
  mobileMenuOpen: boolean;
  navigation: NavigationItem[];
  location: { pathname: string };
  handleNavClick: (href: string, e: React.MouseEvent) => void;
  user: User | null;
  userNavigation: UserNavigationItem[];
  handleLogoutClick: () => void;
}
export const MobileMenu: React.FC<Props> = ({
  mobileMenuOpen,
  navigation,
  location,
  handleNavClick,
  user,
  userNavigation,
  handleLogoutClick,
}) => {
  return (
    <div
      className={twMerge(
        "md:hidden transition-all duration-200 ease-in-out",
        mobileMenuOpen
          ? "max-h-96 opacity-100"
          : "max-h-0 opacity-0 overflow-hidden"
      )}
    >
      <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = isActiveRoute(item.href, location.pathname);

          return (
            <button
              key={item.key}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href, e);
              }}
              aria-current={isActive ? "page" : undefined}
              className={twMerge(
                "w-full text-left flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-stone-800 text-white"
                  : "text-white hover:bg-stone-800"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </button>
          );
        })}
      </div>
      <div className="border-t border-stone-700 pt-4 pb-3">
        <div className="flex items-center px-5">
          <div className="shrink-0">
            <UserAvatar name={user?.name ?? "U"} size="md" />
          </div>
          {user && (
            <div className="ml-3">
              <div className="text-xs font-medium text-white">{user?.name}</div>
              <div className="text-xs font-medium text-stone-300">
                {user?.email}
              </div>
              <div className="text-xs font-medium text-stone-400 capitalize">
                {user?.user_type === "admin" ? "Administrador" : "Cliente"}
              </div>
            </div>
          )}
        </div>
        <div className="mt-3 px-2">
          {userNavigation.map((item) => (
            <button
              key={item.name}
              className="w-full text-left block rounded-full px-4 py-3 text-sm font-medium text-white hover:bg-stone-800"
            >
              {item.name}
            </button>
          ))}
          <button
            onClick={handleLogoutClick}
            className="w-full text-left rounded-full px-4 py-3 text-sm font-medium text-rose-300 hover:bg-rose-800/20 flex items-center gap-2"
          >
            <ArrowLeftOnRectangleIcon className="size-5" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
