import { twMerge } from "tailwind-merge";
import { isActiveRoute } from "../../utils";
import type { NavigationItem } from "../../types";

interface Props {
  navigation: NavigationItem[];
  activeIndex: number;
  indicatorStyle: { left: number; width: number };
  navRefs: React.MutableRefObject<(HTMLAnchorElement | null)[]>;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  handleNavClick: (href: string, e: React.MouseEvent) => void;
  location: { pathname: string };
}

export const NavigationMenu: React.FC<Props> = ({
  navigation,
  activeIndex,
  indicatorStyle,
  navRefs,
  handleMouseEnter,
  handleMouseLeave,
  handleNavClick,
  location,
}) => (
  <div className="ml-10 flex items-baseline relative">
    {/* Indicador animado */}
    {activeIndex !== -1 && (
      <div
        className="absolute top-0 h-full bg-stone-800 rounded-full transition-all duration-300 ease-out pointer-events-none"
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          transform: "translateZ(0)",
        }}
      />
    )}

    {navigation.map((item, index) => {
      const Icon = item.icon;
      const isActive = isActiveRoute(item.href, location.pathname);
      const isExternalLink =
        item.href.startsWith("http://") || item.href.startsWith("https://");

      return (
        <a
          key={item.key}
          ref={(el) => {
            navRefs.current[index] = el;
          }}
          href={item.href}
          onClick={(e) => handleNavClick(item.href, e)}
          aria-current={isActive ? "page" : undefined}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          target={isExternalLink ? "_blank" : undefined}
          rel={isExternalLink ? "noopener noreferrer" : undefined}
          className={twMerge(
            "text-white relative z-10 rounded-full px-5 py-3 text-sm font-medium transition-colors duration-200 flex items-center gap-2",
            isActive ? "text-white" : "hover:text-white"
          )}
        >
          <Icon className="h-4 w-4" />
          {item.name}
        </a>
      );
    })}
  </div>
);
