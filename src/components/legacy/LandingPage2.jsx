import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Users, Calendar, CreditCard, ChevronRight, 
  Twitter, Instagram, Linkedin, Youtube, Play, CheckCircle2,
  TrendingUp, Award, Crown, Zap, Star, Shield, Globe, Target,
  Briefcase, DollarSign, Percent, BadgeCheck, ArrowRight,
  Mail, Phone, MapPin, Facebook, MessageCircle, Sparkles,
  Trophy, Clock, Gift, Target as TargetIcon, Filter, BarChart3,
  Rocket, Eye, Zap as Lightning, BarChart, Building2, Coins,
  X, Sparkle
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function FitLynqLanding() {
  const root = useRef(null);
  const ballRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const heroVideoRef = useRef(null);
  const [yearly, setYearly] = useState(true);
  const [activePricingDetail, setActivePricingDetail] = useState(null);
  const heroContentRef = useRef(null);

  /* ===================== ENHANCED LOADING SEQUENCE ===================== */
  useEffect(() => {
    let progress = { value: 0 };
    const tl = gsap.timeline();
    
    // Create loading bar
    const loadingBar = document.querySelector('.loading-bar-fill');
    const runner = document.querySelector('.runner-svg');
    
    // 1. Initial runner animation
    tl.to(runner, {
      x: -10,
      duration: 0.5,
      ease: "power1.inOut"
    });
    
    // 2. Loading progress with synchronized runner animation
    tl.to(progress, {
      value: 100,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: () => {
        const percent = Math.floor(progress.value);
        if (document.querySelector(".percent")) {
          document.querySelector(".percent").textContent = percent + "%";
        }
        if (loadingBar) {
          loadingBar.style.width = percent + "%";
        }
        
        // Sync runner movement with progress
        if (runner) {
          // Runner moves forward as loading progresses
          gsap.set(runner, { x: -10 + (percent * 0.3) });
          
          // Subtle runner animation
          if (percent % 25 === 0 && percent < 100) {
            gsap.to(runner, {
              y: -8,
              duration: 0.15,
              yoyo: true,
              repeat: 1
            });
          }
        }
        
        // Football gets ready to kick at 95%
        if (ballRef.current && percent >= 95 && percent < 100) {
          gsap.to(ballRef.current, {
            scale: 1.15,
            duration: 0.3,
            yoyo: true,
            repeat: -1
          });
        }
      },
      onComplete: () => {
        // FINAL KICK ANIMATION
        gsap.killTweensOf(ballRef.current);
        
        // Wind up
        gsap.to(runner, {
          x: -30,
          rotate: -20,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            // THE KICK
            gsap.to(runner, {
              x: 50,
              rotate: 30,
              duration: 0.15,
              ease: "power4.out"
            });
            
            // BALL FLYING TOWARD SCREEN
            gsap.to(ballRef.current, {
              z: 1500,
              scale: 200,
              x: 150,
              y: -100,
              rotation: 1080,
              duration: 0.8,
              ease: "power4.in",
              onStart: () => {
                // Hide loader elements
                gsap.to(".loader-text", { 
                  opacity: 0,
                  y: -30,
                  duration: 0.3 
                });
                gsap.to(".loading-bar", {
                  opacity: 0,
                  duration: 0.3
                });
                
                // Create particle explosion
                for(let i = 0; i < 25; i++) {
                  const particle = document.createElement('div');
                  particle.className = 'particle';
                  particle.style.cssText = `
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    background: linear-gradient(45deg, #8b5cf6, #7c3aed);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                  `;
                  document.querySelector('.loader-particles').appendChild(particle);
                  
                  gsap.to(particle, {
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                    opacity: 0,
                    scale: 0,
                    duration: 1,
                    ease: "power4.out",
                    onComplete: () => particle.remove()
                  });
                }
              },
              onComplete: () => {
                setLoaded(true);
                // Start hero video
                if (heroVideoRef.current) {
                  heroVideoRef.current.play();
                }
                // Trigger hero animations
                heroEntranceAnimation();
              }
            });
          }
        });
      }
    });

  }, []);

  /* ===================== HERO ENTRANCE ANIMATION ===================== */
  const heroEntranceAnimation = () => {
    const ctx = gsap.context(() => {
      // Ball transforms into hero background glow
      gsap.fromTo(".hero-glow-ball",
        { scale: 0.1, opacity: 1 },
        {
          scale: 18,
          opacity: 0.25,
          duration: 1.2,
          ease: "expo.out"
        }
      );
      
      // Hero text cascade animation
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
      
      // Stats cards - FIXED: No bouncing, just smooth fade in with subtle scale
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
      
      // Subtle pulsing CTA button - not bouncing
      gsap.to(".main-cta", {
        boxShadow: "0 0 40px rgba(124, 58, 237, 0.5)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
    }, heroContentRef);
    
    return () => ctx.revert();
  };

    /* ===================== PAGE ANIMATIONS ===================== */
  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      // Parallax for hero
      gsap.to(".parallax-bg-1", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.2
        }
      });

      gsap.to(".parallax-bg-2", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: 1.8
        }
      });
      
      // Horizontal scroll tracking animation - FIXED: This was missing!
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

      // FIXED: Horizontal Scroll Section
      const horizontalContainer = document.querySelector('.horizontal-container');
      const panels = gsap.utils.toArray('.horizontal-panel');
      
      if (horizontalContainer && panels.length > 0) {
        const totalWidth = panels.length * window.innerWidth;
        
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".horizontal-container",
            pin: true,
            scrub: 1,
            end: `+=${totalWidth}`,
            invalidateOnRefresh: true,
            anticipatePin: 1
          }
        });
      }

      // Section reveals
      gsap.utils.toArray(".reveal-section").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.1
        });
      });

      // Counter animations
      gsap.utils.toArray(".count-up").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          onEnter: () => {
            const target = parseInt(el.getAttribute("data-target"));
            const obj = { value: 0 };
            gsap.to(obj, {
              value: target,
              duration: 2,
              ease: "power3.out",
              onUpdate: () => {
                el.textContent = Math.floor(obj.value).toLocaleString();
              }
            });
          }
        });
      });

      // Interactive pricing card hover effects
      gsap.utils.toArray(".pricing-card").forEach((card) => {
        const hoverTl = gsap.timeline({ paused: true });
        hoverTl
          .to(card, { y: -10, duration: 0.3, ease: "power2.out" }, 0)
          .to(card.querySelector(".pricing-card-border"), { 
            borderColor: "rgba(124, 58, 237, 0.4)",
            duration: 0.3 
          }, 0);

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());
      });

    }, root);

    return () => ctx.revert();
  }, [loaded]);

  // Premium Plan Details Component
  const PremiumDetails = () => (
    <div className="mt-8 pt-8 border-t border-white/10">
      <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Rocket className="w-5 h-5 text-amber-400" />
        Premium Features Explained
      </h4>
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl">
          <Filter className="w-5 h-5 text-amber-400 mt-0.5" />
          <div>
            <div className="font-semibold">Top Search Ranking Algorithm</div>
            <div className="text-sm text-gray-300">
              Your lobbies appear first in search results, similar to Google sponsored listings.
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl">
          <BarChart3 className="w-5 h-5 text-amber-400 mt-0.5" />
          <div>
            <div className="font-semibold">Full Analytics Dashboard</div>
            <div className="text-sm text-gray-300">
              Complete insights on bookings, revenue, customer behavior, and performance metrics.
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl">
          <Eye className="w-5 h-5 text-amber-400 mt-0.5" />
          <div>
            <div className="font-semibold">Maximum Visibility</div>
            <div className="text-sm text-gray-300">
              Featured placement across the platform, priority in recommendations, and spotlight positioning.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Boost Plan Details Component
  const BoostDetails = () => (
    <div className="mt-8 pt-8 border-t border-white/10">
      <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Lightning className="w-5 h-5 text-cyan-400" />
        Boost Priority Features
      </h4>
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-xl">
          <TrendingUp className="w-5 h-5 text-cyan-400 mt-0.5" />
          <div>
            <div className="font-semibold">Algorithm Boost</div>
            <div className="text-sm text-gray-300">
              Your lobbies are pushed to higher priority in search results and recommendations.
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-xl">
          <BarChart className="w-5 h-5 text-cyan-400 mt-0.5" />
          <div>
            <div className="font-semibold">Basic Analytics</div>
            <div className="text-sm text-gray-300">
              Essential metrics on bookings and performance to help you grow.
            </div>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-xl">
          <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5" />
          <div>
            <div className="font-semibold">Monthly Promotion</div>
            <div className="text-sm text-gray-300">
              1 featured promotion per month to highlight your business.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Payout Tiers Detail Component
  const PayoutTiersDetail = () => (
    <div className="mt-8 pt-8 border-t border-white/10">
      <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-emerald-400" />
        Higher Payout Tiers (90-95%)
      </h4>
      <p className="text-gray-300 mb-6 text-sm">
        Earn more as you grow. For every $100 booking:
        <span className="block text-emerald-300 font-semibold mt-2">• Base: You earn $90 | FitLynq gets $10</span>
        <span className="block text-emerald-300 font-semibold">• Tier 6: You earn $95 | FitLynq gets $5</span>
      </p>
      
      <div className="space-y-3">
        {[
          { level: "Base", revenue: "$0-2,999", percent: "90%", active: true },
          { level: "Level 2", revenue: "$3,000-9,999", percent: "91%" },
          { level: "Level 3", revenue: "$10,000-19,999", percent: "92%" },
          { level: "Level 4", revenue: "$20,000-49,999", percent: "93%" },
          { level: "Level 5", revenue: "$50,000-99,999", percent: "94%" },
          { level: "Level 6", revenue: "$100,000+", percent: "95%" }
        ].map((tier, i) => (
          <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${tier.active ? 'bg-emerald-500' : 'bg-white/30'}`} />
              <div>
                <div className="font-medium">{tier.level}</div>
                <div className="text-xs text-gray-400">{tier.revenue}</div>
              </div>
            </div>
            <div className="text-lg font-bold text-emerald-300">{tier.percent}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-emerald-900/20 rounded-xl border border-emerald-500/20">
        <div className="flex items-start gap-2">
          <Shield className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <span className="font-semibold text-emerald-300">Subscription Required:</span> Tiers require active Pro subscription. Unsubscribing resets to 90%. Resubscribing restores your previous tier level.
          </div>
        </div>
      </div>
    </div>
  );

  // Pricing Card Component
  const PricingCard = ({ 
    title, 
    tag, 
    monthly, 
    yearly, 
    yearlyActive, 
    features,
    unavailableFeatures,
    buttonText, 
    isPopular,
    isBestOffer,
    detailsComponent,
    yearlySavings
  }) => (
    <div className={`pricing-card relative ${isPopular ? 'scale-105 z-10' : ''}`}>
      <div className="card-glow absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-[2.6rem] blur opacity-0 group-hover:opacity-20 transition duration-500" />
      <div className="pricing-card-border relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[2.5rem] p-8 h-full">
        {isPopular && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 rounded-full text-xs font-bold shadow-lg z-20">
            MOST POPULAR
          </div>
        )}
        
        {isBestOffer && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-1 rounded-full text-xs font-bold shadow-lg z-20">
            BEST OFFER
          </div>
        )}
        
        <div className="mb-8 pt-2">
          <div className="flex items-center justify-between mb-4">
            <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase ${title === 'Premium' ? 'bg-gradient-to-r from-amber-500/30 to-amber-600/30 text-amber-300' : title === 'Pro' ? 'bg-gradient-to-r from-emerald-500/30 to-emerald-600/30 text-emerald-300' : title === 'Boost' ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300' : 'bg-white/10'}`}>
              {tag}
            </span>
            {title === 'Premium' && <Crown className="w-5 h-5 text-amber-400" />}
            {title === 'Pro' && <TrendingUp className="w-5 h-5 text-emerald-400" />}
            {title === 'Boost' && <Lightning className="w-5 h-5 text-cyan-400" />}
          </div>
          <div className="text-5xl font-black my-6">
            ${yearlyActive ? yearly : monthly}
            <span className="text-lg text-gray-400">/{yearlyActive ? 'year' : 'month'}</span>
          </div>
          <p className="text-gray-400">
            {yearlyActive ? `Billed annually ($${monthly}/mo)` : `Billed monthly`}
            {yearlyActive && yearlySavings && (
              <span className="block text-green-400 text-sm mt-1">{yearlySavings}</span>
            )}
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 className={`w-5 h-5 ${title === 'Premium' ? 'text-amber-400' : title === 'Pro' ? 'text-emerald-400' : title === 'Boost' ? 'text-cyan-400' : 'text-violet-400'}`} />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
          
          {unavailableFeatures && unavailableFeatures.map((feature, i) => (
            <div key={`unavailable-${i}`} className="flex items-center gap-3 opacity-40">
              <X className="w-5 h-5 text-gray-500" />
              <span className="text-gray-500 text-sm line-through">{feature}</span>
            </div>
          ))}
        </div>
        
        {detailsComponent && (
          <div className="mb-8">
            <button 
              onClick={() => setActivePricingDetail(activePricingDetail === title ? null : title)}
              className={`text-sm font-medium flex items-center gap-2 ${title === 'Premium' ? 'text-amber-400 hover:text-amber-300' : title === 'Pro' ? 'text-emerald-400 hover:text-emerald-300' : title === 'Boost' ? 'text-cyan-400 hover:text-cyan-300' : 'text-violet-400 hover:text-violet-300'}`}
            >
              {activePricingDetail === title ? 'Show Less' : 'Read More'}
              <ChevronRight className={`w-4 h-4 transition-transform ${activePricingDetail === title ? 'rotate-90' : ''}`} />
            </button>
            {activePricingDetail === title && detailsComponent}
          </div>
        )}
        
        <div className="mt-auto">
          <button className={`w-full py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] ${title === 'Premium' ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700' : title === 'Pro' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700' : title === 'Boost' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700' : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700'}`}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={root} className="bg-black text-white selection:bg-violet-600/30 overflow-x-hidden">
            {/* Scroll Progress Bar - FIXED */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/10">
        <div className="scroll-tracker h-full bg-gradient-to-r from-violet-600 to-purple-600 origin-left scale-x-0" />
      </div>

      {/* 1. ENHANCED LOADING SEQUENCE */}
      {!loaded && (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center">
          <div className="loader-particles absolute inset-0 pointer-events-none" />
          
          <div className="relative w-full max-w-2xl px-6">
            {/* Progress Bar */}
            <div className="loading-bar w-full h-1.5 bg-white/10 rounded-full mb-12 overflow-hidden">
              <div className="loading-bar-fill h-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 rounded-full w-0 relative transition-all duration-300">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-violet-400 rounded-full shadow-[0_0_15px_rgba(124,58,237,0.6)]" />
              </div>
            </div>
            
            <div className="relative flex justify-between items-end">
              {/* Runner */}
              <div className="runner-svg text-white relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-transparent rounded-full blur-xl" />
                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.49 5.42c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5.07 22h2.7l1.13-4.13L11.53 21h4.41l-2.11-4.11.92-3.28c.51.71 1.15 1.27 1.88 1.63L17.91 17H21v-2h-2.53l-1.03-2.52c-.29-.7-.79-1.29-1.44-1.71l-1.02-.66.45-2.28c.78.91 1.92 1.5 3.22 1.5V7c-1.9 0-3.51-1.02-4.38-2.53l-.91-1.58c-.32-.55-.95-.89-1.58-.89H8.35c-.63 0-1.26.34-1.58.89l-4.5 7.82L3.99 11l3.35-5.81L9.1 8.5l-1.6 8.07L3 22h2.07z"/>
                </svg>
              </div>
              
              {/* Football */}
              <div 
                ref={ballRef}
                className="w-12 h-12 bg-gradient-to-br from-violet-700 via-violet-800 to-black rounded-full border-3 border-white/10 shadow-[inset_0_-6px_8px_rgba(0,0,0,0.7),_inset_0_6px_8px_rgba(124,58,237,0.4),_0_0_30px_rgba(124,58,237,0.6)] flex items-center justify-center overflow-hidden"
              >
                <div className="absolute w-full h-1 bg-white/25"></div>
                <div className="absolute h-full w-1 bg-white/25"></div>
                <div className="absolute w-[120%] h-1 bg-white/15 rotate-45"></div>
                <div className="absolute w-[120%] h-1 bg-white/15 -rotate-45"></div>
                <div className="absolute inset-2 rounded-full border border-white/10"></div>
              </div>
            </div>
            
            <div className="loader-text text-center mt-10">
              <span className="percent text-5xl font-black italic text-violet-600 tracking-tighter">0%</span>
              <p className="text-gray-500 tracking-[0.3em] text-xs uppercase mt-3 font-mono">ENTERING THE ARENA</p>
            </div>
          </div>
          
          {/* Ball that transforms into hero glow */}
          <div className="hero-glow-ball absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full blur-xl opacity-0" />
        </div>
      )}

      {/* 2. MAIN PAGE CONTENT */}
      <div className={loaded ? "opacity-100 block" : "opacity-0 hidden"}>
        
        {/* ENHANCED NAVIGATION */}
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
              <button className="text-sm font-semibold hover:text-violet-400 transition-colors px-4 py-2">
                Sign In
              </button>
              <button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] active:scale-95">
                Get Started
              </button>
            </div>
          </div>
        </nav>

        {/* ENHANCED HERO SECTION */}
        <section className="hero-section hero-content-reveal relative min-h-screen flex items-center pt-20 px-6 overflow-hidden">
          {/* Parallax Background Layers */}
          <div className="parallax-bg-1 absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-r from-violet-600/20 via-purple-600/10 to-transparent blur-[200px] rounded-full" />
          </div>
          <div className="parallax-bg-2 absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-violet-500/5 blur-[150px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/10 animate-pulse">
                <Zap className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-bold text-violet-400">#1 Sports Connection Platform</span>
              </div>
              
              <h1 className="text-7xl md:text-9xl font-black leading-[0.85] mb-8 uppercase italic text-reveal">
                <span className="block">Your Game.</span>
                <span className="block text-violet-600">Your Crew.</span>
                <span className="block">Made Easy.</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-lg mb-10 leading-relaxed text-reveal">
                Instantly find, join, or create sports lobbies, book courts, and manage payments – all in one revolutionary app.
                <span className="block text-violet-300 font-semibold mt-2">Completely free for users.</span>
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-[0_0_40px_rgba(124,58,237,0.5)] transition-all group flex items-center gap-3">
                  Get Started Free
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>

              {/* Floating Stats Cards */}
              <div className="flex gap-6">
                {[
                  { value: "50K+", label: "Active Players" },
                  { value: "500+", label: "Venues" },
                  { value: "25+", label: "Sports" }
                ].map((stat, i) => (
                  <div key={i} className="float-animation bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl">
                    <div className="text-2xl font-bold text-violet-400">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
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
                      <div className="font-bold">Live Basketball Match</div>
                      <div className="text-sm text-gray-300">Downtown Courts • 6 players</div>
                    </div>
                    <button className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-full text-sm font-bold">
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ABOUT SECTION */}
        <section id="about" className="py-28 px-6 reveal-section">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-16 items-end mb-20">
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

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Users, title: "Global Lobbies", desc: "Join thousands of active players worldwide" },
                { icon: Calendar, title: "Instant Booking", desc: "Book courts with one tap, no calls needed" },
                { icon: CreditCard, title: "Secure Payments", desc: "Built-in escrow and split payments" }
              ].map((feature, i) => (
                <div key={i} className="feature-card p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[2rem] hover:border-violet-600/30 transition-colors">
                  <div className="w-12 h-12 bg-violet-600/20 rounded-2xl mb-6 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS - HORIZONTAL SCROLL */}
        <section id="howitworks" className="horizontal-container min-h-screen py-20 reveal-section">
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <div className="flex">
              {[
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
              ].map((panel, i) => (
                <div key={i} className="horizontal-panel w-screen h-screen flex-shrink-0 flex items-center px-6">
                  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                      <span className="text-violet-600 font-mono mb-4 block text-lg">// {panel.step}</span>
                      <h3 className="text-6xl md:text-7xl font-black mb-6 leading-[0.9]">{panel.title}</h3>
                      <p className="text-gray-400 text-lg max-w-lg">{panel.desc}</p>
                    </div>
                    <div className="relative">
                      <div className={`absolute -inset-4 bg-gradient-to-r ${panel.color} to-transparent rounded-[2.5rem] blur-xl`}></div>
                      <img 
                        src={panel.image}
                        className="relative rounded-[2rem] border border-white/10"
                        alt={panel.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EARNING PROGRAM SECTION */}
        <section id="earnings" className="py-28 px-6 bg-gradient-to-b from-black to-violet-900/5 reveal-section">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-violet-600/20 px-6 py-2 rounded-full mb-6">
                <Gift className="w-5 h-5" />
                <span className="font-bold text-violet-400">REFERRAL PROGRAM</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-black mb-6">Refer & <span className="text-violet-600">Earn</span></h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Spread the word and get rewarded. FitLynq's referral program benefits everyone in the community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Card 1: Refer a Business - UPDATED */}
              <div className="bg-gradient-to-br from-violet-600/10 to-transparent border border-white/10 rounded-[2rem] p-8 hover:border-violet-600/30 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl mb-6 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Refer a Business</h3>
                <p className="text-gray-300 mb-6">
                  Get a <span className="font-black text-violet-400 text-xl">3% commission</span> on every single booking that occurs with the business you referred.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-violet-400" />
                    <span className="text-sm">Commission applies for <span className="font-semibold">up to 4 months</span></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-4 h-4 text-violet-400" />
                    <span className="text-sm">Track all your referrals and earnings in real-time</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkle className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-semibold text-violet-300">Business gets Premium plan FREE for 2 weeks</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Refer a User - UPDATED */}
              <div className="bg-gradient-to-br from-purple-600/10 to-transparent border border-white/10 rounded-[2rem] p-8 hover:border-purple-600/30 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-6 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Refer a User</h3>
                <p className="text-gray-300 mb-6">
                  Earn a <span className="font-black text-purple-400 text-xl">3% commission</span> on every booking made by the user you referred.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <TargetIcon className="w-4 h-4 text-purple-400" />
                    <span className="text-sm"><span className="font-semibold">User 1 refers User 2:</span> User 2 gets 3% of commission on User 1's bookings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-purple-400" />
                    <span className="text-sm"><span className="font-semibold">Max $50</span> commission per referred user</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">Commission applies for <span className="font-semibold">up to 2 months</span></span>
                  </div>
                  <div className="flex items-start gap-3 mt-2 p-3 bg-purple-900/20 rounded-lg">
                    <Shield className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs"><span className="font-semibold">Note:</span> $50 commission cannot be withdrawn, it can only be used within the app for bookings and services.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { label: "Total Earned", value: "2500000", suffix: "+" },
                { label: "Active Referrers", value: "1200", suffix: "+" },
                { label: "Business Partners", value: "850", suffix: "+" },
                { label: "Avg Monthly", value: "2100", suffix: "/user" }
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-3xl md:text-4xl font-black mb-2">
                    <span className="count-up" data-target={stat.value}>
                      0
                    </span>
                    {stat.suffix}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SUBSCRIPTION PLANS */}
        <section id="pricing" className="py-28 px-6 reveal-section">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-violet-600/20 px-6 py-2 rounded-full mb-6">
                <Briefcase className="w-5 h-5" />
                <span className="font-bold text-violet-400">FOR BUSINESSES</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-black mb-6">Simple <span className="text-violet-600">Pricing</span></h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                <span className="text-violet-300 font-semibold">FitLynq is completely free for users.</span> 
                Businesses choose a plan to unlock growth and higher earnings.
              </p>

              {/* Yearly/Monthly Toggle */}
              <div className="inline-flex bg-white/5 backdrop-blur-sm border border-white/10 p-1 rounded-2xl mb-12">
                <button 
                  className={`px-6 py-2.5 rounded-xl font-bold transition-all ${!yearly ? 'bg-violet-600' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setYearly(false)}
                >
                  Monthly
                </button>
                <button 
                  className={`px-6 py-2.5 rounded-xl font-bold transition-all ${yearly ? 'bg-violet-600' : 'text-gray-400 hover:text-white'}`}
                  onClick={() => setYearly(true)}
                >
                  Yearly <span className="text-violet-300">(Get 2 Months Free)</span>
                </button>
              </div>
            </div>

            {/* ALL 4 PRICING CARDS */}
            <div className="grid lg:grid-cols-4 gap-6">
              {/* FREE PLAN */}
              <PricingCard
                title="Free"
                tag="FREE"
                monthly={0}
                yearly={0}
                yearlyActive={yearly}
                features={[
                  "1 Promotion per Month",
                  "Create Unlimited Courts",
                  "Calendar Synchronization",
                  "Basic Analytics",
                  "Standard Priority"
                ]}
                unavailableFeatures={[
                  "Higher Payout Tiers",
                  "Algorithm Push",
                  "Unlimited Promotions",
                  "Full Analytics Dashboard",
                  "Top Search Ranking"
                ]}
                buttonText="Get Started"
                isPopular={false}
                isBestOffer={false}
                yearlySavings=""
              />

              {/* Boost Plan - $19.99 */}
              <PricingCard
                title="Boost"
                tag="PRIORITY"
                monthly={19.99}
                yearly={219.99}
                yearlyActive={yearly}
                features={[
                  "Lobby & Business Higher Priority",
                  "Algorithm Push (Like Google Ads)",
                  "1 Promotion per Month",
                  "Basic Analytics"
                ]}
                unavailableFeatures={[
                  "Higher Payout Tiers",
                  "Unlimited Promotions",
                  "Full Analytics Dashboard",
                  "Top Search Ranking"
                ]}
                buttonText="Get Boost"
                isPopular={false}
                isBestOffer={false}
                detailsComponent={<BoostDetails />}
                yearlySavings="Get 1 Month Free"
              />

              {/* Pro Plan - $39.99 */}
              <PricingCard
                title="Pro"
                tag="PRO"
                monthly={39.99}
                yearly={439.99}
                yearlyActive={yearly}
                features={[
                  "Higher Payout Tiers (90-95%)",
                  "1 Promotion per Month",
                  "Limited Analytics",
                  "Standard Lobby Priority"
                ]}
                unavailableFeatures={[
                  "Algorithm Push",
                  "Unlimited Promotions",
                  "Full Analytics Dashboard",
                  "Top Search Ranking"
                ]}
                buttonText="Go Pro"
                isPopular={true}
                isBestOffer={false}
                detailsComponent={<PayoutTiersDetail />}
                yearlySavings="Get 1 Month Free"
              />

              {/* Premium Plan - $54.99 */}
              <PricingCard
                title="Premium"
                tag="BEST"
                monthly={54.99}
                yearly={499.99}
                yearlyActive={yearly}
                features={[
                  "Top Search Ranking Algorithm",
                  "Unlimited Promotions",
                  "Full Analytics Dashboard",
                  "Maximum Visibility & Priority"
                ]}
                unavailableFeatures={[]}
                buttonText="Go Premium"
                isPopular={false}
                isBestOffer={true}
                detailsComponent={<PremiumDetails />}
                yearlySavings="Get 2 Months Free"
              />
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-28 px-6 bg-gradient-to-b from-black to-violet-900/10 reveal-section">
          <div className="max-w-7xl mx-auto">
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
                <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 hover:border-violet-600/30 transition-colors">
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
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-28 px-6 reveal-section">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-6xl md:text-7xl font-black mb-6">
                  Get in <span className="text-violet-600">Touch</span>
                </h2>
                <p className="text-gray-400 text-lg mb-10">
                  Have questions about our plans or need help getting started? Our team is here to help you succeed.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-violet-600/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Email</div>
                      <div className="text-lg font-bold">support@fitlynq.com</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-violet-600/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Phone</div>
                      <div className="text-lg font-bold">+1 (555) 123-4567</div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex gap-3">
                  {[Twitter, Instagram, Linkedin, Youtube, Facebook].map((Icon, i) => (
                    <a 
                      key={i}
                      href="#" 
                      className="w-10 h-10 bg-white/5 hover:bg-violet-600/20 border border-white/10 rounded-xl flex items-center justify-center transition-colors hover:scale-105"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-violet-600/10 to-purple-600/5 border border-white/10 rounded-[2rem] p-8">
                <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
                <form className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-600 transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-600 transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-600 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea 
                      rows="4"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-violet-600 transition-colors"
                      placeholder="Tell us about your needs..."
                    ></textarea>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 py-4 rounded-xl font-bold text-lg transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-28 px-6 reveal-section">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-violet-600/20 via-purple-600/20 to-pink-600/20 border border-white/10 rounded-[2.5rem] p-12">
              <h2 className="text-6xl md:text-7xl font-black mb-6">
                Ready to <span className="text-violet-600">Play?</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of athletes and businesses already transforming their sports experience with FitLynq.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-colors">
                  Get Started Free
                </button>
              </div>
              <div className="mt-6 text-sm text-gray-400">
                No credit card required • Cancel anytime
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-black py-16 px-6 border-t border-white/5">
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
      </div>
    </div>
  );
}