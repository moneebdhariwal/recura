import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Processing() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || '';

    useEffect(() => {
        const timer = setTimeout(() => {
            router.get(`/video?token=${token}`);
        }, 2000);
        return () => clearTimeout(timer);
    }, [token]);

    return (
        <GuestLayout>
            <Head title="Processing" />

            <div className="min-h-screen">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-12 shadow-xl shadow-seafoam-500/5 text-center transition-all duration-300">
                        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-seafoam-200 border-t-seafoam-600"></div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-3">Preparing your experience...</h1>
                        <p className="text-gray-600 leading-relaxed">Please wait a moment.</p>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
