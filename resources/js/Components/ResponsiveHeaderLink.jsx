import { Link } from '@inertiajs/react';

export default function ResponsiveHeaderLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? 'border-primary text-primary bg-red-100 focus:text-primary focus:bg-red-100 focus:border-red-700'
                    : 'border-transparent text-gray-600 hover:text-primary hover:bg-red-50 hover:border-red-300 focus:text-red-800 focus:bg-red-50 focus:border-red-300'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
