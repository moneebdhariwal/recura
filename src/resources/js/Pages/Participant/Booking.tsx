import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Booking() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || '';

    return (
        <GuestLayout>
            <Head title="Interview Booking" />

            <div className="min-h-screen">
                <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-seafoam-100 px-4 py-2 text-sm font-medium text-seafoam-700">
                            Complete
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">Interview Booking</h1>
                        <p className="text-gray-600 leading-relaxed">
                            Thank you for completing the study. If you are willing to take part in a short follow-up interview, please use the link below to book a time that suits you.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 text-center shadow-xl shadow-seafoam-500/5 transition-all duration-300">
                        <p className="text-gray-700 mb-8 leading-relaxed">
                            Interviews are approximately 20 minutes and can be conducted online or by phone.
                        </p>
                        <PrimaryButton
                            onClick={() => window.open('https://calendly.com', '_blank')}
                            className="px-10 py-4 text-base"
                        >
                            Book an Interview
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
