import { Head, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Debrief() {
    const { props } = usePage();
    const token = (props as any).token as string;
    const participant = (props as any).participant as { study_id: string } | null;
    const studyId = participant?.study_id || 'STUDY-XXXXXXX';

    return (
        <GuestLayout>
            <Head title="Debrief" />

            <div className="min-h-screen">
                <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-seafoam-100 px-4 py-2 text-sm font-medium text-seafoam-700">
                            Study Complete
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">Debrief</h1>
                    </div>

                    <div className="mb-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-xl shadow-seafoam-500/5 transition-all duration-300">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Thank you</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            You have completed the study. Your participation is valuable and helps us understand how personalised VR content might feel to people with specific fears.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            <strong>What happens next?</strong> The research team will review all responses. If you booked an interview, we will contact you at the scheduled time.
                        </p>
                    </div>

                    <div className="mb-8 rounded-3xl bg-red-50/80 backdrop-blur-xl border border-red-100/60 p-8 shadow-xl shadow-red-500/5 transition-all duration-300">
                        <h2 className="text-xl font-semibold text-red-900 mb-4">Support Resources</h2>
                        <p className="text-red-800 mb-4 leading-relaxed">
                            If you felt distressed during or after the study, please consider reaching out:
                        </p>
                        <ul className="list-disc list-inside text-red-800 space-y-2">
                            <li>Samaritans (UK): 116 123</li>
                            <li>Mind: mind.org.uk</li>
                            <li>NHS Urgent Care: nhs.uk</li>
                        </ul>
                    </div>

                    <div className="mb-8 rounded-3xl bg-sky-50/80 backdrop-blur-xl border border-sky-100/60 p-8 shadow-xl shadow-sky-500/5 transition-all duration-300">
                        <h2 className="text-xl font-semibold text-sky-900 mb-4">Withdraw Your Data</h2>
                        <p className="text-sky-800 mb-4 leading-relaxed">
                            You may withdraw your data at any time. To do so, contact the research team and quote your study ID:
                        </p>
                        <p className="mb-6 rounded-2xl bg-white/60 px-4 py-3 font-mono text-center text-sky-900">{studyId}</p>
                        <PrimaryButton onClick={() => window.print()} className="mb-4 px-6">
                            Save This Page
                        </PrimaryButton>
                    </div>

                    <div className="text-center">
                        <PrimaryButton onClick={() => { window.location.href = `/landing`; }} className="px-10 py-4 text-base">
                            Finish
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
