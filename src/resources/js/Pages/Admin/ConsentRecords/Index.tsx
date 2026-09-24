import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

interface ConsentRecord {
    id: number;
    study_id: string;
    consent_version: string;
    timestamp: string;
    contact_email?: string;
}

interface ConsentRecordsProps {
    records: {
        data: ConsentRecord[];
        links: { url: string | null; label: string; active: boolean }[];
    };
}

export default function ConsentRecords({ records }: ConsentRecordsProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Consent Records" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8">Consent Records</h1>

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Study ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Version</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Email</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {records.data.map((record) => (
                                    <tr key={record.id}>
                                        <td className="px-6 py-4 text-sm text-gray-900 font-mono">{record.study_id}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{record.consent_version}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{new Date(record.timestamp).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{record.contact_email ?? '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {records.links.length > 3 && (
                        <div className="mt-4 flex justify-center gap-2">
                            {records.links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 rounded text-sm ${link.active ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 border'}`}
                                >
                                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
