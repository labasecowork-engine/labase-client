import { Outlet } from "react-router-dom";
import { useSidebar } from "./hooks";
import {
  ButtonFeedback,
  MobileMenu,
  MobileMenuButton,
  NavigationMenu,
  UserDropdown,
} from "./components";

export default function Sidebar() {
  const {
    indicatorStyle,
    mobileMenuOpen,
    setMobileMenuOpen,
    navRefs,
    navigation,
    activeIndex,
    user,
    userNavigation,
    location,
    handleMouseEnter,
    handleMouseLeave,
    handleNavClick,
    handleLogoutClick,
  } = useSidebar();

  return (
    <>
      <div>
        <div className="bg-stone-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-24 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0">
                  <img
                    alt="Labase"
                    src="/logo.png"
                    className="w-36 object-cover"
                  />
                </div>
                <div className="hidden md:block">
                  <NavigationMenu
                    navigation={navigation}
                    activeIndex={activeIndex}
                    indicatorStyle={indicatorStyle}
                    navRefs={navRefs}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    handleNavClick={handleNavClick}
                    location={location}
                  />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <UserDropdown
                    user={user}
                    userNavigation={userNavigation}
                    handleLogoutClick={handleLogoutClick}
                  />
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <MobileMenuButton
                  mobileMenuOpen={mobileMenuOpen}
                  setMobileMenuOpen={setMobileMenuOpen}
                />
              </div>
            </div>
          </div>

          <MobileMenu
            mobileMenuOpen={mobileMenuOpen}
            navigation={navigation}
            location={location}
            handleNavClick={handleNavClick}
            user={user}
            userNavigation={userNavigation}
            handleLogoutClick={handleLogoutClick}
          />
        </div>

        <main>
          <div className="relative">
            <Outlet />
          </div>
        </main>
      </div>
      <ButtonFeedback />
    </>
  );
}
