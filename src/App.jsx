import React, { useState } from 'react';
import HeroOrbit from './components/hero/HeroOrbit';
import LandingPage from './components/landing/LandingPage';

function App() {
  const [showLanding, setShowLanding] = useState(false);
  const [showHero, setShowHero] = useState(true);

  // Callback for when HeroOrbit has finished its main animation and is fading out overlay
  const handleHeroComplete = () => {
    // Show LandingPage behind the fading Hero
    setShowLanding(true);
    
    // Unmount Hero after it has likely finished fading out (1.5s delay matched to HeroOrbit fade)
    // HeroOrbit fade duration for container is 0.5s at the end of timeline.
    // The total timeline in HeroOrbit is roughly 3.5s? 
    // Let's rely on a timeout or just let it sit if it's display:none?
    // Unmounting is safer for performance.
    setTimeout(() => {
      setShowHero(false);
    }, 2500); // Extended to ensure clean overlapping transition
  };

  return (
    <>
      {showHero && (
        <HeroOrbit onComplete={handleHeroComplete} />
      )}
      
      {/* 
         LandingPage is rendered when showLanding is true.
         If showHero is still true, LandingPage will be underneath (z-index context).
         HeroOrbit is z-[200]. LandingPage is normal flow (or make sure it's z-0).
         Navbar in LandingPage is z-50.
      */}
      {showLanding && <LandingPage />}
    </>
  );
}

export default App;
