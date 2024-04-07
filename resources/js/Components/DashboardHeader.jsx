import { Button } from "@/Components/ui/button.jsx";
import { Sheet, SheetTrigger, SheetContent } from "@/Components/ui/sheet.jsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu.jsx";
import { Input } from "@/Components/ui/input.jsx";
import { CircleUser, LifeBuoy, LogOut, Menu, Search, Settings, User } from "lucide-react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import NavBarLinks from "@/Components/NavBarLinks";
import { ScrollArea } from "@/Components/ui/scroll-area";
import HeaderLink from "./HeaderLink";

const DashboardHeader = ({ user }) => {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <Link
                        href="#"
                        className="flex pl-4 pt-4 w-4/5 items-center gap-2 text-lg font-semibold"
                    >
                        <ApplicationLogo />
                    </Link>

                    <ScrollArea>
                        <NavBarLinks />
                    </ScrollArea>
                </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
                {/* <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            name="search"
                            type="search"
                            placeholder="Search..."
                            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                        />
                    </div>
                </form> */}
                <HeaderLink
                    className="font-medium"
                    href={route("drives.index")}
                    active={route().current("drives.index")}
                >
                    Drives
                </HeaderLink>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer gap-1 flex items-center">
                        <h3>{user.name.split(" ")[0]}</h3>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full"
                        >
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <div className="text-center text-gray-900">
                        <DropdownMenuLabel>
                            {user.email.length > 25
                                ? `${user.email.slice(0, 25)}...`
                                : user.email}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="max-h-52 min-w-40">
                            <ScrollArea className="h-full">
                                <DropdownMenuItem className="text-center flex gap-2 mx-auto">
                                <User />
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-center flex gap-2 mx-auto">
                                    <LifeBuoy />
                                    Support
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link
                                        className="text-center flex gap-2"
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        <LogOut />
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            </ScrollArea>
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default DashboardHeader;
