import { useEffect, useRef, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Video() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || '';
    const [showIntro, setShowIntro] = useState(true);
    const [overlayVisible, setOverlayVisible] = useState(false);
    const playerRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { props } = usePage();

    const video = (props as any).video as {
        id: number;
        title: string;
        file_path: string;
        supports_overlay: boolean;
        overlay_start_time?: number;
        overlay_end_time?: number;
    } | null;
    const intro = (props as any).intro as {
        intro_text: string;
        audio_url?: string;
    };
    const noVideo = (props as any).noVideo as boolean;

    useEffect(() => {
        if (intro?.audio_url && audioRef.current) {
            audioRef.current.play().catch(() => {});
        }
    }, [intro?.audio_url]);

    const handleAudioEnded = () => {
        setShowIntro(false);
        playerRef.current?.play();
    };

    const checkOverlay = () => {
        if (!playerRef.current || !video?.supports_overlay) return;
        const t = playerRef.current.currentTime;
        const start = video.overlay_start_time ?? 0;
        const end = video.overlay_end_time ?? 0;
        setOverlayVisible(t >= start && t <= end);
    };

    const handleVideoEnded = () => {
        window.location.href = `/discomfort-check?token=${token}`;
    };

    return (
        <GuestLayout>
            <Head title="Your Personalised Scenario" />

            <div className="min-h-screen">
                {showIntro && !noVideo && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="rounded-3xl bg-white/90 backdrop-blur-xl p-8 max-w-lg mx-4 text-center shadow-2xl transition-all duration-300">
                            <div className="mb-4 inline-flex items-center rounded-full bg-seafoam-100 px-3 py-1 text-xs font-medium text-seafoam-700">Personalised for you</div>
                            <p className="text-xl text-gray-900 mb-6 leading-relaxed">{intro?.intro_text}</p>
                            {intro?.audio_url && (
                                <audio ref={audioRef} src={intro.audio_url} onEnded={handleAudioEnded} />
                            )}
                            {!intro?.audio_url && (
                                <PrimaryButton onClick={handleAudioEnded} className="mt-4">Start Video</PrimaryButton>
                            )}
                        </div>
                    </div>
                )}

                <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                    {noVideo ? (
                        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-8 text-center shadow-xl shadow-seafoam-500/5 transition-all duration-300">
                            <div className="mb-4 inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">Unavailable</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Video Available Right Now</h2>
                            <p className="text-gray-700 mb-8 leading-relaxed">There is no matching video currently available for your selected fear type and intensity. Your session cannot continue at this time.</p>
                            <PrimaryButton onClick={() => { window.location.href = `/debrief?token=${token}`; }}>
                                Exit Study
                            </PrimaryButton>
                        </div>
                    ) : (
                        <div className="rounded-3xl bg-white/80 backdrop-blur-xl border border-white/60 p-4 shadow-xl shadow-seafoam-500/5 transition-all duration-300">
                            <video
                                ref={playerRef}
                                src={`/storage/${video?.file_path}`}
                                controls
                                onTimeUpdate={checkOverlay}
                                onEnded={handleVideoEnded}
                                className="w-full rounded-2xl"
                            >
                                {video?.supports_overlay && (
                                    <div
                                        className={`absolute bottom-16 left-4 rounded-2xl bg-seafoam-600/90 backdrop-blur-xl px-4 py-2 shadow-lg transition-opacity duration-300 ${overlayVisible ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        {intro?.intro_text}
                                    </div>
                                )}
                            </video>
                        </div>
                    )}

                    {!noVideo && (
                        <div className="mt-8 text-center">
                            <PrimaryButton
                                onClick={() => {
                                    if (confirm('Are you sure you want to stop the study?')) {
                                        window.location.href = `/debrief?token=${token}`;
                                    }
                                }}
                                className="bg-red-500 hover:bg-red-400 focus:ring-red-300"
                            >
                                Stop / Exit Study
                            </PrimaryButton>
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
