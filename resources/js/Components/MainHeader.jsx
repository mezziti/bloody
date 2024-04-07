import { Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { SheetContent, SheetTrigger, Sheet } from "@/Components/ui/sheet.jsx";
import ApplicationLogo from "./ApplicationLogo";
import HeaderLink from "./HeaderLink";
import ResponsiveHeaderLink from "./ResponsiveHeaderLink";
import NavLink from "./NavLink";
import { Home } from "lucide-react";

const MainHeader = ({ user }) => {
    return (
        <header className="flex items-center h-16 px-4 border-b lg:h-20 md:px-6">
            <Link className="mr-6" href="#">
                <ApplicationLogo />
                <span className="sr-only">Bloody</span>
            </Link>
            <nav className="hidden flex-1 justify-center items-center gap-4 md:flex">
                <HeaderLink
                    className="font-medium"
                    href={route("home")}
                    active={route().current("home")}
                >
                    Home
                </HeaderLink>
                <HeaderLink
                    className="font-medium"
                    href={route("drives.index")}
                    active={route().current("drives.index")}
                >
                    Drives
                </HeaderLink>
                <HeaderLink
                    className="font-medium"
                    href={route("home3")}
                    active={route().current("home3")}
                >
                    Home3
                </HeaderLink>
            </nav>
            {user ? (
                <Link
                    href={route("dashboard")}
                    className="ml-auto font-semibold bg-primary rounded-md text-white px-4 py-3 lg:ml-4 hover:bg-red-700 hidden md:flex"
                >
                    Dashboard
                </Link>
            ) : (
                <Link
                    href={route("login")}
                    className="ml-auto font-semibold bg-primary rounded-md text-white px-4 py-3 lg:ml-4 hover:bg-red-700 hidden md:flex"
                >
                    Login
                </Link>
            )}
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        className="ml-auto md:hidden"
                        size="icon"
                        variant="ghost"
                    >
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <div className="flex flex-col  px-2 mt-10">
                        <NavLink
                            href={route("home")}
                            active={route().current("home")}
                        >
                            <Home />
                            Home
                        </NavLink>
                        <NavLink
                            href={route("drives.index")}
                            active={route().current("drives.index")}
                        >
                            <Home />
                            Drives
                        </NavLink>
                        <NavLink
                            href={route("home3")}
                            active={route().current("home3")}
                        >
                            <Home />
                            Home3
                        </NavLink>
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
