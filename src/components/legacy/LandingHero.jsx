import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Zap, Cpu, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FitLynqWireframeOrbit1 = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const gridRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSyncInitialized, setIsSyncInitialized] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  // Press & Hold Logic (from code 1)
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
          setIsSyncInitialized(true);
          
          // Final warp effect
          gsap.to(".room-wall", {
            scale: 1.2,
            rotationY: 5,
            duration: 1,
            ease: "power3.inOut",
            stagger: 0.05
          });
          
          gsap.to(".grid-line", {
            rotation: 180,
            duration: 2,
            ease: "power2.inOut"
          });
          
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
    setHoldProgress(0);
    // Reset grid warp
    gsap.to(".room-wall", {
      scale: 1,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // 1. 3D WIREFRAME PARTICLE ENGINE (From Code 2 - Balls spiraling into orbit)
    const particles = [];
    const particleCount = 400;
    const types = ['soccer', 'basket', 'tennis', 'rugby', 'volley'];

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        // Start at center (from code 2)
        this.x = 0;
        this.y = 0;
        this.z = Math.random() * 50;
        this.type = types[Math.floor(Math.random() * types.length)];
        this.size = 1 + Math.random() * 2; // Small size
        this.speed = 0.5 + Math.random() * 1; // Slow speed
        this.angle = Math.random() * Math.PI * 2;
        this.distance = 30 + Math.random() * 70;
        this.spin = Math.random() * 0.02 - 0.01;
        this.spinAngle = Math.random() * Math.PI * 2;
      }

      update() {
        // Move away from center (from code 2)
        const speedMultiplier = 1 + scrollProgress * 2;
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
        // Perspective projection
        const scale = 1000 / (this.z + 1);
        
        // Calculate 2D position with spiral effect (from code 2)
        const spiralOffset = this.z * 0.001;
        const xOffset = Math.cos(this.angle + spiralOffset) * this.distance;
        const yOffset = Math.sin(this.angle + spiralOffset) * this.distance;
        
        const x2d = canvas.width / 2 + (this.x + xOffset) * scale;
        const y2d = canvas.height / 2 + (this.y + yOffset) * scale;
        const s2d = this.size * scale;

        // Skip if off screen or too small
        if (x2d < -s2d || x2d > canvas.width + s2d || 
            y2d < -s2d || y2d > canvas.height + s2d || 
            s2d < 0.1) return;

        // Draw wireframe ball (simplified from code 2 for better performance)
        const alpha = Math.min(1, 800 / this.z) * 0.5;
        ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();

        ctx.save();
        ctx.translate(x2d, y2d);
        ctx.rotate(this.spinAngle);

        // Simple circle for small balls (from code 2)
        ctx.arc(0, 0, s2d / 2, 0, Math.PI * 2);
        
        // Add a cross for detail if large enough (from code 2)
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

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      // Clear with darker fade for space effect (from code 1)
      ctx.fillStyle = 'rgba(5, 1, 10, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw center gravitational pull effect (from code 1)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 600);
      gradient.addColorStop(0, 'rgba(124, 58, 237, 0.15)');
      gradient.addColorStop(0.3, 'rgba(124, 58, 237, 0.05)');
      gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
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

    // 2. GSAP SCROLL ORBITAL LOGIC - Make orbits expand (unchanged from code 1)
    let gCtx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 1,
          pin: true,
        }
      });

      // Make orbits expand outward as you scroll
      tl.to(".core-orbit", { 
        rotation: 360,
        scale: 2,
        duration: 2,
        ease: "power2.inOut"
      })
      .to(".particle-canvas", { 
        opacity: 0.9, 
        scale: 1.5 
      }, 0)
      .from(".feature-node", { 
        z: -2000, 
        opacity: 0, 
        stagger: 0.5,
        ease: "back.out(1.7)"
      }, 0.5)
      .to(".singularity-wrap", { 
        scale: 25,
        opacity: 0, 
        duration: 2,
        ease: "power3.in"
      }, 2.5)
      .from(".final-screen", { 
        opacity: 0, 
        y: 100, 
        duration: 1,
        ease: "power3.out"
      }, 3.5);

      // Mouse Parallax for Core
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

      // Track scroll progress for particle speed
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, containerRef);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      gCtx.revert();
    };
  }, [scrollProgress]);

  return (
    <div ref={containerRef} className="relative bg-[#05010a] text-white overflow-hidden font-mono">
      
      {/* 3D WIREFRAME PARTICLE CANVAS - Now with balls spiraling into orbit */}
      <canvas ref={canvasRef} className="particle-canvas fixed inset-0 z-0 opacity-70 pointer-events-none" />

      {/* PERSISTENT HUD - Removed fitLynq_v4 */}
      <div className="fixed inset-0 z-50 pointer-events-none p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="border-l-4 border-violet-600 pl-6 animate-pulse">
            <h1 className="text-3xl font-black italic tracking-tighter">SYSTEM READY</h1>
            <p className="text-[10px] tracking-[0.3em] opacity-50 uppercase">Gravitational Pull Active</p>
          </div>
          <div className="flex gap-6">
            <Cpu className="text-violet-600" size={24} />
            <Activity className="text-violet-600" size={24} />
          </div>
        </div>
        
        {/* Speed indicator - Updated for new particle behavior */}
        <div className="text-right">
          <p className="text-[10px] text-violet-500/60 tracking-widest">
            SPIRAL VELOCITY: {(1 + scrollProgress * 2).toFixed(1)}x
          </p>
          <p className="text-[8px] text-violet-400/40 tracking-widest mt-1">
            PARTICLES SPIRALING OUT: 400
          </p>
        </div>
      </div>

      {/* THE CORE SINGULARITY - Center Pull */}
      <div className="relative h-screen w-full flex items-center justify-center transform-style-3d" style={{ perspective: '1200px' }}>
        
        <div className="singularity-wrap relative z-10 flex items-center justify-center transform-style-3d">
          {/* ORBITS - Will expand on scroll */}
          <div className="core-orbit absolute w-[500px] h-[500px] border border-violet-600/20 rounded-full transform-style-3d">
            {/* Wireframe soccer ball */}
            <div className="absolute -top-6 left-1/2 w-8 h-8 border border-violet-400/50 rounded-full bg-transparent flex items-center justify-center shadow-[0_0_15px_#7c3aed]">
              <div className="w-6 h-6 border border-violet-400/50 rounded-full relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-violet-400/50"></div>
                  <div className="h-3 w-0.5 bg-violet-400/50 absolute"></div>
                </div>
              </div>
            </div>
            
            {/* Wireframe basketball */}
            <div className="absolute -bottom-6 left-1/2 w-8 h-8 border border-violet-400/50 rounded-full bg-transparent flex items-center justify-center shadow-[0_0_15px_#7c3aed]">
              <div className="w-6 h-6 border border-violet-400/50 rounded-full relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-0.5 bg-violet-400/50 transform rotate-45"></div>
                  <div className="w-4 h-0.5 bg-violet-400/50 transform -rotate-45"></div>
                </div>
              </div>
            </div>
            
            {/* Additional wireframe balls on orbit */}
            <div className="absolute left-1/2 -right-6 top-1/2 w-8 h-8 border border-violet-500/50 rounded-full bg-transparent flex items-center justify-center">
              <div className="w-5 h-5 border border-violet-500/50 rounded-full relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-violet-500/50 transform rotate-90"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second orbit */}
          <div className="core-orbit absolute w-[350px] h-[350px] border border-violet-600/30 rounded-full transform-style-3d rotate-45">
            {/* Wireframe tennis ball */}
            <div className="absolute top-1/2 -right-6 w-8 h-8 border border-violet-500/50 rounded-full bg-transparent flex items-center justify-center">
              <div className="w-5 h-5 border border-violet-500/50 rounded-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-violet-500/50"></div>
                </div>
              </div>
            </div>
            
            {/* Wireframe rugby ball */}
            <div className="absolute bottom-1/2 -left-6 w-10 h-6 border border-violet-500/50 rounded-full bg-transparent flex items-center justify-center">
              <div className="w-7 h-4 border border-violet-500/50 rounded-full relative transform rotate-45">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-0.5 bg-violet-500/50"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Central Core - Gravitational Center */}
          <div className="relative z-20">
            <div className="text-7xl font-black italic tracking-tighter p-8 border border-violet-600 bg-transparent relative">
              <div className="absolute -inset-8 border border-violet-500/20 rounded-full animate-pulse"></div>
              <div className="absolute -inset-12 border border-violet-600/10 rounded-full"></div>
              <div className="absolute -inset-16 border border-violet-700/5 rounded-full"></div>
              <span className="relative z-10 bg-gradient-to-r from-violet-400 via-violet-300 to-violet-500 bg-clip-text text-transparent">
                fitLynq
              </span>
            </div>
            {/* Gravitational pull effect */}
            <div className="absolute -inset-24 blur-3xl bg-violet-900/10 rounded-full -z-10"></div>
          </div>
        </div>

        {/* FLOATING DATA NODES */}
        <div className="feature-node absolute translate-x-[400px] -translate-y-[150px] w-64 p-6 bg-violet-950/20 backdrop-blur-xl border border-violet-500/30 rounded-lg">
          <Target className="text-violet-500 mb-4" />
          <h3 className="font-black italic text-xl">ARENA_SYNC</h3>
          <p className="text-[10px] opacity-60 leading-relaxed uppercase">Scanning local sectors for active sports infrastructure...</p>
        </div>

        <div className="feature-node absolute -translate-x-[400px] translate-y-[150px] w-64 p-6 bg-violet-950/20 backdrop-blur-xl border border-violet-500/30 rounded-lg">
          <Zap className="text-violet-500 mb-4" />
          <h3 className="font-black italic text-xl">LYNQ_MATCH</h3>
          <p className="text-[10px] opacity-60 leading-relaxed uppercase">Matching biometric skill data with available peers...</p>
        </div>

        {/* Additional feature nodes */}
        <div className="feature-node absolute -translate-x-[300px] -translate-y-[200px] w-56 p-5 bg-violet-950/20 backdrop-blur-xl border border-violet-500/30 rounded-lg">
          <div className="w-8 h-8 border border-violet-500 rounded-full flex items-center justify-center mb-3">
            <div className="w-4 h-4 border border-violet-400 rounded-full"></div>
          </div>
          <h3 className="font-black italic text-lg">WIREFRAME_NET</h3>
          <p className="text-[10px] opacity-60 leading-relaxed uppercase">3D neural sports mapping active</p>
        </div>

        {/* THE "SPARK" FINAL SCREEN - Modified with press & hold from code 1 */}
        <div className="final-screen absolute inset-0 z-[100] bg-[#05010a] flex flex-col items-center justify-center p-6">
          <h2 className="text-[10vw] font-black italic tracking-tighter leading-none mb-12">
            READY TO <br/><span className="text-violet-600">LYNQ?</span>
          </h2>
          
          {/* Press & Hold button from code 1 */}
          <div className="mb-8 tracking-[0.5em] text-violet-500 opacity-50 text-sm uppercase">
            Neural Link Initialization
          </div>
          
          <button 
            onMouseDown={handleHold}
            onMouseUp={handleHoldEnd}
            onTouchStart={handleHold}
            onTouchEnd={handleHoldEnd}
            className="relative w-64 h-64 border border-violet-900 rounded-full flex items-center justify-center group pointer-events-auto z-50"
          >
            <div 
              className="absolute inset-0 rounded-full border-2 border-violet-500 transition-all"
              style={{ clipPath: `inset(${100 - holdProgress}% 0 0 0)` }}
            />
            <span className="group-active:scale-95 transition-transform text-violet-400 font-bold text-lg">
              Press & Hold to Sync
            </span>
          </button>
          
          <div className="mt-8 text-violet-500/40 text-xs tracking-[1em] animate-pulse">
            {isSyncInitialized ? "SYNCHRONIZATION COMPLETE // READY" : "NEURAL CONNECTION // AWAITING"}
          </div>
        </div>

      </div>

      {/* 3D ROOM GRID - Complete room with walls, floor, and ceiling */}
      <div ref={gridRef} className="absolute inset-0 pointer-events-none z-20 opacity-40">
        
        {/* FLOOR - Main floor grid */}
        <div className="room-wall absolute bottom-0 left-0 right-0 h-[70vh]"
          style={{
            background: `
              linear-gradient(90deg, transparent 98%, rgba(124, 58, 237, 0.4) 100%),
              linear-gradient(0deg, transparent 98%, rgba(124, 58, 237, 0.4) 100%),
              linear-gradient(90deg, #7c3aed 1px, transparent 1px),
              linear-gradient(0deg, #7c3aed 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 80px 80px, 80px 80px',
            transform: 'perspective(1500px) rotateX(75deg)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, black 20%, transparent 100%)'
          }}
        />
        
        {/* FLOOR DETAIL LAYER */}
        <div className="room-wall absolute bottom-0 left-0 right-0 h-[50vh]"
          style={{
            background: `
              linear-gradient(45deg, transparent 99%, rgba(124, 58, 237, 0.2) 100%),
              linear-gradient(-45deg, transparent 99%, rgba(124, 58, 237, 0.2) 100%),
              linear-gradient(45deg, #7c3aed 0.5px, transparent 0.5px),
              linear-gradient(-45deg, #7c3aed 0.5px, transparent 0.5px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 120px 120px, 120px 120px',
            transform: 'perspective(1500px) rotateX(75deg) translateZ(-40px)',
            transformOrigin: 'bottom center',
            maskImage: 'linear-gradient(to top, black 15%, transparent 100%)'
          }}
        />
        
        {/* LEFT WALL - Full height wall */}
        <div className="room-wall absolute left-0 top-0 bottom-0 w-[50vw]"
          style={{
            background: `
              linear-gradient(90deg, transparent 98%, rgba(124, 58, 237, 0.3) 100%),
              linear-gradient(0deg, transparent 98%, rgba(124, 58, 237, 0.3) 100%),
              linear-gradient(90deg, #7c3aed 1px, transparent 1px),
              linear-gradient(0deg, #7c3aed 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 80px 80px, 80px 80px',
            transform: 'perspective(2000px) rotateY(60deg)',
            transformOrigin: 'left center',
            maskImage: 'linear-gradient(to right, black, transparent 70%)'
          }}
        />
        
        {/* RIGHT WALL - Full height wall */}
        <div className="room-wall absolute right-0 top-0 bottom-0 w-[50vw]"
          style={{
            background: `
              linear-gradient(90deg, rgba(124, 58, 237, 0.3) 0%, transparent 2%),
              linear-gradient(0deg, transparent 98%, rgba(124, 58, 237, 0.3) 100%),
              linear-gradient(90deg, #7c3aed 1px, transparent 1px),
              linear-gradient(0deg, #7c3aed 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 80px 80px, 80px 80px',
            transform: 'perspective(2000px) rotateY(-60deg)',
            transformOrigin: 'right center',
            maskImage: 'linear-gradient(to left, black, transparent 70%)'
          }}
        />
        
        {/* CEILING - Full width ceiling */}
        <div className="room-wall absolute top-0 left-0 right-0 h-[50vh]"
          style={{
            background: `
              linear-gradient(0deg, transparent 98%, rgba(124, 58, 237, 0.3) 100%),
              linear-gradient(90deg, transparent 98%, rgba(124, 58, 237, 0.3) 100%),
              linear-gradient(0deg, #7c3aed 1px, transparent 1px),
              linear-gradient(90deg, #7c3aed 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 80px 80px, 80px 80px',
            transform: 'perspective(2000px) rotateX(-60deg)',
            transformOrigin: 'top center',
            maskImage: 'linear-gradient(to bottom, black, transparent 70%)'
          }}
        />
        
        {/* BACK WALL - Far wall (perspective) */}
        <div className="room-wall absolute left-0 top-0 right-0 bottom-0"
          style={{
            background: `
              linear-gradient(90deg, transparent 98%, rgba(124, 58, 237, 0.2) 100%),
              linear-gradient(0deg, transparent 98%, rgba(124, 58, 237, 0.2) 100%),
              linear-gradient(90deg, #7c3aed 0.5px, transparent 0.5px),
              linear-gradient(0deg, #7c3aed 0.5px, transparent 0.5px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 120px 120px, 120px 120px',
            transform: 'perspective(2500px) translateZ(-500px)',
            opacity: 0.2
          }}
        />
        
        {/* ROOM CORNER LINES - Define room edges */}
        <div className="absolute left-0 top-0 bottom-0 w-[50vw] pointer-events-none"
          style={{
            transform: 'perspective(2000px) rotateY(60deg)',
            transformOrigin: 'left center',
          }}
        >
          {/* Left wall vertical line */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-600/50 to-transparent" />
        </div>
        
        <div className="absolute right-0 top-0 bottom-0 w-[50vw] pointer-events-none"
          style={{
            transform: 'perspective(2000px) rotateY(-60deg)',
            transformOrigin: 'right center',
          }}
        >
          {/* Right wall vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-600/50 to-transparent" />
        </div>
        
        {/* Floor-to-wall intersection lines */}
        <div className="absolute bottom-0 left-0 right-0 h-[70vh] pointer-events-none"
          style={{
            transform: 'perspective(1500px) rotateX(75deg)',
            transformOrigin: 'bottom center',
          }}
        >
          {/* Floor horizontal line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-600/40 to-transparent" />
        </div>
        
        {/* Ceiling-to-wall intersection lines */}
        <div className="absolute top-0 left-0 right-0 h-[50vh] pointer-events-none"
          style={{
            transform: 'perspective(2000px) rotateX(-60deg)',
            transformOrigin: 'top center',
          }}
        >
          {/* Ceiling horizontal line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-600/40 to-transparent" />
        </div>
        
        {/* Ripple effect elements */}
        <div className="grid-ripple absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-violet-500/30 rounded-full opacity-0" />
        <div className="grid-ripple absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-violet-500/20 rounded-full opacity-0" />
        
        {/* Grid distortion waves */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-violet-500/10 rounded-full"
              style={{
                width: `${150 + i * 50}%`,
                height: `${150 + i * 50}%`,
                animation: `pulse ${4 + i}s infinite ${i * 0.5}s`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Additional 3D perspective grid layers for depth */}
      <div className="absolute inset-0 pointer-events-none z-15 opacity-10">
        {/* Deep back wall */}
        <div className="absolute left-0 top-0 right-0 bottom-0"
          style={{
            background: `
              linear-gradient(30deg, transparent 99%, rgba(124, 58, 237, 0.1) 100%),
              linear-gradient(-30deg, transparent 99%, rgba(124, 58, 237, 0.1) 100%),
              linear-gradient(30deg, #7c3aed 0.3px, transparent 0.3px),
              linear-gradient(-30deg, #7c3aed 0.3px, transparent 0.3px)
            `,
            backgroundSize: '100% 100%, 100% 100%, 200px 200px, 200px 200px',
            transform: 'perspective(3000px) translateZ(-800px)',
          }}
        />
      </div>
      
      {/* Gravitational distortion rings */}
      <div className="absolute inset-0 pointer-events-none z-30 opacity-10">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-violet-500/20 rounded-full"
            style={{
              width: `${100 + i * 40}vh`,
              height: `${100 + i * 40}vh`,
              animation: `pulse ${3 + i * 0.5}s infinite ${i * 0.2}s`
            }}
          />
        ))}
      </div>
      
      {/* Wireframe scanlines - enhanced */}
      <div className="fixed inset-0 pointer-events-none z-40 opacity-10"
        style={{
          background: `
            repeating-linear-gradient(0deg, rgba(124, 58, 237, 0.05) 0px, rgba(124, 58, 237, 0.05) 1px, transparent 1px, transparent 3px),
            repeating-linear-gradient(90deg, rgba(124, 58, 237, 0.05) 0px, rgba(124, 58, 237, 0.05) 1px, transparent 1px, transparent 3px),
            radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.02) 0%, transparent 70%)
          `,
          backgroundSize: '100% 100%, 100% 100%, 100% 100%'
        }}
      />
      
      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.1; 
            transform: translateX(-50%) translateY(-50%) scale(1);
          }
          50% { 
            opacity: 0.3; 
            transform: translateX(-50%) translateY(-50%) scale(1.05);
          }
        }
        
        @keyframes ripple {
          0% {
            transform: translateX(-50%) translateY(-50%) scale(0);
            opacity: 0.5;
          }
          100% {
            transform: translateX(-50%) translateY(-50%) scale(1.5);
            opacity: 0;
          }
        }
        
        .grid-ripple {
          animation: ripple 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FitLynqWireframeOrbit1;