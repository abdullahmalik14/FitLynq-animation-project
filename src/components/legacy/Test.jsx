import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Share2, Zap, Shield, Target, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FitLynqExperience = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // --- 1. WIREFRAME SPORT MATRIX ---
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Minimalist wireframe shapes (Representing balls)
    const drawBallFrame = (x, y, size, type) => {
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)'; // Violet-600 with transparency
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      if (type === 0) { // Soccer/Basketball Circle with internal wireframe
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.moveTo(x - size / 2, y);
        ctx.lineTo(x + size / 2, y);
        ctx.moveTo(x, y - size / 2);
        ctx.lineTo(x, y + size / 2);
      } else if (type === 1) { // American Football/Rugby Ellipse
        ctx.ellipse(x, y, size / 2, size / 3, Math.PI / 4, 0, Math.PI * 2);
      } else { // Minimalist Square (Digital block)
        ctx.rect(x - size / 4, y - size / 4, size / 2, size / 2);
      }
      ctx.stroke();
    };

    const fontSize = 24;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(0).map(() => Math.random() * -100);

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 1, 10, 0.15)'; // Trail effect
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        // Randomly pick a ball type
        const type = Math.floor(Math.random() * 3);
        drawBallFrame(x, y, 12, type); // Much smaller size

        if (y > canvas.height && Math.random() > 0.99) { // Much slower reset
          drops[i] = 0;
        }
        drops[i] += 0.5; // Slower fall speed
      }
    };

    const matrixInterval = setInterval(draw, 60);

    // --- 2. GSAP SCROLL DEPTH ---
    let gCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: 1.2,
          pin: true,
        }
      });

      tl.to(".hero-heading", { z: 800, opacity: 0, duration: 2 })
        .to(".singularity", { rotation: 180, scale: 0.7, duration: 2 }, 0)
        .from(".feature-card", { 
          z: -1500, 
          opacity: 0, 
          stagger: 1, 
          rotationX: -45, 
          duration: 3 
        }, 1)
        .to(".singularity", { scale: 25, opacity: 0, duration: 2 }, 3)
        .from(".final-cta", { opacity: 0, y: 50, duration: 1 }, 4);
        
    }, containerRef);

    return () => {
      clearInterval(matrixInterval);
      gCtx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#05010a] text-white overflow-hidden font-mono">
      
      {/* BACKGROUND MATRIX */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* TOP HUD */}
      <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-50">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-violet-600 rounded-full animate-ping" />
          <span className="font-black italic tracking-tighter text-xl text-white">fitLynq</span>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.4em] text-violet-400/60">
          <span>Matchmaking</span>
          <span>Venues</span>
          <span>Analytics</span>
        </div>
        <div className="p-2 border border-violet-500/20 rounded-full">
          <Share2 size={16} className="text-violet-500" />
        </div>
      </nav>

      {/* 3D CONTENT STAGE */}
      <div className="relative h-screen w-full flex items-center justify-center transform-style-3d" style={{ perspective: '1500px' }}>
        
        {/* CENTER SINGULARITY */}
        <div className="singularity relative z-10 w-80 h-80 flex items-center justify-center transform-style-3d">
          <div className="absolute inset-0 border-[1px] border-violet-600/50 rounded-full shadow-[0_0_60px_rgba(124,58,237,0.2)]" />
          <div className="absolute inset-[-40px] border-[0.5px] border-dashed border-violet-500/20 rounded-full animate-[spin_30s_linear_infinite]" />
          <h2 className="text-4xl font-black italic tracking-tighter text-violet-500 uppercase">System_Core</h2>
        </div>

        {/* HERO TITLE */}
        <div className="hero-heading absolute z-20 text-center pointer-events-none">
          <h1 className="text-[10vw] font-black italic tracking-tighter leading-none text-white">
            LINKED <br/> <span className="text-transparent" style={{ WebkitTextStroke: '1px #7c3aed' }}>ATHLETICS</span>
          </h1>
        </div>

        {/* FEATURE CARDS (Wireframe Style) */}
        <div className="feature-card absolute w-80 p-8 border border-violet-500/30 bg-black/40 backdrop-blur-md rounded-sm translate-x-[350px]">
          <Zap className="text-violet-500 mb-4" size={32} />
          <h3 className="text-xl font-black italic mb-2 tracking-tighter uppercase text-violet-400">Match_Sync</h3>
          <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-widest">Finding active peer groups within 5.2km radius. Analyzing skill parity...</p>
        </div>

        <div className="feature-card absolute w-80 p-8 border border-violet-500/30 bg-black/40 backdrop-blur-md rounded-sm -translate-x-[350px] translate-y-[100px]">
          <Target className="text-violet-500 mb-4" size={32} />
          <h3 className="text-xl font-black italic mb-2 tracking-tighter uppercase text-violet-400">Arena_Scan</h3>
          <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-widest">Mapping verified courts and stadiums. Real-time availability verified.</p>
        </div>

        {/* THE FINAL DESTINATION */}
        <div className="final-cta absolute inset-0 z-[60] flex flex-col items-center justify-center bg-[#05010a] pointer-events-none">
          <h2 className="text-7xl md:text-9xl font-black italic tracking-tighter mb-12">
            READY TO <br/><span className="text-violet-600">LYNQ?</span>
          </h2>
          <button className="pointer-events-auto group relative flex items-center gap-4 px-12 py-6 border border-violet-600 text-violet-600 font-black italic text-xl hover:bg-violet-600 hover:text-white transition-all duration-500 shadow-[0_0_40px_rgba(124,58,237,0.2)]">
            INITIALIZE_SYNC
            <ChevronRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

      </div>

      {/* BOTTOM DATA OVERLAY */}
      <div className="fixed bottom-8 left-8 z-50 text-[10px] text-violet-500/40 uppercase tracking-[0.5em] flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-12 h-[1px] bg-violet-600/40" />
          <span>Status: Protocol_V4</span>
        </div>
        <span>©2026 fitLynq_Corp</span>
      </div>

      {/* SCANLINE FILTER */}
      <div className="fixed inset-0 z-[100] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(124,58,237,0.02),rgba(0,0,0,0),rgba(124,58,237,0.02))] bg-[length:100%_4px,100%_100%]" />
    </div>
  );
};

export default FitLynqExperience;