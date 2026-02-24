import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Target, Zap, Cpu, Activity } from 'lucide-react';

const HeroOrbit = ({ onComplete }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const gridRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0); // Kept for particle speed logic if needed
  const [isSyncInitialized, setIsSyncInitialized] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  // Press & Hold Logic
  const handleHold = () => {
    // Create warp effect on grid
    if (gridRef.current) {
      gsap.to(".room-wall", {
        scale: 1.1,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.1
      });
      
      // Create ripple effect
      gsap.to(".grid-ripple", {
        scale: 1.5,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    }
    
    let interval = setInterval(() => {
      setHoldProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          handleSyncComplete();
          return 100;
        }
        
        // Create pulsing warp effect during hold
        const warpIntensity = 1 + Math.sin(Date.now() * 0.01) * 0.05;
        gsap.to(".room-wall", {
          scale: warpIntensity,
          duration: 0.2,
          ease: "power1.out"
        });
        
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  };

  const handleHoldEnd = () => {
    if (!isSyncInitialized) {
      setHoldProgress(0);
      // Reset grid warp
      gsap.to(".room-wall", {
        scale: 1,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const handleSyncComplete = () => {
    setIsSyncInitialized(true);
    
    // Final warp effect
    const tl = gsap.timeline();

    tl.to(".room-wall", {
      scale: 1.5,
      rotationY: 10,
      opacity: 0,
      duration: 1.5,
      ease: "power3.inOut",
      stagger: 0.05
    })
    .to(".grid-line", {
      rotation: 180,
      duration: 2,
      ease: "power2.inOut"
    }, 0)
    .to(".particle-canvas", {
      scale: 3,
      opacity: 0,
      duration: 1.5,
      ease: "power2.in"
    }, 0)
    .to(".final-screen", {
      opacity: 0,
      scale: 1.5,
      duration: 1,
      ease: "power2.in"
    }, 0.2)
    .call(() => {
      // Trigger Landing Page mount slightly before fade starts
      if (onComplete) onComplete();
    }, null, 1.2)
    .to(containerRef.current, {
        opacity: 0,
        duration: 0.8
    }, 1.5);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // 1. 3D WIREFRAME PARTICLE ENGINE
    const particles = [];
    const particleCount = 400;
    const types = ['soccer', 'basket', 'tennis', 'rugby', 'volley'];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = 0;
        this.y = 0;
        this.z = Math.random() * 50;
        this.type = types[Math.floor(Math.random() * types.length)];
        this.size = 1 + Math.random() * 2;
        this.speed = 0.5 + Math.random() * 1;
        this.angle = Math.random() * Math.PI * 2;
        this.distance = 30 + Math.random() * 70;
        this.spin = Math.random() * 0.02 - 0.01;
        this.spinAngle = Math.random() * Math.PI * 2;
      }

      update() {
        // Move away from center
        const speedMultiplier = 1 + scrollProgress * 2; // scrollProgress could be just a time factor here
        this.z += this.speed * speedMultiplier;
        
        // Spin
        this.spinAngle += this.spin;
        
        // Reset if too far
        if (this.z > 1200) {
          this.reset();
          this.z = Math.random() * 50;
        }
      }

      draw() {
        const scale = 1000 / (this.z + 1);
        
        const spiralOffset = this.z * 0.001;
        const xOffset = Math.cos(this.angle + spiralOffset) * this.distance;
        const yOffset = Math.sin(this.angle + spiralOffset) * this.distance;
        
        const x2d = canvas.width / 2 + (this.x + xOffset) * scale;
        const y2d = canvas.height / 2 + (this.y + yOffset) * scale;
        const s2d = this.size * scale;

        if (x2d < -s2d || x2d > canvas.width + s2d || 
            y2d < -s2d || y2d > canvas.height + s2d || 
            s2d < 0.1) return;

        const alpha = Math.min(1, 800 / this.z) * 0.5;
        ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();

        ctx.save();
        ctx.translate(x2d, y2d);
        ctx.rotate(this.spinAngle);

        ctx.arc(0, 0, s2d / 2, 0, Math.PI * 2);
        
        if (s2d > 3) {
          ctx.moveTo(-s2d / 2, 0);
          ctx.lineTo(s2d / 2, 0);
          ctx.moveTo(0, -s2d / 2);
          ctx.lineTo(0, s2d / 2);
        }

        ctx.stroke();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.fillStyle = 'rgba(5, 1, 10, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 600);
      gradient.addColorStop(0, 'rgba(124, 58, 237, 0.15)');
      gradient.addColorStop(0.3, 'rgba(124, 58, 237, 0.05)');
      gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    render();

    // Mouse Parallax for Core
    let ctxGsap = gsap.context(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            gsap.to(".singularity-wrap", { 
            rotationY: x, 
            rotationX: -y, 
            duration: 2,
            ease: "power2.out"
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      ctxGsap.revert();
    };
  }, []); // Removed scrollProgress dependency to avoid re-running setup

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] bg-[#05010a] text-white overflow-hidden font-mono">
      
      {/* 3D WIREFRAME PARTICLE CANVAS */}
      <canvas ref={canvasRef} className="particle-canvas fixed inset-0 z-0 opacity-70 pointer-events-none" />

      {/* PERSISTENT HUD */}
      <div className="fixed inset-0 z-50 pointer-events-none p-6 md:p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="border-l-4 border-violet-600 pl-4 md:pl-6 animate-pulse">
            <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter">SYSTEM READY</h1>
            <p className="text-[10px] tracking-[0.3em] opacity-50 uppercase">Gravitational Pull Active</p>
          </div>
          <div className="flex gap-4 md:gap-6">
            <Cpu className="text-violet-600" size={24} />
            <Activity className="text-violet-600" size={24} />
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-[10px] text-violet-500/60 tracking-widest">
            SPIRAL VELOCITY: 1.0x
          </p>
          <p className="text-[8px] text-violet-400/40 tracking-widest mt-1">
            PARTICLES SPIRALING OUT: 400
          </p>
        </div>
      </div>

      {/* THE CORE SINGULARITY */}
      <div className="relative h-screen w-full flex items-center justify-center transform-style-3d" style={{ perspective: '1200px' }}>
        
        <div className="singularity-wrap relative z-10 flex items-center justify-center transform-style-3d">
          {/* ORBITS - Enhanced Gyroscopic System */}
          {[
            // size, duration, delay, reverse, tilt(deg), border-style
            [800, 60, 0, false, 0, 'border-violet-900/20'],
            [700, 50, -5, true, 15, 'border-dashed border-violet-600/10'],
            [600, 45, -10, false, -15, 'border-violet-800/20'],
            [500, 30, -15, true, 30, 'border-dotted border-violet-500/20'],
            [450, 25, -2, false, -30, 'border-violet-600/30'],
            [350, 20, -8, true, 45, 'border-dashed border-violet-400/20'],
            [250, 15, -4, false, -45, 'border-violet-500/30'],
            [900, 70, -20, false, 10, 'border-violet-900/10 opacity-50'], // Large corner-touching ring
          ].map(([size, duration, delay, reverse, tilt, borderClass], i) => (
             <div 
                key={`orbit-${i}`}
                className={`core-orbit absolute rounded-full transform-style-3d ${borderClass} border`}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  animation: `spin ${duration}s linear infinite ${reverse ? 'reverse' : ''}`,
                  animationDelay: `${delay}s`,
                  transform: `rotateX(${tilt}deg) rotateY(${tilt}deg)`
                }}
             />
          ))}

          {/* Main Node Orbit (Keeping the detailed one) */}
          <div className="core-orbit absolute w-[500px] h-[500px] border border-violet-600/40 rounded-full transform-style-3d animate-[spin_20s_linear_infinite]">
             <div className="absolute -top-6 left-1/2 w-8 h-8 border border-violet-400/50 rounded-full bg-black/50 flex items-center justify-center shadow-[0_0_15px_#7c3aed] backdrop-blur-sm">
               <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
             </div>
          </div>
          
          {/* Inclined Fast Node Orbit */}
          <div className="core-orbit absolute w-[350px] h-[350px] border border-violet-500/30 rounded-full transform-style-3d rotate-[60deg] animate-[spin_12s_linear_infinite_reverse]">
             <div className="absolute top-1/2 -right-6 w-6 h-6 border border-violet-500/50 rounded-full bg-violet-500/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
             </div>
          </div>

          {/* Central Core */}
          <div className="relative z-20 scale-75 md:scale-100">
            <div className="text-5xl md:text-7xl font-black italic tracking-tighter p-8 border border-violet-600 bg-transparent relative">
              <div className="absolute -inset-8 border border-violet-500/20 rounded-full animate-pulse"></div>
              <div className="absolute -inset-12 border border-violet-600/10 rounded-full"></div>
              <span className="relative z-10 bg-gradient-to-r from-violet-400 via-violet-300 to-violet-500 bg-clip-text text-transparent">
                fitLynq
              </span>
            </div>
          </div>
        </div>

        {/* FLOATING DATA NODES - Hidden on small screens or reduced */}
        <div className="hidden md:block feature-node absolute translate-x-[400px] -translate-y-[150px] w-64 p-6 bg-violet-950/20 backdrop-blur-xl border border-violet-500/30 rounded-lg">
          <Target className="text-violet-500 mb-4" />
          <h3 className="font-black italic text-xl">ARENA_SYNC</h3>
        </div>

        <div className="hidden md:block feature-node absolute -translate-x-[400px] translate-y-[150px] w-64 p-6 bg-violet-950/20 backdrop-blur-xl border border-violet-500/30 rounded-lg">
          <Zap className="text-violet-500 mb-4" />
          <h3 className="font-black italic text-xl">LYNQ_MATCH</h3>
        </div>

        {/* CONTROLS */}
        <div className="final-screen absolute inset-0 z-[100] flex flex-col items-center justify-center pt-[30vh]">
          
          <div className="mb-8 tracking-[0.5em] text-violet-500 opacity-50 text-xs md:text-sm uppercase">
            Neural Link Initialization
          </div>
          
          <button 
            onMouseDown={handleHold}
            onMouseUp={handleHoldEnd}
            onMouseLeave={handleHoldEnd}
            onTouchStart={handleHold}
            onTouchEnd={handleHoldEnd}
            className="relative w-48 h-48 md:w-64 md:h-64 border border-violet-900 rounded-full flex items-center justify-center group pointer-events-auto cursor-pointer select-none"
          >
            <div 
              className="absolute inset-0 rounded-full border-2 border-violet-500 transition-all duration-75"
              style={{ clipPath: `inset(${100 - holdProgress}% 0 0 0)` }}
            />
            <div className="absolute inset-0 rounded-full border border-violet-900 scale-90 opacity-50"></div>
            <span className="group-active:scale-95 transition-transform text-violet-400 font-bold text-sm md:text-lg">
              Press & Hold
            </span>
          </button>
          
          <div className="mt-8 text-violet-500/40 text-[10px] md:text-xs tracking-[1em] animate-pulse">
            {isSyncInitialized ? "SYNCHRONIZATION COMPLETE" : "AWAITING CONNECTION"}
          </div>
        </div>

      </div>

      {/* 3D ROOM GRID */}
      <div ref={gridRef} className="absolute inset-0 pointer-events-none z-20 opacity-40">
        <div className="room-wall absolute bottom-0 left-0 right-0 h-[70vh]"
          style={{
            background: `linear-gradient(90deg, #7c3aed 1px, transparent 1px), linear-gradient(0deg, #7c3aed 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
            transform: 'perspective(1500px) rotateX(75deg)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
          }}
        />
        {/* Ripple effect elements */}
        <div className="grid-ripple absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-violet-500/30 rounded-full opacity-0" />
      </div>

    </div>
  );
};

export default HeroOrbit;
