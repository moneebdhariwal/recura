import { usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Eligibility() {
    const { props } = usePage();
    const token = (props as any).token as string;
    const errors = (props as any).errors || {};

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        if (!data.crisis_indicators) {
            data.crisis_indicators = 0;
        }
        router.post(`/eligibility?token=${token}`, data);
    };

    return (
        <GuestLayout>
            <Head title="Eligibility Screening" />

            <div className="min-h-screen">
                <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-seafoam-100 px-4 py-2 text-sm font-medium text-seafoam-700">
                            Step 1 of 4
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">Eligibility Screening</h1>
                        <p className="text-gray-600 leading-relaxed">Please answer the following questions to check your eligibility.</p>
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50/90 p-6 text-red-700 backdrop-blur-xl transition-all duration-300">
                            <p className="font-semibold">There were errors with your submission:</p>
                            <ul className="list-inside list-disc mt-2 space-y-1">
                                {Object.entries(errors).map(([key, message]) => (
                                    <li key={key}>{message as string}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-xl shadow-seafoam-500/5 space-y-8 transition-all duration-300">
                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                            <input id="age" name="age" type="number" min="18" max="120" required className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200" />
                        </div>

                        <div>
                            <label htmlFor="participant_type" className="block text-sm font-medium text-gray-700 mb-2">Participant Type</label>
                            <select id="participant_type" name="participant_type" required className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200">
                                <option value="public">Public</option>
                                <option value="professional">Professional</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="fear_type" className="block text-sm font-medium text-gray-700 mb-2">Which best describes your fear?</label>
                            <select id="fear_type" name="fear_type" required className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200">
                                <option value="spider">Spiders</option>
                                <option value="height">Heights</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="prior_experience" className="block text-sm font-medium text-gray-700 mb-2">Have you previously received therapy or support for this fear?</label>
                            <select id="prior_experience" name="prior_experience" required className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200">
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                        </div>

                        <div className="rounded-2xl bg-sky-50/80 border border-sky-100/60 p-6">
                            <p className="text-sm text-sky-800 leading-relaxed">
                                If you believe viewing mild content about spiders or heights would cause you unmanageable distress, or if you are experiencing an acute crisis, please do not proceed.
                            </p>
                            <div className="mt-4">
                                <label className="flex items-center cursor-pointer transition-all duration-300 hover:scale-[1.01]">
                                    <input type="checkbox" name="crisis_indicators" value="1" className="rounded border-gray-300 text-seafoam-600 shadow-sm transition-all duration-300" />
                                    <span className="ml-3 text-sm text-sky-900">I am currently in acute distress or crisis</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <PrimaryButton type="submit">Continue</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
