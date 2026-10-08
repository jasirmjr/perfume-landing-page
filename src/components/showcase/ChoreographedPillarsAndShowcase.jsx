import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Droplet,
  Sparkles,
  Award,
  ArrowRight,
  Check,
  Wind,
  Droplets,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { CraftedCollectionEditorial } from './CraftedCollectionEditorial';

const STORY_STEPS = [
  {
    step: '01',
    badge: 'Signature Extrait 2026',
    title: 'AURA EAU DE PARFUM',
    subtitle: '100ML FLACON',
    description:
      'Calabrian Bergamot • Blue Lotus • Coastal Driftwood • Floating Ambergris. Each bottle is numbered and accompanied by an olfactory certificate from our Grasse laboratory.'
  },
  {
    step: '02',
    badge: 'Pure Oceanic Distillation',
    title: 'SUBMERGED IN PURITY',
    subtitle: 'THE LIQUID GOLD ESSENCE',
    description:
      'Crafted through supercritical CO₂ cold extraction, capturing raw marine minerals, salt-dusted ozone, and luminous morning amber without petroleum derivatives.'
  },
  {
    step: '03',
    badge: 'Murano Glass Atelier',
    title: 'SCULPTED BY TIDES',
    subtitle: 'HEIRLOOM CRAFTSMANSHIP',
    description:
      'Individually blown by Venetian master glassmakers with organic undulating facets that refract light like Aegean sunlight cutting through tranquil ocean depths.'
  }
];

export const ChoreographedPillarsAndShowcase = ({ onSelectProduct }) => {
  const containerRef = useRef(null);
  const { addToCart } = useCart();
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeLayer, setActiveLayer] = useState('notes'); // 'notes' | 'extraction' | 'glass'
  const [isLg, setIsLg] = useState(true);
  const flagship = PRODUCTS[0];

  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous multi-stage scroll progress through the entire unified section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth, jitter-free physics spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 190,
    damping: 30,
    mass: 0.08,
    restDelta: 0.0001
  });

  // -------------------------------------------------------------------------
  // SILKY MULTI-STAGE SCROLL CHOREOGRAPHY (680vh):
  //
  // 0.00 - 0.14 : Stage 1: 3 Feature Cards ("CRAFTED IN THE ABYSS & LIGHT")
  // 0.14 - 0.22 : Stage 1 fades out, bottle ascends into Right column
  // 0.24 - 0.42 : Chapter 01: Bottle on Right, Text on Left
  // 0.42 - 0.52 : GLIDE 1 → 2: Bottle glides Right to Left, Chapter 02 enters Right
  // 0.52 - 0.68 : Chapter 02: Bottle on Left, Text on Right
  // 0.68 - 0.78 : GLIDE 2 → 3: Bottle glides Left to Right, Chapter 03 enters Left
  // 0.78 - 0.86 : Chapter 03 ("SCULPTED BY TIDES"): Bottle on Right, Text on Left
  // 0.86 - 0.90 : Clean fade-out of Chapter 03 text (clears stage completely)
  // 0.88 - 0.96 : GLIDE 3 → FLACON ANATOMY:
  //               Bottle glides from right (x: 50%) into dead-center (x: 0%),
  //               tilts subtly and levels out, and scales smoothly to 0.84.
  // 0.92 - 1.00 : Flacon Anatomy section smoothly enters (clean, no background box).
  // -------------------------------------------------------------------------

  // Bottle Horizontal Position (Seamless keyframes across all stages)
  const bottleX = useTransform(
    smoothProgress,
    [
      0.0,
      0.42, 0.445, 0.47, 0.495, 0.52,
      0.68, 0.705, 0.73, 0.755, 0.78,
      0.86, 0.885, 0.91, 0.935, 0.96, 1.0
    ],
    isLg
      ? [
          '50%',
          '50%', '35%', '0%', '-35%', '-50%',
          '-50%', '-35%', '0%', '35%', '50%',
          '50%', '38%', '24%', '10%', '0%', '0%'
        ]
      : [
          '0%',
          '0%', '0%', '0%', '0%', '0%',
          '0%', '0%', '0%', '0%', '0%',
          '0%', '0%', '0%', '0%', '0%', '0%'
        ]
  );

  // Aerodynamic tilt (gentle 2° - 3° tilt that levels out smoothly to 0°)
  const bottleRotate = useTransform(
    smoothProgress,
    [0.42, 0.47, 0.52, 0.68, 0.73, 0.78, 0.86, 0.90, 0.935, 0.96, 1.0],
    isLg
      ? [0, -2.8, 0, 0, 2.8, 0, 0, -2.2, -1.0, 0, 0]
      : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  );

  // Bottle Vertical Rise & Docking alignment
  const bottleY = useTransform(
    smoothProgress,
    [0.14, 0.24, 0.86, 0.96, 1.0],
    ['240px', '0px', '0px', '0px', '0px']
  );

  // Bottle Opacity
  const bottleOpacity = useTransform(
    smoothProgress,
    [0.14, 0.24, 1.0],
    [0, 1, 1]
  );

  // Bottle Scale: floating hero size in chapters, easing to 0.84 docked size
  const bottleScale = useTransform(
    smoothProgress,
    [0.14, 0.24, 0.42, 0.47, 0.52, 0.68, 0.73, 0.78, 0.86, 0.96, 1.0],
    [0.92, 1.0, 1.0, 1.05, 1.0, 1.0, 1.05, 1.0, 1.0, 0.84, 0.84]
  );

  // Warm backlight glow scale & opacity
  const glowScale = useTransform(smoothProgress, [0.86, 0.96], [1.0, 0.75]);
  const glowOpacity = useTransform(smoothProgress, [0.86, 0.96], [1.0, 0.4]);

  // CHAPTER 1 (Scroll 1: Left column text)
  const chap1Opacity = useTransform(smoothProgress, [0.22, 0.27, 0.42, 0.49], [0, 1, 1, 0]);
  const chap1X = useTransform(smoothProgress, [0.42, 0.49], ['0px', '-35px']);
  const chap1Y = useTransform(smoothProgress, [0.22, 0.27], ['25px', '0px']);

  // CHAPTER 2 (Scroll 2: Right column text)
  const chap2Opacity = useTransform(smoothProgress, [0.48, 0.54, 0.68, 0.75], [0, 1, 1, 0]);
  const chap2X = useTransform(smoothProgress, [0.48, 0.54, 0.68, 0.75], ['35px', '0px', '0px', '35px']);
  const chap2Y = useTransform(smoothProgress, [0.48, 0.54], ['25px', '0px']);

  // CHAPTER 3 (Scroll 3: Left column text - "SCULPTED BY TIDES")
  // Fades out cleanly before Flacon Anatomy enters to eliminate ghosting/overlap
  const chap3Opacity = useTransform(smoothProgress, [0.72, 0.77, 0.88, 0.92], [0, 1, 1, 0]);
  const chap3X = useTransform(smoothProgress, [0.72, 0.77, 0.88, 0.92], ['-35px', '0px', '0px', '-20px']);
  const chap3Y = useTransform(smoothProgress, [0.72, 0.77, 0.88, 0.92], ['25px', '0px', '0px', '-35px']);

  // STAGE 5: FLACON ANATOMY & CRAFT (CLEAN / NO BACKGROUND BOX)
  // Enters seamlessly as Chapter 3 text clears out
  const anatomyOpacity = useTransform(smoothProgress, [0.89, 0.95, 1.0], [0, 1, 1]);
  const anatomyY = useTransform(smoothProgress, [0.89, 0.95, 1.0], ['40px', '0px', '0px']);

  // Tag Pill ("AURA NO. 01 • 100ML EXTRAIT") fades in cleanly once bottle docks
  const pillOpacity = useTransform(smoothProgress, [0.93, 0.965, 1.0], [0, 1, 1]);
  const pillY = useTransform(smoothProgress, [0.93, 0.965, 1.0], ['12px', '0px', '0px']);

  const handleAddToCart = () => {
    addToCart(flagship, '100ml');
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div ref={containerRef} className="relative min-h-[680vh] bg-white text-[#141210] border-t border-stone-200/80">
      
      {/* ================= PINNED STICKY VIEWPORT STAGE ================= */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 sm:px-8 lg:px-12">
        
        {/* ================= STAGE 1: CRAFTED COLLECTION OPEN EDITORIAL LAYER ================= */}
        <CraftedCollectionEditorial
          scrollProgress={smoothProgress}
          isLg={isLg}
          onSelectProduct={onSelectProduct}
        />

        {/* ================= CHAPTERS 1, 2, 3 NARRATIVE TEXT LAYER ================= */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 z-20 pointer-events-none">
          
          {/* LEFT COLUMN (50% WIDTH) */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {/* Scroll 1: Chapter 1 Text Perfectly Centered in Left Section */}
            <motion.div
              style={{
                opacity: chap1Opacity,
                x: chap1X,
                y: chap1Y
              }}
              className="space-y-6 max-w-lg w-full pointer-events-auto text-left transform-gpu will-change-transform"
            >
              <div>
                <h3 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#141210] uppercase leading-[0.98] tracking-tight">
                  {STORY_STEPS[0].title} <br />
                  <span className="font-extrabold text-[#B38738]">
                    {STORY_STEPS[0].subtitle}
                  </span>
                </h3>
              </div>
              <p className="text-[#141210]/75 text-base sm:text-lg font-light leading-relaxed">
                {STORY_STEPS[0].description}
              </p>
            </motion.div>

            {/* Scroll 3: Chapter 3 Text ("SCULPTED BY TIDES / HEIRLOOM CRAFTSMANSHIP") */}
            <motion.div
              style={{
                opacity: chap3Opacity,
                x: chap3X,
                y: chap3Y
              }}
              className="space-y-6 max-w-lg w-full pointer-events-auto text-left absolute transform-gpu will-change-transform"
            >
              <div>
                <h3 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#141210] uppercase leading-[0.98] tracking-tight">
                  {STORY_STEPS[2].title} <br />
                  <span className="font-extrabold text-[#B38738]">
                    {STORY_STEPS[2].subtitle}
                  </span>
                </h3>
              </div>
              <p className="text-[#141210]/75 text-base sm:text-lg font-light leading-relaxed">
                {STORY_STEPS[2].description}
              </p>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (50% WIDTH) */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            {/* Scroll 2: Chapter 2 Text Perfectly Centered in Right Section */}
            <motion.div
              style={{
                opacity: chap2Opacity,
                x: chap2X,
                y: chap2Y
              }}
              className="space-y-6 max-w-lg w-full pointer-events-auto text-left transform-gpu will-change-transform"
            >
              <div>
                <h3 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#141210] uppercase leading-[0.98] tracking-tight">
                  {STORY_STEPS[1].title} <br />
                  <span className="font-extrabold text-[#B38738]">
                    {STORY_STEPS[1].subtitle}
                  </span>
                </h3>
              </div>
              <p className="text-[#141210]/75 text-base sm:text-lg font-light leading-relaxed">
                {STORY_STEPS[1].description}
              </p>
            </motion.div>
          </div>

        </div>

        {/* ================= STAGE 5: FLACON ANATOMY & CRAFT (CLEAN / NO BACKGROUND BOX) ================= */}
        <motion.div
          style={{
            opacity: anatomyOpacity,
            y: anatomyY
          }}
          className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center z-25 pointer-events-auto transform-gpu will-change-transform"
        >
          {/* Seamless 3-Column Layout without any background card box */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative">
            
            {/* LEFT COLUMN: 3 Craft Anatomy Tabs (4 cols out of 12) */}
            <div className="lg:col-span-4 space-y-3.5 order-2 lg:order-1 relative z-30 pointer-events-auto">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B38738] font-semibold block mb-2">
                Flacon Anatomy & Craft
              </span>

              {/* Tab 1: Saline Amber Extrait */}
              <button
                type="button"
                onClick={() => setActiveLayer('notes')}
                className={`w-full text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  activeLayer === 'notes'
                    ? 'bg-[#FBF6ED] border-[#B38738] shadow-sm'
                    : 'bg-white/80 border-stone-200/80 hover:bg-stone-50'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${activeLayer === 'notes' ? 'bg-[#B38738] text-white' : 'bg-stone-100 text-[#141210] shadow-xs'}`}>
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-base text-[#141210]">Saline Amber Extrait</h4>
                  <p className="text-xs text-[#141210]/70 mt-1 font-light leading-relaxed">
                    28% pure perfume oil concentration with natural Grey Ambergris and Calabrian bergamot.
                  </p>
                </div>
              </button>

              {/* Tab 2: Subcritical CO₂ Harvest */}
              <button
                type="button"
                onClick={() => setActiveLayer('extraction')}
                className={`w-full text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  activeLayer === 'extraction'
                    ? 'bg-[#FBF6ED] border-[#B38738] shadow-sm'
                    : 'bg-white/80 border-stone-200/80 hover:bg-stone-50'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${activeLayer === 'extraction' ? 'bg-[#B38738] text-white' : 'bg-stone-100 text-[#141210] shadow-xs'}`}>
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-base text-[#141210]">Subcritical CO₂ Harvest</h4>
                  <p className="text-xs text-[#141210]/70 mt-1 font-light leading-relaxed">
                    Extracted at 400m below the Mediterranean without chemical heat or petrochemical solvents.
                  </p>
                </div>
              </button>

              {/* Tab 3: Venetian Recycled Glass */}
              <button
                type="button"
                onClick={() => setActiveLayer('glass')}
                className={`w-full text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                  activeLayer === 'glass'
                    ? 'bg-[#FBF6ED] border-[#B38738] shadow-sm'
                    : 'bg-white/80 border-stone-200/80 hover:bg-stone-50'
                }`}
              >
                <div className={`p-2.5 rounded-xl shrink-0 ${activeLayer === 'glass' ? 'bg-[#B38738] text-white' : 'bg-stone-100 text-[#141210] shadow-xs'}`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-base text-[#141210]">Venetian Recycled Glass</h4>
                  <p className="text-xs text-[#141210]/70 mt-1 font-light leading-relaxed">
                    Heavy sculptural base hand-polished to mimic tidal-smoothed ocean pebbles.
                  </p>
                </div>
              </button>
            </div>

            {/* CENTER COLUMN: Central Docking Pedestal (4 cols out of 12) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative order-1 lg:order-2 h-[380px] sm:h-[440px] pointer-events-none">
              
              {/* Concentric Rotating Ring Halo */}
              <div className="absolute w-64 sm:w-80 h-64 sm:h-80 rounded-full border border-dashed border-[#B38738]/35 animate-slow-rotate pointer-events-none" />
              <div className="absolute w-72 sm:w-88 h-72 sm:h-88 rounded-full bg-gradient-to-r from-[#B38738]/20 to-[#FBF6ED]/40 blur-2xl animate-aura-pulse pointer-events-none" />

            </div>

            {/* RIGHT COLUMN: Acquisition & Dossier Actions (4 cols out of 12) */}
            <div className="lg:col-span-4 space-y-5 order-3 relative z-30 pointer-events-auto">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block mb-1">
                  Atelier Masterpiece
                </span>
                <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-[#141210] leading-tight">
                  AURA
                </h3>
                <p className="text-2xl font-mono text-[#B38738] font-bold mt-1">
                  $200 <span className="text-xs text-stone-400 font-sans font-normal">AED</span>
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-stone-200/60 text-xs">
                <div className="flex justify-between text-[#141210]/70">
                  <span>Concentration</span>
                  <span className="font-mono font-semibold text-[#141210]">28% Pure Extrait</span>
                </div>
                <div className="flex justify-between text-[#141210]/70">
                  <span>Sillage Projection</span>
                  <span className="font-mono font-semibold text-[#141210]">14+ Hours Wear</span>
                </div>
                <div className="flex justify-between text-[#141210]/70">
                  <span>Bottle Material</span>
                  <span className="font-mono font-semibold text-[#141210]">Murano Glass</span>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-full bg-[#B38738] hover:bg-[#946820] text-white font-bold text-xs tracking-[0.25em] uppercase hover:shadow-[0_0_22px_rgba(179,135,56,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Flacon Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Acquire Flacon</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </div>

            </div>

          </div>
        </motion.div>

        {/* ================= SHARED CONTINUOUS BOTTLE LAYER (z-30) =================
            This single bottle element glides across Chapters 1, 2, 3 and then
            fluidly transitions right into the central hero pedestal slot!
        */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-center pointer-events-none z-30">
          
          <motion.div
            style={{
              x: bottleX,
              y: bottleY,
              rotate: bottleRotate,
              opacity: bottleOpacity,
              scale: bottleScale
            }}
            className="w-full lg:w-1/2 flex items-center justify-center pointer-events-none relative transform-gpu will-change-transform"
          >
            {/* Luminous warm amber aura that travels coherently with the flacon */}
            <motion.div
              style={{
                scale: glowScale,
                opacity: glowOpacity
              }}
              className="absolute w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-[#B38738]/25 via-[#FBF6ED]/20 to-transparent blur-[85px] pointer-events-none transform-gpu"
            />

            {/* Subtle floating breath animation */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
              className="flex items-center justify-center max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] xl:max-w-[430px] w-full relative z-10 transform-gpu"
            >
              <img
                src="/img1.webp"
                alt="AURA Eau de Parfum Flacon"
                className="w-full h-auto object-contain max-h-[72vh] filter drop-shadow-[0_28px_50px_rgba(212,175,55,0.25)] select-none pointer-events-none"
                draggable={false}
                loading="eager"
              />
            </motion.div>
          </motion.div>
        </div>

      </div>

    </div>
  );
};
