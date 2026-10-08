import React, { useState, useRef, useEffect } from 'react';
import { motion, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';

const EDITIONS = [
  {
    id: 'bleu',
    editionNumber: '01',
    editionName: 'AURA BLEU',
    subheading: 'DEEP OCEANIC KELP',
    tag: '400M ABYSSAL DEPTH',
    description: 'Supercritical CO₂ extraction of deep Mediterranean sea kelp.',
    img: '/aura-bleu.webp',
    glowGradient: 'from-[#B38738]/35 via-[#FBF6ED]/50 to-transparent'
  },
  {
    id: 'elixir',
    editionNumber: '02',
    editionName: 'AURA ELIXIR',
    subheading: 'MURANO GLASS FLACON',
    tag: 'VENETIAN HEIRLOOM',
    description: 'Murano glass flacon housing pure cold-distilled liquid amber.',
    img: '/aura-elixir.webp',
    glowGradient: 'from-amber-300/45 via-yellow-100/30 to-transparent'
  },
  {
    id: 'noir',
    editionNumber: '03',
    editionName: 'AURA NOIR',
    subheading: 'CRUELTY-FREE AMBERGRIS',
    tag: '14+ HOURS SILLAGE',
    description: 'Aged Atlantic coastal ambergris with smoky nocturnal driftwood.',
    img: '/aura-noir.webp',
    glowGradient: 'from-amber-400/35 via-orange-100/20 to-transparent'
  }
];

export const CraftedCollectionEditorial = ({ scrollProgress, isLg = true, onSelectProduct }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);

  // In-view detection + scroll threshold detection
  const isInView = useInView(containerRef, { margin: '0px 0px -5% 0px', once: false });
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // The hero is 500vh. When scroll reaches ~350vh-400vh, this section enters.
      const scrollY = window.scrollY;
      const triggerThreshold = window.innerHeight * 3.5;
      if (scrollY >= triggerThreshold) {
        setHasEntered(true);
      } else {
        // Reset when user scrolls back high up into the hero so it can re-animate
        setHasEntered(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isInView) {
      setHasEntered(true);
    }
  }, [isInView]);

  // Mouse Parallax Trackers
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current || !isLg) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredId(null);
  };

  // Parallax offsets for different depth layers
  const leftParallaxX = useTransform(smoothMouseX, (v) => v * -24);
  const leftParallaxY = useTransform(smoothMouseY, (v) => v * -16);

  const centerParallaxX = useTransform(smoothMouseX, (v) => v * 10);
  const centerParallaxY = useTransform(smoothMouseY, (v) => v * 12);

  const rightParallaxX = useTransform(smoothMouseX, (v) => v * 24);
  const rightParallaxY = useTransform(smoothMouseY, (v) => v * -16);

  // Scroll exit transitions into Chapter 1
  const leftX = useTransform(
    scrollProgress,
    [0.0, 0.14, 0.22],
    isLg ? ['0%', '0%', '-35%'] : ['0%', '0%', '0%']
  );
  const rightX = useTransform(
    scrollProgress,
    [0.0, 0.14, 0.22],
    isLg ? ['0%', '0%', '35%'] : ['0%', '0%', '0%']
  );
  const fadeOpacity = useTransform(scrollProgress, [0.0, 0.14, 0.22], [1, 1, 0]);

  // Overall Stage Fade & Elevation Out as scroll advances to Chapter 1
  const stageOpacity = useTransform(scrollProgress, [0.14, 0.22], [1, 0]);
  const stageY = useTransform(scrollProgress, [0.14, 0.22], ['0px', '-50px']);

  // Dynamic Entrance Configurations for the 3 bottles
  const getEntranceInitial = (idx) => {
    if (idx === 0) {
      // Left bottle (AURA BLEU): starts off-screen to the left with dynamic aerodynamic tilt
      return {
        x: isLg ? '-100vw' : '-80vw',
        rotate: -14,
        opacity: 0,
        filter: 'blur(10px)',
      };
    }
    if (idx === 2) {
      // Right bottle (AURA NOIR): starts off-screen to the right with mirrored aerodynamic tilt
      return {
        x: isLg ? '100vw' : '80vw',
        rotate: 14,
        opacity: 0,
        filter: 'blur(10px)',
      };
    }
    // Center bottle (AURA ELIXIR): scales & lifts up from the depths
    return {
      y: 65,
      scale: 0.82,
      opacity: 0,
      filter: 'blur(8px)',
    };
  };

  const getEntranceAnimate = (idx) => {
    if (idx === 0 || idx === 2) {
      return {
        x: '0vw',
        rotate: 0,
        opacity: 1,
        filter: 'blur(0px)',
      };
    }
    return {
      y: 0,
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
    };
  };

  const getEntranceTransition = (idx) => {
    if (idx === 0 || idx === 2) {
      return {
        duration: 1.05,
        ease: [0.16, 1, 0.3, 1],
      };
    }
    return {
      duration: 0.9,
      delay: 0.1,
      ease: [0.16, 1, 0.3, 1],
    };
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ opacity: stageOpacity, y: stageY }}
      className="absolute inset-0 flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-8 z-15 pointer-events-auto select-none overflow-hidden"
    >
      {/* ================= EDITORIAL OVERSIZED HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 relative z-10"
      >
        <h2 className="font-sans font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-[#141210] leading-[1.02]">
          Crafted in the <br />
          <span className="font-extrabold bg-gradient-to-r from-[#B38738] via-[#C89B48] to-[#946820] bg-clip-text text-transparent">
            Abyss & Light
          </span>
        </h2>
      </motion.div>

      {/* ================= OPEN-CANVAS 3-FLACON ROW (PERFECTLY ALIGNED) ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 w-full max-w-6xl items-start relative">
        {EDITIONS.map((item, idx) => {
          const isHovered = hoveredId === item.id;
          const isOtherHovered = hoveredId && hoveredId !== item.id;

          // Parallax coordinate mapping
          const parallaxX = idx === 0 ? leftParallaxX : idx === 1 ? centerParallaxX : rightParallaxX;
          const parallaxY = idx === 0 ? leftParallaxY : idx === 1 ? centerParallaxY : rightParallaxY;
          const lateralScrollX = idx === 0 ? leftX : idx === 2 ? rightX : 0;

          return (
            <motion.div
              key={item.id}
              style={{
                x: isLg ? lateralScrollX : 0,
                opacity: fadeOpacity,
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`flex flex-col items-center text-center transition-all duration-500 transform-gpu cursor-pointer relative ${
                isOtherHovered ? 'opacity-40 filter blur-[0.5px] scale-95' : 'opacity-100'
              } ${isHovered ? 'z-40' : 'z-20'}`}
            >
              {/* ENTRANCE ANIMATION WRAPPER: Left glides from left screen, Right glides from right screen */}
              <motion.div
                initial={getEntranceInitial(idx)}
                animate={hasEntered ? getEntranceAnimate(idx) : getEntranceInitial(idx)}
                transition={getEntranceTransition(idx)}
                className="w-full flex flex-col items-center"
              >
                {/* Ambient Radiant Glow behind Flacon */}
                <div
                  className={`absolute top-8 w-60 h-60 rounded-full bg-gradient-to-tr ${item.glowGradient} blur-3xl pointer-events-none transition-all duration-700 ${
                    isHovered ? 'scale-135 opacity-100' : 'scale-100 opacity-60'
                  }`}
                />

                {/* Center Halo Ring on hover or middle */}
                {idx === 1 && (
                  <div className="absolute top-10 w-56 h-56 rounded-full border border-dashed border-[#B38738]/30 animate-slow-rotate pointer-events-none" />
                )}

                {/* Uniform Flacon Frame: EXACT SAME ROW, SAME PROPORTIONS & SAME HEIGHT */}
                <div className="relative h-64 sm:h-72 lg:h-80 w-full flex items-center justify-center">
                  <motion.div
                    style={{
                      x: isLg ? parallaxX : 0,
                      y: isLg ? parallaxY : 0,
                    }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4.4 + idx * 0.6, ease: 'easeInOut' }}
                    className={`relative flex items-center justify-center transition-transform duration-500 h-full w-full ${
                      isHovered ? 'scale-108 -translate-y-2' : 'scale-100'
                    }`}
                  >
                    <img
                      src={item.img}
                      alt={item.editionName}
                      className="h-full w-auto max-h-[250px] sm:max-h-[275px] lg:max-h-[295px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] select-none pointer-events-none"
                      draggable={false}
                      loading="eager"
                    />
                    {/* Perfectly Aligned Pedestal Shadow */}
                    <div className="absolute bottom-1 w-32 h-3 rounded-[100%] bg-[#141210]/10 blur-[5px]" />
                  </motion.div>
                </div>

                {/* Staggered Editorial Narrative Across The Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.65, delay: 0.3 + idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-5 space-y-1.5 max-w-xs w-full flex flex-col items-center"
                >
                  <h3 className="font-sans font-extrabold text-2xl text-[#141210] tracking-tight">
                    {item.editionName}
                  </h3>
                  <p className="text-[#141210]/65 text-xs font-light leading-relaxed min-h-[36px]">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
