import { Link } from '@inertiajs/react';

export default function HeaderLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center justify-center px-1 text-lg font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'text-primary focus:border-red-700 '
                    : 'border-transparent text-gray-700 hover:text-primary focus:text-gray-700 focus:border-gray-300 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
