import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Section = ({ children, className = '', id = '', ...props }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    
    // Smooth fade in and slide up for the section itself
    gsap.fromTo(el, 
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Staggered animation for children elements (cards, list items, etc.)
    // looks for elements with 'stagger-item' class
    const staggerItems = el.querySelectorAll('.stagger-item');
    if (staggerItems.length > 0) {
      gsap.fromTo(staggerItems, 
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
          }
        }
      );
    }

    return () => {
      // Cleanup happens automatically with GSAP Context in parent or if we kill triggers here
    };
  }, []);

  return (
    <section ref={sectionRef} id={id} className={`py-20 px-6 ${className}`} {...props}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};
