import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-10">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm text-white/50 border-t border-white/10 pt-8">
        <p>&copy; {new Date().getFullYear()} FAR TEAM ❤️ SUKSESKAN UMKM INDONESIA.</p>
        <p className="mt-2">Sebuah platform untuk memberdayakan dan memajukan UMKM Indonesia.</p>
      </div>
    </footer>
  );
};

export default Footer;
