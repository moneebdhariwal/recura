import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';

export default function Intake() {
    const { props } = usePage();
    const token = (props as any).token as string;
    const [name, setName] = useState('');
    const [triggerText, setTriggerText] = useState('');
    const [suds, setSuds] = useState(50);
    const [fearType, setFearType] = useState('spider');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(`/intake?token=${token}`, {
            name,
            trigger_text: triggerText,
            suds_score: suds,
            fear_type: fearType,
            demographics: {},
        });
    };

    return (
        <GuestLayout>
            <Head title="Intake Form" />

            <div className="min-h-screen">
                <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-seafoam-100 px-4 py-2 text-sm font-medium text-seafoam-700">
                            Step 3 of 4
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">Intake Form</h1>
                        <p className="text-gray-600 leading-relaxed">Help us tailor the experience to you. All fields are optional except the fear type and severity.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-xl shadow-seafoam-500/5 space-y-8 transition-all duration-300">
                        <div>
                            <InputLabel htmlFor="name" value="Your name (optional)" />
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-2 block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                                placeholder="e.g. Alex"
                            />
                            <p className="mt-2 text-sm text-gray-500">We will use this to personalise your introduction.</p>
                        </div>

                        <div>
                            <InputLabel htmlFor="fear_type" value="Which fear best describes you?" />
                            <select
                                id="fear_type"
                                value={fearType}
                                onChange={(e) => setFearType(e.target.value)}
                                className="mt-2 block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                            >
                                <option value="spider">Spiders</option>
                                <option value="height">Heights</option>
                            </select>
                        </div>

                        <div>
                            <InputLabel value={`How distressed would mild content about ${fearType}s make you feel? (0–100)`} />
                            <div className="mt-4 flex items-center space-x-4">
                                <span className="text-sm text-gray-500">Not at all</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={suds}
                                    onChange={(e) => setSuds(Number(e.target.value))}
                                    className="flex-1"
                                />
                                <span className="text-sm font-medium text-gray-700">{suds}</span>
                                <span className="text-sm text-gray-500">Extremely</span>
                            </div>
                        </div>

                        <div>
                            <InputLabel htmlFor="trigger_text" value="Trigger note (optional)" />
                            <textarea
                                id="trigger_text"
                                value={triggerText}
                                onChange={(e) => setTriggerText(e.target.value)}
                                rows={3}
                                className="mt-2 block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                                placeholder="e.g. being near the edge of a balcony"
                            />
                            <p className="mt-2 text-sm text-gray-500">This helps us personalise the scenario for you.</p>
                        </div>

                        <div className="flex items-center justify-end pt-2">
                            <PrimaryButton type="submit">Continue</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}

