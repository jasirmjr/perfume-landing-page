import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Droplet, Compass } from 'lucide-react';

/**
 * Editorial chapters for the oceanic flacon journey.
 * Each act has distinct narrative typography, chrome gradients, and icons.
 */
const CHAPTERS = [
  {
    id: 'act-1',
    actNumber: '01',
    badge: 'Act I • Genesis of Sun & Water',
    badgeIcon: Sparkles,
    badgeClasses: 'border-[#B38738]/50 text-[#F5DEB3] bg-black/35',
    iconColor: 'text-[#B38738]',
    titleLine1: 'A Drop of',
    titleLine2: 'Eternity',
    titleGradient: 'bg-gradient-to-r from-[#FFF5E6] via-[#E2B768] via-[#B38738] to-[#946820]',
    dividerGradient: 'from-transparent via-[#B38738] to-transparent',
    accentDot: 'bg-[#B38738] shadow-[0_0_10px_rgba(179,135,56,0.7)]',
    description: 'Born from the sun, kissed by the tides. An invitation into the rare mystery of liquid amber.',
  },
  {
    id: 'act-2',
    actNumber: '02',
    badge: 'Act II • 400M Abyssal Extraction',
    badgeIcon: Droplet,
    badgeClasses: 'border-[#B38738]/50 text-[#F5DEB3] bg-black/35',
    iconColor: 'text-[#B38738]',
    titleLine1: 'Submerged In',
    titleLine2: 'Purity',
    titleGradient: 'bg-gradient-to-r from-[#FFF5E6] via-[#E2B768] via-[#B38738] to-[#946820]',
    dividerGradient: 'from-transparent via-[#B38738] to-transparent',
    accentDot: 'bg-[#B38738] shadow-[0_0_10px_rgba(179,135,56,0.7)]',
    description: 'Rare marine botanicals and cold sea kelp harvested at abyssal depths, suspended in pristine clarity.',
  },
  {
    id: 'act-3',
    actNumber: '03',
    badge: 'Act III • Oceanic Sillage & Alchemy',
    badgeIcon: Compass,
    badgeClasses: 'border-[#B38738]/50 text-[#F5DEB3] bg-black/35',
    iconColor: 'text-[#B38738]',
    titleLine1: 'An Unforgotten',
    titleLine2: 'Drift',
    titleGradient: 'bg-gradient-to-r from-[#FFF5E6] via-[#E2B768] via-[#B38738] to-[#946820]',
    dividerGradient: 'from-transparent via-[#B38738] to-transparent',
    accentDot: 'bg-[#B38738] shadow-[0_0_10px_rgba(179,135,56,0.7)]',
    description: 'Grey oceanic ambergris, coastal neroli, and sun-drenched driftwood coalescing into pure sillage.',
  },
];

// Motion choreography variants for a distinct, high-fashion text transition
const chapterVariants = {
  initial: {
    opacity: 0,
    y: 32,
    scale: 0.97,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1], // Smooth luxury deceleration curve
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
  exit: {
    opacity: 0,
    y: -28,
    scale: 0.97,
    filter: 'blur(10px)',
    transition: {
      duration: 0.35,
      ease: [0.32, 0, 0.67, 0], // Clean departure curve
    },
  },
};

const childVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.25 },
  },
};

/**
 * HeroScrollText with discrete, non-overlapping chapter transitions:
 * - Guarantees ZERO simultaneous text overlap / ghosting.
 * - Uses AnimatePresence mode="wait" for clean exit-before-enter transitions.
 * - Distinct, luxury blur-slide-fade choreography.
 * - Strict maximum two-line headline presentation.
 * - No dark vignette shadow.
 */
export const HeroScrollText = ({ scrollProgress }) => {
  // Determine strictly active chapter index based on scroll position:
  // Balanced thirds across the hero journey with generous reading windows:
  // Act I:   0.00 to 0.30 (Genesis of Sun & Water)
  // Act II:  0.30 to 0.58 (400M Abyssal Extraction)
  // Act III: 0.58 to 0.98 (Oceanic Sillage & Alchemy - prominent climax)
  let activeIndex = -1;
  if (scrollProgress >= 0.0 && scrollProgress < 0.30) {
    activeIndex = 0;
  } else if (scrollProgress >= 0.30 && scrollProgress < 0.58) {
    activeIndex = 1;
  } else if (scrollProgress >= 0.58 && scrollProgress < 0.98) {
    activeIndex = 2;
  }

  const activeChapter = activeIndex >= 0 ? CHAPTERS[activeIndex] : null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center p-4 sm:p-8 select-none">
      <AnimatePresence mode="wait">
        {activeChapter && (
          <motion.div
            key={activeChapter.id}
            variants={chapterVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute text-center max-w-2xl px-4 flex flex-col items-center justify-center transform-gpu will-change-transform"
          >
           

            {/* Strict 2-Line Heading */}
            <motion.h1
              variants={childVariants}
              className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight uppercase leading-[1.04] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] mb-3.5"
            >
              <span className="block whitespace-nowrap">
                {activeChapter.titleLine1}
              </span>
              <span
                className={`block whitespace-nowrap italic font-black bg-clip-text text-transparent ${activeChapter.titleGradient}`}
              >
                {activeChapter.titleLine2}
              </span>
            </motion.h1>

            {/* Sub-heading / Narrative Description */}
            <motion.p
              variants={childVariants}
              className="text-xs sm:text-sm md:text-base max-w-md mx-auto text-slate-100 font-normal tracking-wide leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
            >
              {activeChapter.description}
            </motion.p>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
