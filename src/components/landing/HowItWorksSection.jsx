import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorksSection = () => {
    const containerRef = useRef(null);
    const panelsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const panels = panelsRef.current;
        if (panels.length > 0) {
            const totalWidth = panels.length * window.innerWidth;
            
            gsap.to(panels, {
              xPercent: -100 * (panels.length - 1),
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                end: `+=${totalWidth}`,
                invalidateOnRefresh: true,
                anticipatePin: 1
              }
            });
        }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      step: "01",
      title: "Find Your Match",
      desc: "Choose your sport, location, and skill level. Create a new game or browse existing lobbies near you.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80",
      color: "from-violet-600/20"
    },
    {
      step: "02",
      title: "Connect & Confirm",
      desc: "Players join your lobby, or you join theirs. Chat, confirm details, and get ready to play!",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80",
      color: "from-purple-600/20"
    },
    {
      step: "03",
      title: "Play & Pay Seamlessly",
      desc: "Book your court directly through the app and split costs effortlessly. Focus on the game.",
      image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&q=80",
      color: "from-pink-600/20"
    },
    {
      step: "04",
      title: "Grow Your Network",
      desc: "Meet new players, build your team, and expand your sports community.",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section id="howitworks" ref={containerRef} className="min-h-screen py-20 bg-black text-white overflow-hidden">
      <div className="h-screen flex items-center overflow-hidden">
        <div className="flex">
          {steps.map((panel, i) => (
            <div 
                key={i} 
                className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center px-6"
                ref={el => panelsRef.current[i] = el}
            >
              <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <span className="text-violet-600 font-mono mb-4 block text-lg">// {panel.step}</span>
                  <h3 className="text-6xl md:text-7xl font-black mb-6 leading-[0.9]">{panel.title}</h3>
                  <p className="text-gray-400 text-lg max-w-lg">{panel.desc}</p>
                </div>
                <div className="relative">
                  <div className={`absolute -inset-4 bg-gradient-to-r ${panel.color || 'from-violet-600/20'} to-transparent rounded-[2.5rem] blur-xl`}></div>
                  <img 
                    src={panel.image}
                    className="relative rounded-[2rem] border border-white/10 w-full object-cover aspect-[4/3] max-h-[50vh]"
                    alt={panel.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
