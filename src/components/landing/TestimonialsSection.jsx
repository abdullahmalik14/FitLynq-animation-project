import React from 'react';
import { Section } from '../ui/Section';

export const TestimonialsSection = () => {
  return (
    <Section className="bg-gradient-to-b from-black to-violet-900/10 reveal-section text-white">
        <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-black mb-6">
            Trusted by <span className="text-violet-600">Athletes</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of players who've transformed their sports experience
            </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
            {[
            {
                quote: "FitLynq made it so easy to find basketball partners. I'm playing 3x more than before!",
                name: "Alex Johnson",
                role: "Basketball Player",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
            },
            {
                quote: "As a court owner, the Boost Plan doubled my bookings. The commission tiers are amazing!",
                name: "Maria Garcia",
                role: "Tennis Court Owner",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80"
            },
            {
                quote: "The community aspect is incredible. Met my current soccer team through FitLynq!",
                name: "David Chen",
                role: "Soccer Enthusiast",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
            }
            ].map((testimonial, i) => (
            <div key={i} className="stagger-item bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 hover:border-violet-600/30 transition-colors">
                <div className="text-4xl text-violet-400/20 mb-6">"</div>
                <p className="text-lg mb-6 italic text-gray-300">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                <img 
                    src={testimonial.image} 
                    className="w-10 h-10 rounded-full"
                    alt={testimonial.name}
                />
                <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
                </div>
            </div>
            ))}
        </div>
    </Section>
  );
};
