import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { SheetContent, SheetTrigger, Sheet } from "@/Components/ui/sheet.jsx";
import ApplicationLogo from "./ApplicationLogo";
import HeaderLink from "./HeaderLink";
import NavLink from "./NavLink";
import { MainHeaderLinkData } from "./data/mainHeaderLinksData";

const MainHeader = ({ user }) => {
  const mainHeaderLinkData = MainHeaderLinkData;
  return (
    <header className="flex items-center h-16 px-4 border-b lg:h-20 md:px-6">
      <Link className="mr-6" href="/">
        <ApplicationLogo />
        <span className="sr-only">Bloody</span>
      </Link>
      <nav className="hidden flex-1 justify-center items-center gap-4 md:flex">
        {mainHeaderLinkData.map((link, index) => {
          return (
            <HeaderLink
              key={index}
              className="font-medium gap-2"
              href={route(link.route)}
              active={route().current(link.route)}
            >
              {link.name}
            </HeaderLink>
          );
        })}
      </nav>
      {user ? (
        <div className="flex gap-2 justify-center">
          <Link
            href={route("dashboard")}
            className="ml-auto font-semibold bg-primary rounded-md text-white px-4 py-3 lg:ml-4 hover:bg-red-700 hidden md:flex"
          >
            Dashboard
          </Link>
          <Link
            className="border border-input bg-background hover:bg-accent hover:text-accent-foreground ml-auto font-semibold rounded-md text-black px-4 py-3 lg:ml-4 hidden md:flex"
            href={route("logout")}
            method="post"
            as="button"
          >
            Logout
          </Link>
        </div>
      ) : (
        <div className="flex gap-2 justify-center">
          <Link
            href={route("login")}
            className=" justify-center font-semibold bg-primary rounded-md text-white px-4 py-3 lg:ml-4 hover:bg-red-700 hidden md:flex"
          >
            Login
          </Link>
          <Link
            href={route("register")}
            className="border border-input bg-background hover:bg-accent hover:text-accent-foreground ml-auto font-semibold rounded-md text-black px-4 py-3 lg:ml-4 hidden md:flex"
          >
            Register
          </Link>
        </div>
      )}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="ml-auto md:hidden" size="icon" variant="ghost">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col  px-2 mt-10">
            {mainHeaderLinkData.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  href={route(link.route)}
                  active={route().current(link.route)}
                >
                  {link.icon}
                  {link.name}
                </NavLink>
              );
            })}
            {user ? (
              <div className="flex gap-2 justify-center">
                <Link
                  href={route("dashboard")}
                  className="m-4 justify-center font-semibold bg-primary rounded-md text-white px-4 py-3 lg:ml-4 hover:bg-red-700 flex"
                >
                  Dashboard
                </Link>
                <Link
                  href={route("logout")}
                  className="border border-input bg-background hover:bg-accent hover:text-accent-foreground ml-auto font-semibold rounded-md text-black px-4 py-3 lg:ml-4 hidden md:flex"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="flex gap-2 justify-center">
                <Link
                  href={route("login")}
                  className="mt-4 justify-center font-semibold bg-primary rounded-md text-white px-4 py-3 lg:ml-4 hover:bg-red-700 flex"
                >
                  Login
                </Link>
                <Link
                  href={route("register")}
                  className="border border-input bg-background hover:bg-accent hover:text-accent-foreground mt-4 justify-center font-semibold rounded-md text-black px-4 py-3 lg:ml-4 hover:bg-red-700 flex"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

export default MainHeader;
