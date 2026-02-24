import React, { useState } from 'react';
import { CheckCircle2, X, ChevronRight, Crown, TrendingUp, Zap as Lightning, Rocket, Filter, BarChart3, Eye, Sparkles, Shield, BarChart } from 'lucide-react';

// Detail Components
export const PremiumDetails = () => (
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

  export const BoostDetails = () => (
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

  export const PayoutTiersDetail = () => (
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

export const PricingCard = ({ 
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
    yearlySavings,
    activeDetail,
    onToggleDetail
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
              onClick={() => onToggleDetail(title)}
              className={`text-sm font-medium flex items-center gap-2 ${title === 'Premium' ? 'text-amber-400 hover:text-amber-300' : title === 'Pro' ? 'text-emerald-400 hover:text-emerald-300' : title === 'Boost' ? 'text-cyan-400 hover:text-cyan-300' : 'text-violet-400 hover:text-violet-300'}`}
            >
              {activeDetail === title ? 'Show Less' : 'Read More'}
              <ChevronRight className={`w-4 h-4 transition-transform ${activeDetail === title ? 'rotate-90' : ''}`} />
            </button>
            {activeDetail === title && detailsComponent}
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
