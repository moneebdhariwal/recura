import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Discomfort() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || '';
    const [rating, setRating] = useState(5);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(`/discomfort-check?token=${token}`, { rating });
    };

    return (
        <GuestLayout>
            <Head title="Discomfort Check" />

            <div className="min-h-screen">
                <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-10 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-seafoam-100 px-4 py-2 text-sm font-medium text-seafoam-700">
                            Step 4 of 4
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">Discomfort Check</h1>
                        <p className="text-gray-600 leading-relaxed">How uncomfortable are you feeling right now?</p>
                    </div>

                    <form onSubmit={handleSubmit} className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-xl shadow-seafoam-500/5 transition-all duration-300">
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-4">Rating: <span className="font-semibold text-seafoam-600">{rating}</span>/10</label>
                            <input
                                type="range"
                                name="rating"
                                min="0"
                                max="10"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-sm text-gray-500 mt-2">
                                <span>Not at all</span>
                                <span>Extremely</span>
                            </div>
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
