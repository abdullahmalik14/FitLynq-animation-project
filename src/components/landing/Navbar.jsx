import React from 'react';
import { Button } from '../ui/Button';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-xl bg-black/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="nav-logo flex items-center gap-2 group cursor-pointer">
            <div className="w-2 h-2 bg-violet-600 rounded-full animate-pulse group-hover:scale-150 transition-transform"></div>
            <span className="text-2xl font-black italic text-violet-600 tracking-tighter uppercase group-hover:tracking-widest transition-all">
              FitLynq
            </span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            {['About', 'How it works', 'Earnings', 'Pricing', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '')}`}
                className="hover:text-white transition-colors hover:scale-105 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold hover:text-violet-400 transition-colors px-4 py-2 text-white">
            Sign In
          </button>
          <Button>Get Started</Button>
        </div>
      </div>
    </nav>
  );
};
