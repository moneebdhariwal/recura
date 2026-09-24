import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Landing() {
    const newToken = `${Date.now()}-${Math.random().toString(36).substring(2)}`;

    return (
        <GuestLayout>
            <Head title="Study Information" />

            <div className="min-h-screen">
                <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="mb-8 inline-flex items-center rounded-full bg-seafoam-100 px-4 py-2 text-sm font-medium text-seafoam-700 transition-all duration-300 hover:scale-[1.02]">
                            Acceptability Study
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            AI-Assisted VR Memory Updating
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Thank you for your interest in this research study. Please read the information below before proceeding.
                        </p>
                    </div>

                    <div className="mb-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-xl shadow-seafoam-500/5 transition-all duration-300 hover:scale-[1.01]">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">About This Study</h2>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            This is a research study exploring how personalised virtual reality content might feel to people with specific fears or phobias. You will watch a short pre-recorded video and then complete a short questionnaire about your experience.
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            <strong>Important:</strong> This is not therapy. You will not receive real VR exposure or AI-generated content. The experience is a simulation using pre-recorded videos.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            The study takes approximately 15 minutes. You may withdraw at any time without giving a reason.
                        </p>
                    </div>

                    <div className="mb-12 rounded-3xl bg-sky-50/80 backdrop-blur-xl border border-sky-100/60 p-8 shadow-xl shadow-sky-500/5 transition-all duration-300 hover:scale-[1.01]">
                        <h3 className="text-xl font-semibold text-sky-900 mb-4">Before you continue, please confirm:</h3>
                        <ul className="space-y-3 text-sky-800">
                            <li className="flex items-center transition-all duration-300 hover:translate-x-1">
                                <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-sky-200 text-xs font-bold text-sky-700">1</span>
                                You are 18 years or older
                            </li>
                            <li className="flex items-center transition-all duration-300 hover:translate-x-1">
                                <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-sky-200 text-xs font-bold text-sky-700">2</span>
                                You understand this is a research study, not therapy
                            </li>
                            <li className="flex items-center transition-all duration-300 hover:translate-x-1">
                                <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-sky-200 text-xs font-bold text-sky-700">3</span>
                                You can withdraw at any time
                            </li>
                        </ul>
                    </div>

                    <div className="text-center">
                        <a href={`/eligibility?token=${newToken}`}>
                            <PrimaryButton className="text-base px-10 py-4">
                                I Understand — Start Study
                            </PrimaryButton>
                        </a>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
