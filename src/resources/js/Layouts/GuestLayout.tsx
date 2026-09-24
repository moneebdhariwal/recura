import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-seafoam-50 via-mist-50 to-sky-50 transition-all duration-300">
            <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <a href="/" className="text-xl font-bold text-seafoam-600 transition-all duration-300 hover:scale-[1.02]">
                            Recura
                        </a>
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
}
