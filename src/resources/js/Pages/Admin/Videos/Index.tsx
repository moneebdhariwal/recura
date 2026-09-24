import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';

interface Video {
    id: number;
    title: string;
    phobia_type: string;
    severity_band: string;
    status: string;
    created_at: string;
}

interface VideosProps {
    videos: Video[];
}

export default function Index({ videos }: VideosProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Video Library" />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Video Library</h1>
                        <p className="mt-1 text-gray-600">Manage your uploaded video assets.</p>
                    </div>
                    <Link href="/admin/videos/create">
                        <PrimaryButton>Upload New Video</PrimaryButton>
                    </Link>
                </div>

                <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl shadow-seafoam-500/5 overflow-hidden transition-all duration-300">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-mist-50/80">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Title</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Phobia Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Severity</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Created</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white/60">
                                {videos.map((video) => (
                                    <tr key={video.id} className="transition-all duration-300 hover:bg-seafoam-50/50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{video.title}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 capitalize">{video.phobia_type}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600 capitalize">{video.severity_band}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center rounded-full bg-seafoam-100 px-3 py-1 text-xs font-medium text-seafoam-700">
                                                {video.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{video.created_at}</td>
                                    </tr>
                                ))}
                                {videos.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                                            No videos uploaded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
