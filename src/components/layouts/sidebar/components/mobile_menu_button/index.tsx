import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

interface Props {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const MobileMenuButton: React.FC<Props> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}) => (
  <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="group relative inline-flex items-center justify-center rounded-full bg-stone-800 p-2 text-stone-200 hover:bg-stone-700/75 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-600 focus:outline-hidden"
  >
    <span className="absolute -inset-0.5" />
    <span className="sr-only">Abrir menú principal</span>
    <Bars3Icon
      aria-hidden="true"
      className={twMerge(
        "size-5 transition-transform duration-200",
        mobileMenuOpen ? "hidden" : "block"
      )}
    />
    <XMarkIcon
      aria-hidden="true"
      className={twMerge(
        "size-5 transition-transform duration-200",
        mobileMenuOpen ? "block" : "hidden"
      )}
    />
  </button>
);
