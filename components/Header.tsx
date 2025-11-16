import React from 'react';
import ThemeToggle from './ThemeToggle';

const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.93 2.55a2 2 0 0 0-1.86 0L6.53 4.09a2 2 0 0 1-2.4 0L2.58 2.55a2 2 0 0 0-1.86 0L.2 4.09a2 2 0 0 0 0 3.42l1.54 1.54a2 2 0 0 1 0 2.4l-1.54 1.54a2 2 0 0 0 0 3.42l.52.52a2 2 0 0 0 1.86 0l1.54-1.54a2 2 0 0 1 2.4 0l1.54 1.54a2 2 0 0 0 1.86 0l.52-.52a2 2 0 0 0 0-3.42l-1.54-1.54a2 2 0 0 1 0-2.4l1.54-1.54a2 2 0 0 0 0-3.42Z" transform="translate(2.65 2.65) scale(0.8)" />
    <path d="m22 2-1.5 1.5M14 8l-1.5 1.5M10 14l-1.5 1.5M2 22l1.5-1.5" />
  </svg>
);

interface HeaderProps {
  children?: React.ReactNode;
}

const HeaderRoot: React.FC<HeaderProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
          <SparklesIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">JumpaUMKM</h1>
          <p className="text-sm text-gray-500 dark:text-white/50 transition-colors duration-300">FAR TEAM</p>
        </div>
      </div>
      {children}
    </div>
  );
};

// This allows us to attach the ThemeToggle component to Header, e.g. <Header.ThemeToggle />
const Header = Object.assign(HeaderRoot, {
  ThemeToggle: ThemeToggle,
});

export default Header;
