import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

interface QuestionnaireProps {
    items: {
        id: number;
        framework: string;
        construct: string;
        item_text: string;
        order: number;
    }[];
}

export default function Questionnaire() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || '';
    const [responses, setResponses] = useState<Record<number, number>>({});
    const [openText, setOpenText] = useState({ benefits: '', concerns: '', suggestions: '' });
    const { props } = usePage();

    const items = (props as any).items as QuestionnaireProps['items'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const responseData = Object.entries(responses).map(([item_id, likert_value]) => ({
            item_id: Number(item_id),
            likert_value,
        }));

        router.post(`/questionnaire?token=${token}`, {
            responses: responseData,
            open_text: openText,
        });
    };

    const likertOptions = [
        { value: 1, label: 'Strongly disagree' },
        { value: 2, label: 'Disagree' },
        { value: 3, label: 'Neutral' },
        { value: 4, label: 'Agree' },
        { value: 5, label: 'Strongly agree' },
    ];

    const grouped = items.reduce((acc: Record<string, typeof items>, item) => {
        if (!acc[item.framework]) acc[item.framework] = [];
        acc[item.framework].push(item);
        return acc;
    }, {});

    return (
        <GuestLayout>
            <Head title="Questionnaire" />

            <div className="min-h-screen">
                <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-seafoam-100 px-4 py-2 text-sm font-medium text-seafoam-700">
                            Final Step
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">Questionnaire</h1>
                        <p className="text-gray-600 leading-relaxed">Please rate your agreement with the following statements.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {Object.entries(grouped).map(([framework, frameworkItems]) => (
                            <div key={framework} className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-xl shadow-seafoam-500/5 transition-all duration-300">
                                <h2 className="text-xl font-semibold text-gray-900 mb-8">{framework} Items</h2>
                                <div className="space-y-8">
                                    {frameworkItems.map((item) => (
                                        <div key={item.id}>
                                            <p className="text-gray-800 mb-4 leading-relaxed">{item.item_text}</p>
                                            <div className="flex gap-3">
                                                {likertOptions.map((opt) => {
                                                    const selected = responses[item.id] === opt.value;
                                                    return (
                                                        <button
                                                            key={opt.value}
                                                            type="button"
                                                            onClick={() => setResponses({ ...responses, [item.id]: opt.value })}
                                                            className={`flex-1 py-3 px-2 rounded-2xl border-2 text-sm font-medium transition-all duration-300 hover:scale-[1.02] ${selected ? 'border-seafoam-600 bg-seafoam-50 text-seafoam-700 shadow-sm' : 'border-gray-200 text-gray-700 hover:border-gray-300'}`}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-xl shadow-seafoam-500/5 transition-all duration-300">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Open feedback</h2>
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">What did you like about this experience?</label>
                                    <textarea
                                        value={openText.benefits}
                                        onChange={(e) => setOpenText({ ...openText, benefits: e.target.value })}
                                        rows={3}
                                        className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">What concerns do you have?</label>
                                    <textarea
                                        value={openText.concerns}
                                        onChange={(e) => setOpenText({ ...openText, concerns: e.target.value })}
                                        rows={3}
                                        className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Any suggestions for improvement?</label>
                                    <textarea
                                        value={openText.suggestions}
                                        onChange={(e) => setOpenText({ ...openText, suggestions: e.target.value })}
                                        rows={3}
                                        className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end pt-2">
                            <PrimaryButton type="submit" className="px-8">Submit</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
