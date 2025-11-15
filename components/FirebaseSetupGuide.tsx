import React from 'react';

const AlertTriangleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);
const RefreshCwIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M3 21v-5h5"></path></svg>
);


const Step = ({ number, title, description, isLink = false, href = '#' }: { number: number, title: string, description: string, isLink?: boolean, href?: string }) => (
    <li className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-500/20 text-orange-400 rounded-full font-bold border border-orange-500/30">
            {number}
        </div>
        <div>
            {isLink ? (
                 <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-orange-400 transition-colors flex items-center gap-2">
                    {title} <ExternalLinkIcon className="w-4 h-4" />
                </a>
            ) : (
                <h3 className="font-semibold text-white">{title}</h3>
            )}
           
            <p className="text-white/60">{description}</p>
        </div>
    </li>
);

const FirebaseSetupGuide: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 animate-fade-in-up">
            <div className="max-w-3xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 flex items-center justify-center bg-red-500/20 rounded-2xl border border-red-500/30 mb-6">
                        <AlertTriangleIcon className="w-8 h-8 text-red-400" />
                    </div>
                    <h1 className="text-4xl font-bold text-red-400 mb-4">Koneksi Database Gagal</h1>
                    <p className="text-lg text-white/70 mb-2">
                        Penyebab: <code className="bg-red-500/20 text-red-300 px-2 py-1 rounded-md text-base">Service firestore is not available</code>
                    </p>
                    <p className="text-white/60 mb-10 max-w-xl">
                        Ini berarti layanan <strong>Cloud Firestore</strong> belum diaktifkan pada proyek Firebase Anda.
                        Jangan khawatir, ini mudah diperbaiki!
                    </p>

                    <h2 className="text-2xl font-bold text-white mb-8">Ikuti Langkah Berikut:</h2>

                    <ol className="text-left space-y-5 max-w-md mx-auto mb-10">
                        <Step 
                            number={1} 
                            title="Buka Firebase Console"
                            description="Buka dasbor proyek Firebase Anda di tab baru."
                            isLink={true}
                            href="https://console.firebase.google.com/"
                        />
                         <Step 
                            number={2} 
                            title="Masuk ke Firestore Database"
                            description="Di menu kiri, klik 'Build', lalu pilih 'Firestore Database'."
                        />
                        <Step 
                            number={3} 
                            title="Buat Database Baru"
                            description="Klik tombol besar yang bertuliskan 'Create database'."
                        />
                         <Step 
                            number={4} 
                            title="Pilih Mode Produksi"
                            description="Pilih 'Start in production mode' lalu klik 'Next'."
                        />
                        <Step 
                            number={5} 
                            title="Aktifkan & Selesai!"
                            description="Pilih lokasi server (misal: asia-southeast2) dan klik 'Enable'. Tunggu prosesnya selesai."
                        />
                    </ol>

                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform duration-300"
                    >
                        <RefreshCwIcon className="w-5 h-5" />
                        Saya Sudah Selesai, Muat Ulang Aplikasi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FirebaseSetupGuide;
