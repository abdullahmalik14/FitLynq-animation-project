import React from 'react';
import { Twitter, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black py-16 px-6 border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-10 mb-12">
          <div>
            <span className="text-2xl font-black italic text-violet-600 tracking-tighter uppercase mb-4 block">FITLYNQ</span>
            <p className="text-gray-500 text-sm">
              Connecting athletes globally since 2026. Join the revolution of social sports management.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Platform</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">For Players</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">For Businesses</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">How It Works</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Pricing</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">About Us</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Careers</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Blog</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Press</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/5">
          <div className="text-xs text-gray-500 mb-4 md:mb-0">
            © 2026 FitLynq Inc. All rights reserved.
          </div>
          <div className="flex gap-4">
            {[Twitter, Instagram, Linkedin, Youtube, Facebook].map((Icon, i) => (
              <a 
                key={i}
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
