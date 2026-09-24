import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Consent() {
    const { props } = usePage();
    const token = (props as any).token as string;
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(`/consent?token=${token}`, {
            consent_given: true,
            contact_email: null,
        });
    };

    return (
        <GuestLayout>
            <Head title="Informed Consent" />

            <div className="min-h-screen">
                <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-seafoam-100 px-4 py-2 text-sm font-medium text-seafoam-700">
                            Step 2 of 4
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">Informed Consent</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-xl shadow-seafoam-500/5 space-y-8 transition-all duration-300">
                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <div className="flex items-start space-x-4 rounded-2xl bg-mist-50/80 p-6 transition-all duration-300 hover:scale-[1.01]">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-seafoam-100 text-seafoam-700 font-bold">1</div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Study Overview</h3>
                                    <p className="mt-1 text-sm">Acceptability Study: AI-Assisted VR Memory Updating</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 rounded-2xl bg-mist-50/80 p-6 transition-all duration-300 hover:scale-[1.01]">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-seafoam-100 text-seafoam-700 font-bold">2</div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">What you will do</h3>
                                    <p className="mt-1 text-sm">Watch a short pre-recorded video and complete a questionnaire. This is a research study, not therapy.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4 rounded-2xl bg-mist-50/80 p-6 transition-all duration-300 hover:scale-[1.01]">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-seafoam-100 text-seafoam-700 font-bold">3</div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Your rights</h3>
                                    <p className="mt-1 text-sm">Your participation is voluntary and you may withdraw at any time. Data is collected pseudonymously.</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white/60 p-6">
                            <label className="flex items-center cursor-pointer transition-all duration-300 hover:scale-[1.01]">
                                <input
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="h-5 w-5 rounded border-gray-300 text-seafoam-600 shadow-sm transition-all duration-300"
                                    required
                                />
                                <span className="ml-3 text-sm text-gray-700">I have read and understood the information above and consent to participate</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <PrimaryButton type="submit" disabled={!agreed}>Continue</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

