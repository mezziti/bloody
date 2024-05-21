import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
      <Link
        {...props}
        className={
          "inline-flex gap-2 items-center my-1 px-3 py-2 text-xl font-medium leading-5 transition duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
          (active
            ? "flex items-center rounded-lg bg-red-100 text-primary transition-all hover:text-primary"
            : "border-transparent rounded-lg text-gray-500 hover:text-primary hover:bg-red-100 ") +
          className
        }
      >
        {children}
      </Link>
    );
}
