import React, { useEffect, useRef } from 'react';
import { Gift, Briefcase, Clock, TrendingUp, Sparkle, Users, Target as TargetIcon, DollarSign, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EarningsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
       // Counter animations
       gsap.utils.toArray(".count-up").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          onEnter: () => {
            const targetStr = el.getAttribute("data-target");
            // Remove + or other non-numeric chars for calculation, but logic handles it
            const target = parseInt(targetStr.replace(/[^0-9]/g, ''));
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="earnings" className="py-28 px-6 bg-gradient-to-b from-black to-violet-900/5 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-violet-600/20 px-6 py-2 rounded-full mb-6">
            <Gift className="w-5 h-5 text-violet-400" />
            <span className="font-bold text-violet-400">REFERRAL PROGRAM</span>
          </div>
          <h2 className="text-6xl md:text-7xl font-black mb-6">Refer & <span className="text-violet-600">Earn</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Spread the word and get rewarded. FitLynq's referral program benefits everyone in the community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: Refer a Business */}
          <div className="stagger-item bg-gradient-to-br from-violet-600/10 to-transparent border border-white/10 rounded-[2rem] p-8 hover:border-violet-600/30 transition-colors">
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

          {/* Card 2: Refer a User */}
          <div className="stagger-item bg-gradient-to-br from-purple-600/10 to-transparent border border-white/10 rounded-[2rem] p-8 hover:border-purple-600/30 transition-colors">
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
  );
};
