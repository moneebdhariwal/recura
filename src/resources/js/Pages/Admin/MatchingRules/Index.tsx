import { useRef } from 'react';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

interface Rule {
    id: number;
    fear_type: string;
    severity_band: string;
    video_asset: { id: number; title: string };
}

interface MatchingRulesProps {
    rules: Rule[];
    videos: { id: number; title: string }[];
}

export default function MatchingRules({ rules, videos }: MatchingRulesProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(formRef.current!);
        router.post('/admin/matching-rules', formData);
    };

    return (
        <AuthenticatedLayout>
            <Head title="Matching Rules" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Matching Rules</h1>
                    <p className="mt-1 text-gray-600">Map fear types and severity bands to videos.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-xl shadow-seafoam-500/5 transition-all duration-300">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Rule</h2>
                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Fear Type</label>
                                <select name="fear_type" className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200">
                                    <option value="spider">Spider</option>
                                    <option value="height">Height</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Severity Band</label>
                                <select name="severity_band" className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200">
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Video</label>
                                <select name="video_asset_id" className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200">
                                    {videos.map((video) => (
                                        <option key={video.id} value={video.id}>{video.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <PrimaryButton type="submit">Add Rule</PrimaryButton>
                            </div>
                        </form>
                    </div>

                    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-seafoam-500/5 overflow-hidden transition-all duration-300">
                        <div className="px-8 py-6">
                            <h2 className="text-xl font-semibold text-gray-900">Existing Rules</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-mist-50/80">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Fear Type</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Severity</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Video</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white/60">
                                    {rules.map((rule) => (
                                        <tr key={rule.id} className="transition-all duration-300 hover:bg-seafoam-50/50">
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 capitalize">{rule.fear_type}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600 capitalize">{rule.severity_band}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{rule.video_asset.title}</td>
                                        </tr>
                                    ))}
                                    {rules.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-12 text-center text-sm text-gray-500">
                                                No rules configured yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
