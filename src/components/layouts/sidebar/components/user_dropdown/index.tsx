import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { UserAvatar } from "../user_avatar";
import type { User } from "@/types/user";
import type { UserNavigationItem } from "../../types";
import { Cog6ToothIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import { USER_TYPE_ADMIN, USER_TYPE_EMPLOYEE, USER_TYPE_CLIENT } from "@/types";

interface Props {
  user: User | null;
  userNavigation: UserNavigationItem[];
  handleLogoutClick: () => void;
}

const roleMap: Record<string, { label: string; route: string }> = {
  [USER_TYPE_ADMIN]: {
    label: "Administrador",
    route: ROUTES.Admin.ViewProfile,
  },
  [USER_TYPE_EMPLOYEE]: {
    label: "Empleado",
    route: ROUTES.Employee.ViewProfile,
  },
  [USER_TYPE_CLIENT]: { label: "Cliente", route: ROUTES.Client.ViewProfile },
};
export const UserDropdown: React.FC<Props> = ({
  user,
  userNavigation,
  handleLogoutClick,
}) => {
  const navigate = useNavigate();
  const roleInfo = user ? (roleMap[user.user_type] ?? roleMap["client"]) : null;

  const onConfigClick = () => {
    if (roleInfo) {
      navigate(roleInfo.route);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative ml-3 flex max-w-xs items-center rounded-full bg-stone-600 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-600">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Abrir menú de usuario</span>
        <UserAvatar name={user?.name ?? "U"} size="sm" />
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent className="absolute right-0 z-[999] mt-2 w-[250px] origin-top-right rounded-lg bg-white py-2 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
          <div className="px-4 py-2 border-b border-stone-200">
            <p className="text-xs font-semibold text-stone-900 ">{user.name}</p>
            <p className="text-xs text-stone-500">{user.email}</p>
            <p className="text-xs text-stone-400 capitalize">
              {roleInfo?.label}
            </p>
          </div>

          {userNavigation.map((item) => (
            <DropdownMenuItem key={item.name} className="rounded-lg transition">
              <a
                href={item.href}
                className="block px-2 py-1 text-sm text-stone-700 data-focus:bg-stone-100 data-focus:outline-hidden"
              >
                {item.name}
              </a>
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem className="rounded-lg transition hover:bg-stone-100 focus:bg-stone-100 mt-1">
            <button
              onClick={onConfigClick}
              className="flex items-center font-medium gap-2 w-full text-left cursor-pointer px-2 py-1 text-xs text-stone-800 data-focus:bg-stone-100 data-focus:outline-hidden"
            >
              <Cog6ToothIcon className="size-4 text-stone-800" />
              Configuración
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="rounded-lg transition hover:bg-rose-50 focus:bg-rose-50 "
            onClick={handleLogoutClick}
          >
            <button className="flex items-center font-medium gap-2 w-full text-left cursor-pointer px-2 py-1 text-xs text-rose-800 data-focus:bg-rose-50 data-focus:outline-hidden">
              <XCircleIcon className="size-4 text-rose-800" />
              Cerrar sesión
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
