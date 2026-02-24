import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { HowItWorksSection } from './HowItWorksSection';
import { EarningsSection } from './EarningsSection';
import { PricingSection } from './PricingSection';
import { TestimonialsSection } from './TestimonialsSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  useEffect(() => {
    // Scroll progress bar
    gsap.to(".scroll-tracker", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5
        }
    });
    
    // Refresh ScrollTrigger to ensure positions are correct after mount
    ScrollTrigger.refresh();

    // Entrance Animation (Zoom In)
    gsap.fromTo("main", 
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        ease: "power2.out",
        delay: 0.2,
        onComplete: () => {
             // Clear transform to prevent creating a containing block that breaks position: fixed (GSAP Pinning)
             gsap.set("main", { clearProps: "transform" });
             ScrollTrigger.refresh();
        }
      }
    );
  }, []);

  return (
    <div className="bg-black text-white selection:bg-violet-600/30 overflow-x-hidden min-h-screen">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/10 pointer-events-none">
        <div className="scroll-tracker h-full bg-gradient-to-r from-violet-600 to-purple-600 origin-left scale-x-0" />
      </div>

      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <HowItWorksSection />
        <EarningsSection />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
