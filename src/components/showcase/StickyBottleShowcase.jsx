import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

const STORY_STEPS = [
  {
    step: '01',
    badge: 'Signature Extrait 2026',
    title: 'AURA EAU DE PARFUM',
    subtitle: '100ML FLACON',
    description:
      'Calabrian Bergamot • Blue Lotus • Coastal Driftwood • Floating Ambergris. Each bottle is numbered and accompanied by an olfactory certificate from our Grasse laboratory.',
    specs: [
      { label: 'Harvest Depth', val: '400m Abyssal Kelp' },
      { label: 'Concentration', val: '28% Pure Extrait' },
      { label: 'Longevity', val: '14+ Hours Sillage' }
    ],
    price: 245
  },
  {
    step: '02',
    badge: 'Pure Oceanic Distillation',
    title: 'SUBMERGED IN PURITY',
    subtitle: 'THE LIQUID GOLD ESSENCE',
    description:
      'Crafted through supercritical CO₂ cold extraction, capturing raw marine minerals, salt-dusted ozone, and luminous morning amber without petroleum derivatives.',
    specs: [
      { label: 'Extraction Method', val: 'Supercritical CO₂' },
      { label: 'Alcohol Base', val: '100% Organic Sugar Cane' },
      { label: 'Ethical Origin', val: 'Cruelty-Free Beach Ambergris' }
    ],
    price: 245
  },
  {
    step: '03',
    badge: 'Murano Glass Atelier',
    title: 'SCULPTED BY TIDES',
    subtitle: 'HEIRLOOM CRAFTSMANSHIP',
    description:
      'Individually blown by Venetian master glassmakers with organic undulating facets that refract light like Aegean sunlight cutting through tranquil ocean depths.',
    specs: [
      { label: 'Vessel Material', val: 'Recycled Marine Silica' },
      { label: 'Cap Craft', val: '24K Brushed Gold Plating' },
      { label: 'Lifetime Service', val: '30% Atelier Refill Privileges' }
    ],
    price: 245
  }
];

export const StickyBottleShowcase = ({ onSelectProduct }) => {
  const containerRef = useRef(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [revealProgress, setRevealProgress] = useState(0);
  const { addToCart } = useCart();
  const [addedNotice, setAddedNotice] = useState(false);

  const flagship = PRODUCTS[0];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollYOffset = -rect.top;
      const totalDist = containerRef.current.offsetHeight - window.innerHeight;

      // Reveal progress as this section reaches the viewport top
      // 0 when section enters, 1 when section is active
      const entryProgress = Math.min(Math.max(0, scrollYOffset / (window.innerHeight * 0.45)), 1);
      setRevealProgress(entryProgress);

      if (totalDist > 0) {
        const stepProgress = Math.min(Math.max(0, scrollYOffset / totalDist), 0.999);
        const stepIdx = Math.floor(stepProgress * STORY_STEPS.length);
        setActiveStepIndex(stepIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentStep = STORY_STEPS[activeStepIndex];

  const handleAddToCart = () => {
    addToCart(flagship, '100ml');
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  // Bottle rises/emerges up smoothly from under the 3 cards section as user scrolls down:
  // Starts lower down (+120px) and rises smoothly into place (0px)
  const bottleTranslateY = (1 - revealProgress) * 120;

  return (
    <div ref={containerRef} className="relative min-h-[300vh] bg-white text-[#141210]">
      
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden px-6 sm:px-12 lg:px-20">
        
        {/* Soft background ambient illumination */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#B38738]/15 via-[#FBF6ED] to-transparent rounded-full blur-[100px] pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center z-10">
          
          {/* Left Column: Dynamic Story Content */}
          <div className="lg:col-span-6 flex flex-col justify-center min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStepIndex}
                initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -25, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 max-w-xl"
              >
                {/* Step pill */}
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono tracking-[0.28em] text-[#B38738] uppercase px-3 py-1 rounded-full border border-[#B38738]/40 bg-[#FBF6ED] font-semibold shadow-2xs">
                    {currentStep.badge}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    Phase {currentStep.step} of 03
                  </span>
                </div>

                {/* Headings */}
                <div>
                  <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#141210] uppercase leading-[0.98] tracking-tight">
                    {currentStep.title} <br />
                    <span className="italic font-light text-[#B38738]">
                      {currentStep.subtitle}
                    </span>
                  </h3>
                </div>

                {/* Description */}
                <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
                  {currentStep.description}
                </p>

                {/* Technical Specs Breakdown */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/80">
                  {currentStep.specs.map((spec, i) => (
                    <div key={i}>
                      <span className="block text-[10px] font-mono uppercase text-stone-400 tracking-wider">
                        {spec.label}
                      </span>
                      <span className="font-serif text-sm sm:text-base font-medium text-[#141210] mt-0.5 block">
                        {spec.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action CTAs */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onSelectProduct('aura-edp')}
                    className="px-8 py-4 rounded-full bg-[#B38738] hover:bg-[#946820] text-white font-semibold text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_25px_rgba(179,135,56,0.4)] transition-all cursor-pointer flex items-center gap-2 shadow-md hover:-translate-y-0.5"
                  >
                    <span>Examine Olfactory Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="px-8 py-4 rounded-full border border-stone-300 bg-white text-[#141210] font-medium text-xs tracking-[0.2em] uppercase hover:border-[#B38738] hover:text-[#B38738] transition-colors cursor-pointer shadow-xs"
                  >
                    {addedNotice ? (
                      <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                        <Check className="w-4 h-4" /> Reserved • $245
                      </span>
                    ) : (
                      <span>Add to Coffret • $245</span>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Scroll Progress Step Indicators */}
            <div className="flex items-center gap-2 mt-8 pt-4">
              {STORY_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeStepIndex
                      ? 'w-10 bg-[#B38738]'
                      : 'w-3 bg-stone-200'
                  }`}
                />
              ))}
              <span className="text-[10px] font-mono text-stone-400 ml-2 tracking-widest uppercase">
                Scroll to Reveal Chapters
              </span>
            </div>
          </div>

          {/* Right Column: 100% Full Opacity Bottle Revealing Cleanly */}
          <div className="lg:col-span-6 flex items-center justify-center relative select-none">
            
            {/* Subtle animated light aura behind the bottle */}
            <div className="absolute w-[440px] sm:w-[540px] h-[440px] sm:h-[540px] rounded-full bg-gradient-to-br from-amber-100/35 via-yellow-50/20 to-transparent blur-3xl pointer-events-none" />

            {/* Bottle Container with 100% full opacity, rising smoothly into place */}
            <div
              className="relative w-full max-w-[480px] sm:max-w-[560px] lg:max-w-[620px] flex items-center justify-center transition-transform duration-200 ease-out"
              style={{
                transform: `translateY(${bottleTranslateY}px)`,
                opacity: 1
              }}
            >
              <motion.img
                src="/img1.png"
                alt="AURA Eau de Parfum Flacon"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 0.8, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-full h-auto object-contain max-h-[78vh] filter drop-shadow-[0_25px_35px_rgba(212,175,55,0.22)] select-none pointer-events-auto opacity-100"
                draggable={false}
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
