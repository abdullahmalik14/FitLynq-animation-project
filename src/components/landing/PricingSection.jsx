import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';
import { Section } from '../ui/Section';
import { PricingCard, BoostDetails, PayoutTiersDetail, PremiumDetails } from './PricingCard';

export const PricingSection = () => {
  const [yearly, setYearly] = useState(true);
  const [activePricingDetail, setActivePricingDetail] = useState(null);

  const toggleDetail = (title) => {
    setActivePricingDetail(activePricingDetail === title ? null : title);
  };

  return (
    <Section id="pricing" className="reveal-section text-white">
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
            <div className="stagger-item h-full">
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
                activeDetail={activePricingDetail}
                onToggleDetail={toggleDetail}
                />
            </div>

            {/* Boost Plan - $19.99 */}
            <div className="stagger-item h-full">
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
                activeDetail={activePricingDetail}
                onToggleDetail={toggleDetail}
                />
            </div>

            {/* Pro Plan - $39.99 */}
            <div className="stagger-item h-full">
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
                activeDetail={activePricingDetail}
                onToggleDetail={toggleDetail}
                />
            </div>

            {/* Premium Plan - $54.99 */}
            <div className="stagger-item h-full">
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
                activeDetail={activePricingDetail}
                onToggleDetail={toggleDetail}
                />
            </div>
        </div>
    </Section>
  );
};
