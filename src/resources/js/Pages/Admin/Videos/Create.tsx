import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

interface CreateProps {
    videos: { id: number; title: string }[];
}

export default function Create({ videos }: CreateProps) {
    return (
        <AuthenticatedLayout>
            <Head title="Upload Video" />

            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Upload Video</h1>
                    <p className="mt-1 text-gray-600">Add a new video asset to the library.</p>
                </div>

                <form action="/admin/videos" method="POST" encType="multipart/form-data" className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 shadow-xl shadow-seafoam-500/5 space-y-6 transition-all duration-300">
                    <input type="hidden" name="_token" value={typeof document !== 'undefined' ? (document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '') : ''} />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Phobia Type</label>
                            <select
                                name="phobia_type"
                                className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                            >
                                <option value="spider">Spider</option>
                                <option value="height">Height</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Severity Band</label>
                            <select
                                name="severity_band"
                                className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Counterbalance Group</label>
                            <select
                                name="counterbalance_group"
                                className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                            >
                                <option value="A">A</option>
                                <option value="B">B</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Video File (MP4)</label>
                        <input
                            type="file"
                            name="video_file"
                            accept="video/mp4"
                            className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                            required
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            id="supports_overlay"
                            type="checkbox"
                            name="supports_overlay"
                            value="1"
                            className="rounded border-gray-300 text-seafoam-600 shadow-sm transition-all duration-300"
                        />
                        <label htmlFor="supports_overlay" className="ml-3 text-sm text-gray-700">
                            Supports personalisation overlay
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Overlay Start Time (seconds)</label>
                            <input
                                type="number"
                                name="overlay_start_time"
                                className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Overlay End Time (seconds)</label>
                            <input
                                type="number"
                                name="overlay_end_time"
                                className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description (optional)</label>
                        <textarea
                            name="description"
                            rows={3}
                            className="block w-full rounded-2xl border-gray-200 bg-white/80 shadow-sm transition-all duration-300 focus:border-seafoam-300 focus:ring-seafoam-200"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="inline-flex items-center rounded-full border border-transparent bg-seafoam-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-seafoam-500 hover:scale-[1.02] focus:bg-seafoam-500 focus:outline-none focus:ring-2 focus:ring-seafoam-300 focus:ring-offset-2 active:bg-seafoam-700">
                            Upload Video
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}