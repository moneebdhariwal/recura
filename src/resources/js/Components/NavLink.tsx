import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center rounded-2xl px-4 py-2 text-sm font-medium leading-5 transition-all duration-300 ease-in-out focus:outline-none hover:scale-[1.02] ' +
                (active
                    ? 'bg-seafoam-100 text-seafoam-700 shadow-sm'
                    : 'text-gray-600 hover:bg-white/60 hover:text-seafoam-600') +
                className
            }
        >
            {children}
        </Link>
    );
}
