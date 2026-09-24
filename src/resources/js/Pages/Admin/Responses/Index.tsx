import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

interface Participant {
    study_id: string;
    track: string;
    completed_at: string | null;
    intake_response?: {
        fear_type: string;
        suds_score: number;
        severity_band: string;
        trigger_text?: string;
    };
}

interface ResponsesProps {
    participants: {
        data: Participant[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: { track?: string };
}

export default function Responses({ participants, filters }: ResponsesProps) {
    const handleExport = () => {
        router.visit('/admin/responses/export');
    };

    const handleWithdraw = (studyId: string) => {
        if (confirm(`Withdraw all data for participant ${studyId}? This cannot be undone.`)) {
            router.delete(`/admin/responses/${studyId}`);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Participant Responses" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Responses</h1>
                        <div className="flex gap-4">
                            <PrimaryButton onClick={handleExport}>Export CSV</PrimaryButton>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Study ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Track</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fear Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Completed</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {participants.data.map((p) => (
                                    <tr key={p.study_id}>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-mono">{p.study_id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 capitalize">{p.track}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 capitalize">{p.intake_response?.fear_type ?? '—'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 capitalize">{p.intake_response?.severity_band ?? '—'}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{p.completed_at ? new Date(p.completed_at).toLocaleDateString() : '—'}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleWithdraw(p.study_id)}
                                                className="text-red-600 hover:text-red-900 text-sm"
                                            >
                                                Withdraw
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {participants.links.length > 3 && (
                        <div className="mt-4 flex justify-center gap-2">
                            {participants.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 rounded text-sm ${link.active ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 border'}`}
                                    preserveScroll
                                >
                                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
