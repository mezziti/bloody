import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function NavigationBar() {
    return (
        <header className="flex items-center bg-gray-00 h-14 px-4 w-full shrink-0">
            <Link className="flex items-center mr-4" href="#">
                <ApplicationLogo />
            </Link>
            <nav className="ml-auto space-x-4 flex items-center">
                <Link
                    className="font-medium rounded-md px-2 py-1 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                    href="#"
                >
                    Home
                </Link>
                <Link
                    className="font-medium rounded-md px-2 py-1 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                    href="#"
                >
                    Features
                </Link>
                <Link
                    className="font-medium rounded-md px-2 py-1 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                    href="#"
                >
                    Pricing
                </Link>
                <Link
                    className="font-medium rounded-md px-2 py-1 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                    href="#"
                >
                    Contact
                </Link>
            </nav>
        </header>
    );
}
