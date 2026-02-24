import React from 'react';
import { Users, Calendar, CreditCard } from 'lucide-react';
import { Section } from '../ui/Section';

export const AboutSection = () => {
  return (
    <Section id="about">
        <div className="flex flex-col md:flex-row gap-16 items-end mb-20 text-white">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter flex-1">
            STOP<br />
            WISHING.<br />
            <span className="text-violet-600">START PLAYING.</span>
            </h2>
            <div className="flex-1">
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                The frustration of finding a game ends here. FitLynq solves the pain points that keep athletes off the field.
            </p>
            <div className="space-y-3">
                {[
                "Can't find enough players for your favorite sport?",
                "Hassle of booking courts and collecting money?",
                "Stuck in the same old routine?",
                "Want to try new sports but don't know where to start?"
                ].map((problem, i) => (
                <div key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-violet-600 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300">{problem}</span>
                </div>
                ))}
            </div>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-white">
            {[
            { icon: Users, title: "Global Lobbies", desc: "Join thousands of active players worldwide" },
            { icon: Calendar, title: "Instant Booking", desc: "Book courts with one tap, no calls needed" },
            { icon: CreditCard, title: "Secure Payments", desc: "Built-in escrow and split payments" }
            ].map((feature, i) => (
            <div key={i} className="stagger-item feature-card p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[2rem] hover:border-violet-600/30 transition-colors">
                <div className="w-12 h-12 bg-violet-600/20 rounded-2xl mb-6 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-violet-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
            </div>
            ))}
        </div>
    </Section>
  );
};
