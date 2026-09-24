import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Exclusion() {
    return (
        <GuestLayout>
            <Head title="Not Eligible" />

            <div className="min-h-screen">
                <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 text-center shadow-xl shadow-seafoam-500/5 transition-all duration-300">
                        <div className="mb-4 inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
                            Not Eligible
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">You are not eligible for this study</h1>
                        <p className="text-gray-700 mb-8 leading-relaxed">
                            Based on your responses, we are unable to offer you a place in this study at this time. This may be because you indicated current acute distress or are under 18 years of age.
                        </p>
                        <p className="text-gray-700 mb-8 leading-relaxed">
                            If you need support, please contact a mental health professional or crisis service in your area.
                        </p>
                        <a href="/landing" className="inline-flex items-center text-seafoam-600 transition-all duration-300 hover:scale-[1.02] hover:text-seafoam-700">
                            Return to start
                        </a>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
