import React from 'react';
import { Waves, Sparkles, Compass, ShieldCheck, Leaf, HeartHandshake, Award } from 'lucide-react';

export const CraftStory = ({ onNavigate }) => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto space-y-32">
      {/* Hero Narrative */}
      <section className="text-center max-w-4xl mx-auto">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-4">
          Haute Parfumerie Manifesto
        </span>
        <h1 className="font-serif font-extrabold text-5xl sm:text-6xl lg:text-8xl text-white uppercase tracking-tight leading-[0.95] mb-8">
          The Alchemy of <br />
          <span className="italic font-bold gold-gradient-text">Salt & Silence</span>
        </h1>
        <p className="text-gray-300 font-light text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
          We believe true luxury is not manufactured in rush. It is patiently gathered along coastlines, distilled in Grasse, and sealed in molten glass.
        </p>
      </section>

      {/* Chapter 1: Oceanic Harvesting */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#050D1A]/60 text-[10px] tracking-widest text-[#D4AF37] uppercase">
            Chapter 01 • The Depths
          </div>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-white uppercase leading-tight">
            Supercritical Oceanic Extraction
          </h2>
          <p className="text-gray-300 font-light text-base leading-relaxed">
            Standard aquatic fragrances rely entirely on synthetic laboratory approximations. At AURA, we pioneered a gentle, solvent-free subcritical CO₂ extraction of deep-sea brown laminaria kelp gathered responsibly off Brittany’s granite coast.
          </p>
          <p className="text-gray-400 font-light text-sm leading-relaxed">
            The result is a living saline absolute containing over 48 natural ocean minerals—giving AURA its signature magnetic weightlessness on human skin.
          </p>
          <div className="pt-4 flex items-center gap-8 border-t border-white/10 font-mono text-xs text-[#D4AF37]">
            <div>
              <span className="block text-2xl font-serif text-white">400m</span>
              <span>Harvest Depth</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-white">0%</span>
              <span>Petrochemical Solvents</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-white">48h</span>
              <span>Distillation Cold-Press</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
            alt="Ocean water and waves"
            className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050D1A] via-transparent to-transparent opacity-60" />
        </div>
      </section>

      {/* Chapter 2: Venetian Glassblowing */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
          <img
            src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80"
            alt="Handcrafted glass bottle details"
            className="w-full h-[450px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050D1A] via-transparent to-transparent opacity-60" />
        </div>

        <div className="order-1 lg:order-2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4AF37]/30 bg-[#050D1A]/60 text-[10px] tracking-widest text-[#D4AF37] uppercase">
            Chapter 02 • The Vessel
          </div>
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-white uppercase leading-tight">
            Sculpted by Master Murano Glassmakers
          </h2>
          <p className="text-gray-300 font-light text-base leading-relaxed">
            Every flacon is individually blown in the island lagoons of Venice using high-clarity silica and recycled oceanic glass. No two silhouettes are identical.
          </p>
          <p className="text-gray-400 font-light text-sm leading-relaxed">
            The weighted base feels like an ocean stone smoothed by a century of tides. The magnetic cap is carved from brass, hand-dipped in 24-karat brushed gold with an engraved nautical seal.
          </p>
          <div className="pt-4 flex items-center gap-8 border-t border-white/10 font-mono text-xs text-[#D4AF37]">
            <div>
              <span className="block text-2xl font-serif text-white">1,200°C</span>
              <span>Kiln Temperature</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-white">24K</span>
              <span>Gold Plated Cap</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-white">100%</span>
              <span>Refillable Life Flacon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Sustainability & Ocean Custody */}
      <section className="glass-panel p-12 lg:p-16 rounded-3xl border border-white/10 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Leaf className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
          <h2 className="font-serif font-bold text-4xl sm:text-5xl text-white uppercase">
            The Pledge of Oceanic Custody
          </h2>
          <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
            True respect for the sea demands active stewardship. For every flacon acquired, AURA restores 10 square meters of underwater kelp forest in the Mediterranean.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            <h4 className="font-serif text-xl text-white">Cruelty-Free Ethics</h4>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
              We exclusively use beach-cast aged ambergris gathered without harming marine life, certified by international marine sanctuaries.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
            <Waves className="w-6 h-6 text-[#D4AF37]" />
            <h4 className="font-serif text-xl text-white">1% For The Ocean</h4>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
              Direct donations support Mediterranean coral reef regeneration and plastic retrieval missions along the Amalfi and Corsica shores.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-3">
            <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />
            <h4 className="font-serif text-xl text-white">Endless Refill Program</h4>
            <p className="text-gray-400 text-xs leading-relaxed font-light">
              Return your Murano flacon to any global atelier for refill at a 30% preferential VIP privilege, preserving heirloom glass indefinitely.
            </p>
          </div>
        </div>

        <div className="text-center pt-6">
          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3.5 rounded-full bg-[#D4AF37] text-[#050D1A] font-semibold text-xs tracking-[0.2em] uppercase hover:bg-[#F3E5AB] transition-colors cursor-pointer"
          >
            Explore The Collection
          </button>
        </div>
      </section>
    </div>
  );
};
