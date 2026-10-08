import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Wind, Droplets, Compass, ShieldCheck, ArrowRight, Eye, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';

export const InteractiveBottleExperience = ({ onSelectProduct }) => {
  const { addToCart } = useCart();
  const [activeLayer, setActiveLayer] = useState('notes'); // 'notes' | 'extraction' | 'glass'
  const [isCopied, setIsCopied] = useState(false);

  const flagship = PRODUCTS[0];

  const handleAcquire = () => {
    addToCart(flagship, '100ml');
  };

  return (
    <section className="relative overflow-hidden py-28 bg-gradient-to-b from-white via-stone-50 to-white border-t border-stone-200/90 text-[#141210]">
      {/* Ambient background kinetic light circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#B38738]/15 via-[#FBF6ED] to-transparent rounded-full blur-[110px] pointer-events-none -z-0" />
      <div className="absolute -bottom-24 right-10 w-96 h-96 bg-[#B38738]/10 rounded-full blur-[90px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#B38738]/40 bg-[#FBF6ED] text-[#B38738] font-mono text-[10px] uppercase tracking-[0.28em] mb-4 shadow-2xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Flacon Atelier</span>
          </div>
          <h2 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#141210] uppercase tracking-tight leading-[1.08]">
            The Kinetic Flacon <br />
            <span className="italic font-bold text-[#B38738]">Sculpted by Tides</span>
          </h2>
          <p className="text-stone-600 font-light mt-4 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Hover to rotate and inspect the organic contours of our hand-blown Murano glass flacon, housing pure cold-pressed ocean extract.
          </p>
        </div>

        {/* Interactive Main Showcase Stage */}
        <div className="bg-white/90 backdrop-blur-xl border border-stone-200/90 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-8 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Feature Selector */}
          <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#B38738] font-semibold block mb-2">
              Flacon Anatomy & Craft
            </span>

            {/* Tab 1 */}
            <button
              onClick={() => setActiveLayer('notes')}
              className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                activeLayer === 'notes'
                  ? 'bg-[#FBF6ED] border-[#B38738] shadow-sm'
                  : 'bg-stone-50/60 border-stone-200/80 hover:bg-stone-50'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${activeLayer === 'notes' ? 'bg-[#B38738] text-white' : 'bg-white text-stone-700 shadow-xs'}`}>
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#141210]">Saline Amber Extrait</h4>
                <p className="text-xs text-stone-600 mt-1 font-light leading-relaxed">
                  28% pure perfume oil concentration with natural Grey Ambergris and Calabrian bergamot.
                </p>
              </div>
            </button>

            {/* Tab 2 */}
            <button
              onClick={() => setActiveLayer('extraction')}
              className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                activeLayer === 'extraction'
                  ? 'bg-[#FBF6ED] border-[#B38738] shadow-sm'
                  : 'bg-stone-50/60 border-stone-200/80 hover:bg-stone-50'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${activeLayer === 'extraction' ? 'bg-[#B38738] text-white' : 'bg-white text-stone-700 shadow-xs'}`}>
                <Wind className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#141210]">Subcritical CO₂ Harvest</h4>
                <p className="text-xs text-stone-600 mt-1 font-light leading-relaxed">
                  Extracted at 400m below the Mediterranean without chemical heat or petrochemical solvents.
                </p>
              </div>
            </button>

            {/* Tab 3 */}
            <button
              onClick={() => setActiveLayer('glass')}
              className={`w-full text-left p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                activeLayer === 'glass'
                  ? 'bg-[#FBF6ED] border-[#B38738] shadow-sm'
                  : 'bg-stone-50/60 border-stone-200/80 hover:bg-stone-50'
              }`}
            >
              <div className={`p-2.5 rounded-xl ${activeLayer === 'glass' ? 'bg-[#B38738] text-white' : 'bg-white text-stone-700 shadow-xs'}`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-medium text-[#141210]">Venetian Recycled Glass</h4>
                <p className="text-xs text-stone-600 mt-1 font-light leading-relaxed">
                  Heavy sculptural base hand-polished to mimic tidal-smoothed ocean pebbles.
                </p>
              </div>
            </button>
          </div>

          {/* Center Column: The Animated Floating Perfume Image */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative order-1 lg:order-2 py-6">
            
            {/* Animated Rotating Golden Ring / Halo in the background */}
            <div className="absolute w-72 sm:w-88 h-72 sm:h-88 rounded-full border border-dashed border-[#B38738]/40 animate-slow-rotate pointer-events-none" />
            <div className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-gradient-to-r from-[#B38738]/20 to-[#FBF6ED]/40 blur-2xl animate-aura-pulse pointer-events-none" />

            {/* Floating Perfume Bottle Image (public/img1.png) */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative z-10 animate-luxury-float cursor-grab active:cursor-grabbing max-w-[320px] sm:max-w-[360px] flex items-center justify-center filter drop-shadow-[0_25px_35px_rgba(179,135,56,0.25)]"
            >
              <img
                src="/img1.png"
                alt="AURA Haute Parfumerie Flacon"
                className="w-full h-auto object-contain max-h-[440px] select-none"
                draggable={false}
              />
            </motion.div>

            {/* Floating Interactive Badge Tags */}
            <div className="absolute -bottom-2 sm:bottom-0 px-4 py-2 rounded-full bg-white/95 border border-stone-200 shadow-md text-xs font-mono text-[#141210] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-medium tracking-wider">AURA NO. 01 • 100ML EXTRAIT</span>
            </div>
          </div>

          {/* Right Column: Acquisition & Sensory Dossier */}
          <div className="lg:col-span-3 space-y-6 order-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-400 block mb-1">
                Atelier Masterpiece
              </span>
              <h3 className="font-serif text-3xl text-[#141210] leading-tight">
                AURA Eau de Parfum
              </h3>
              <p className="text-2xl font-mono text-[#B38738] font-semibold mt-1">
                $245 <span className="text-xs text-stone-400 font-sans font-normal">USD</span>
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-stone-100 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Concentration</span>
                <span className="font-mono font-medium text-[#141210]">28% Pure Extrait</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Sillage Projection</span>
                <span className="font-mono font-medium text-[#141210]">14+ Hours Wear</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Bottle Material</span>
                <span className="font-mono font-medium text-[#141210]">Murano Glass</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleAcquire}
                className="w-full py-4 rounded-full bg-[#B38738] hover:bg-[#946820] text-white font-semibold text-xs tracking-[0.25em] uppercase hover:shadow-[0_0_25px_rgba(179,135,56,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5"
              >
                <span>Acquire Flacon</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectProduct('aura-edp')}
                className="w-full py-3.5 rounded-full border border-stone-300 bg-white hover:bg-[#FBF6ED] text-[#141210] text-xs tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Examine Scent Dossier</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Complimentary insured shipping & 2ml sample vial</span>
            </div>
          </div>

        </div>

        {/* Sensory Marquee Ticker below the section */}
        <div className="mt-16 overflow-hidden border-y border-slate-200/80 py-4 bg-slate-50/50">
          <div className="flex gap-12 whitespace-nowrap animate-shimmer text-xs font-mono uppercase tracking-[0.25em] text-slate-500">
            <span>Calabrian Bergamot</span>
            <span>•</span>
            <span>Blue Lotus</span>
            <span>•</span>
            <span>Oceanic Grey Ambergris</span>
            <span>•</span>
            <span>Sun-Bleached Driftwood</span>
            <span>•</span>
            <span>Supercritical CO₂ Extraction</span>
            <span>•</span>
            <span>Murano Glasscraft</span>
            <span>•</span>
            <span>100% Oceanic Custody</span>
          </div>
        </div>

      </div>
    </section>
  );
};
