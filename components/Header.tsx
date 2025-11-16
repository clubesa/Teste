
import React from 'react';

const LabirintarLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" className="text-goiaba">
    <path fill="currentColor" d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z M20 35 L20 65 L50 80 L80 65 L80 35 L50 20 Z M50 50 L70 40 L70 60 L50 70 L30 60 L30 40 Z" />
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-creme shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
           <LabirintarLogo />
          <h1 className="text-2xl md:text-3xl font-bold text-chocolate">
            LABirintar <span className="text-goiaba">IA</span>
          </h1>
        </div>
        <p className="hidden md:block text-sm text-chocolate/80 italic">Reencantando o tempo escolar com criatividade</p>
      </div>
    </header>
  );
};

export default Header;
