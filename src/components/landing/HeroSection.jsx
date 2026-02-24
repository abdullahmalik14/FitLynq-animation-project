import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef(null);
  const heroVideoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Parallax for hero
        gsap.to(".parallax-bg-1", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.2
            }
        });

        gsap.to(".parallax-bg-2", {
            yPercent: 40,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1.8
            }
        });


      // Entrance animations
      // Hero text cascade
      const heroLines = gsap.utils.toArray(".hero-line");
      gsap.from(heroLines, {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.4)",
        delay: 0.3
      });
      
      // Hero subtext
      gsap.from(".hero-subtext", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.7
      });
      
      // CTA buttons
      gsap.from(".hero-cta", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.9
      });
      
      // Stats cards
      gsap.from(".stat-card", {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        delay: 1.1
      });
      
      // Video reveal
      gsap.from(".hero-video-container", {
        scale: 0.85,
        opacity: 0,
        rotationY: 15,
        duration: 1.2,
        ease: "expo.out",
        delay: 0.4
      });

    }, containerRef);

    // Play video
    if(heroVideoRef.current) {
        heroVideoRef.current.play().catch(e => console.log("Autoplay blocked", e));
    }

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-section relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
        {/* Parallax Background Layers */}
        <div className="parallax-bg-1 absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-violet-600/20 via-purple-600/10 to-transparent blur-[200px] rounded-full" />
        </div>
        <div className="parallax-bg-2 absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-violet-500/5 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
            <div className="hero-line inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/10 animate-pulse">
            <Zap className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-bold text-violet-400">#1 Sports Connection Platform</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black leading-[0.85] mb-8 uppercase italic text-reveal text-white">
            <span className="hero-line block">Your Game.</span>
            <span className="hero-line block text-violet-600">Your Crew.</span>
            <span className="hero-line block">Made Easy.</span>
            </h1>
            
            <p className="hero-subtext text-xl text-gray-300 max-w-lg mb-10 leading-relaxed text-reveal">
            Instantly find, join, or create sports lobbies, book courts, and manage payments – all in one revolutionary app.
            <span className="block text-violet-300 font-semibold mt-2">Completely free for users.</span>
            </p>
            
            <div className="hero-cta flex flex-wrap gap-4 mb-12">
            <Button className="px-10 py-5 rounded-2xl font-bold text-lg h-auto">
                Get Started Free
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
            </div>

            {/* Floating Stats Cards */}
            <div className="flex gap-6">
            {[
                { value: "50K+", label: "Active Players" },
                { value: "500+", label: "Venues" },
                { value: "25+", label: "Sports" }
            ].map((stat, i) => (
                <div key={i} className="stat-card bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                <div className="text-2xl font-bold text-violet-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
            ))}
            </div>
        </div>

        <div className="hero-video-container relative perspective-1000">
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 to-purple-600/30 rounded-[3rem] blur-xl"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10">
            <video 
                ref={heroVideoRef}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                poster="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80"
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-playing-football-together-42976-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between">
                <div>
                    <div className="font-bold text-white">Live Basketball Match</div>
                    <div className="text-sm text-gray-300">Downtown Courts • 6 players</div>
                </div>
                <button className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-full text-sm font-bold text-white">
                    Join Now
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
  );
};
