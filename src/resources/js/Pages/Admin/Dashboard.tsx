import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

interface Stats {
    total_participants: number;
    completed_participants: number;
    active_videos: number;
    matching_rules: number;
}

interface DashboardProps {
    stats: Stats;
}

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                    <p className="text-gray-600 leading-relaxed">Welcome to the Recura admin panel.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-6 shadow-xl shadow-seafoam-500/5 transition-all duration-300 hover:scale-[1.01]">
                        <div className="text-sm font-medium text-gray-500 mb-1">Total Participants</div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total_participants}</div>
                    </div>
                    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-6 shadow-xl shadow-seafoam-500/5 transition-all duration-300 hover:scale-[1.01]">
                        <div className="text-sm font-medium text-gray-500 mb-1">Completed</div>
                        <div className="text-3xl font-bold text-seafoam-600">{stats.completed_participants}</div>
                    </div>
                    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-6 shadow-xl shadow-seafoam-500/5 transition-all duration-300 hover:scale-[1.01]">
                        <div className="text-sm font-medium text-gray-500 mb-1">Active Videos</div>
                        <div className="text-3xl font-bold text-gray-900">{stats.active_videos}</div>
                    </div>
                    <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-6 shadow-xl shadow-seafoam-500/5 transition-all duration-300 hover:scale-[1.01]">
                        <div className="text-sm font-medium text-gray-500 mb-1">Matching Rules</div>
                        <div className="text-3xl font-bold text-gray-900">{stats.matching_rules}</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <a href="/admin/videos/create" className="block rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-6 shadow-xl shadow-seafoam-500/5 transition-all duration-300 hover:scale-[1.01]">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Video</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Add a new video asset to the library.</p>
                    </a>
                    <a href="/admin/matching-rules" className="block rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-6 shadow-xl shadow-seafoam-500/5 transition-all duration-300 hover:scale-[1.01]">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Matching Rules</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">Map fear types and severity bands to videos.</p>
                    </a>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
