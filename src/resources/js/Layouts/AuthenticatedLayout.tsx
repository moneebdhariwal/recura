import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;
    const currentRoute = usePage().url;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const isAdmin = currentRoute.startsWith('/admin');

    return (
        <div className="min-h-screen bg-gradient-to-br from-seafoam-50 via-mist-50 to-sky-50 transition-all duration-300">
            {isAdmin ? (
                <div className="flex">
                    <aside className="w-64 bg-white/80 backdrop-blur-xl border-r border-white/60 min-h-screen">
                        <div className="p-6">
                            <Link href="/admin" className="block text-2xl font-bold text-seafoam-600 mb-10 transition-all duration-300 hover:scale-[1.02]">
                                Recura Admin
                            </Link>
                            <nav className="flex flex-col space-y-3">
                                <NavLink href="/admin/dashboard" active={currentRoute === '/admin/dashboard'} className="rounded-2xl transition-all duration-300 hover:scale-[1.01]">
                                    Dashboard
                                </NavLink>
                                <NavLink href="/admin/videos" active={currentRoute.startsWith('/admin/videos')} className="rounded-2xl transition-all duration-300 hover:scale-[1.01]">
                                    Videos
                                </NavLink>
                                <NavLink href="/admin/matching-rules" active={currentRoute.startsWith('/admin/matching-rules')} className="rounded-2xl transition-all duration-300 hover:scale-[1.01]">
                                    Matching Rules
                                </NavLink>
                                <NavLink href="/admin/responses" active={currentRoute.startsWith('/admin/responses')} className="rounded-2xl transition-all duration-300 hover:scale-[1.01]">
                                    Responses
                                </NavLink>
                                <NavLink href="/admin/consent-records" active={currentRoute.startsWith('/admin/consent-records')} className="rounded-2xl transition-all duration-300 hover:scale-[1.01]">
                                    Consent Records
                                </NavLink>
                            </nav>
                        </div>
                    </aside>
                    <div className="flex-1">
                        <nav className="border-b border-white/60 bg-white/70 backdrop-blur-xl">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 justify-between">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 text-sm font-medium">Admin Panel</span>
                                    </div>
                                    <div className="hidden sm:flex items-center">
                                        <div className="relative ms-3">
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <span className="inline-flex rounded-full">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:scale-[1.02] hover:border-seafoam-200 hover:text-seafoam-700"
                                                        >
                                                            {user.name}
                                                        </button>
                                                    </span>
                                                </Dropdown.Trigger>
                                                <Dropdown.Content>
                                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                                        Log Out
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <main className="p-6 lg:p-10">
                            <div className="mx-auto max-w-7xl">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen">
                    <nav className="border-b border-white/60 bg-white/70 backdrop-blur-xl">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between">
                                <div className="flex">
                                    <div className="flex shrink-0 items-center">
                                        <Link href="/">
                                            <ApplicationLogo className="block h-9 w-auto fill-current text-seafoam-600 transition-all duration-300 hover:scale-[1.02]" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="hidden sm:ms-6 sm:flex sm:items-center">
                                    <div className="relative ms-3">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <span className="inline-flex rounded-full">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:scale-[1.02] hover:border-seafoam-200 hover:text-seafoam-700"
                                                    >
                                                        {user.name}
                                                    </button>
                                                </span>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('logout')} method="post" as="button">
                                                    Log Out
                                                </Dropdown.Link>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                    {header && (
                        <header className="bg-white/60 backdrop-blur-xl">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                                {header}
                            </div>
                        </header>
                    )}
                    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {children}
                    </main>
                </div>
            )}
        </div>
    );
}

