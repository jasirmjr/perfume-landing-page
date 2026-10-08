import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Sun, Wind, Compass, Sparkles, Clock, Feather, ShieldAlert } from 'lucide-react';
import { soundManager } from '../data/products';

export const FragranceNotes = ({ onSelectProduct }) => {
  const [activeTier, setActiveTier] = useState('top');

  const tiers = {
    top: {
      name: 'Top Notes — The Oceanic Emergence',
      duration: '0 to 30 Minutes',
      role: 'The initial sparkling burst upon atomization. Evaporates quickly to leave a radiant morning marine veil.',
      notes: [
        {
          name: 'Calabrian Bergamot',
          origin: 'Reggio Calabria, Italy',
          sensory: 'Sparkling, crisp citrus with sun-drenched floral nuances and cold effervescence.',
          molecule: 'Limonene & Linalyl Acetate'
        },
        {
          name: 'Marine Ozone & Sea Spray',
          origin: 'Atlantic Surface Mist',
          sensory: 'Electrified salinity, airy marine breeze reminiscent of crashing Atlantic surf on warm granite.',
          molecule: 'Calone 1951 & Floralozone'
        },
        {
          name: 'Fleur de Sel Crystals',
          origin: 'Guérande Salt Marshes',
          sensory: 'Mineral, pure, textured iodine nuances that ground the opening brightness.',
          molecule: 'Natural Oceanic Halite'
        }
      ]
    },
    heart: {
      name: 'Heart Notes — The Oceanic Core',
      duration: '30 Minutes to 4 Hours',
      role: 'The harmonious emotional identity of AURA. Rich aquatic blooms enveloped in sun-warmed botanicals.',
      notes: [
        {
          name: 'Submerged Blue Lotus',
          origin: 'Nile Delta Estuary',
          sensory: 'Intoxicating, watery floral sweetness with ethereal green accents and meditative tranquility.',
          molecule: 'Nymphaea Caerulea Absolute'
        },
        {
          name: 'Coastal Neroli Blossoms',
          origin: 'Cap d’Antibes, France',
          sensory: 'Honeyed orange blossoms touched by maritime sea winds and gentle floral honey.',
          molecule: 'Citrus Aurantium Amara'
        },
        {
          name: 'Deep Sea Orchid',
          origin: 'Azores Archipelago',
          sensory: 'Velvety, rare botanical moisture that brings weightless oceanic sensuality.',
          molecule: 'Orchidaceae Essence'
        }
      ]
    },
    base: {
      name: 'Base Notes — The Abyssal Foundation',
      duration: '4 to 14+ Hours',
      role: 'The enduring skin imprint that lingers overnight. Rich, warm, organic oceanic resins and sun-bleached woods.',
      notes: [
        {
          name: 'Aged Grey Ambergris',
          origin: 'New Zealand Shores',
          sensory: 'Warm animalic sweetness, golden mineral salinity, tobacco-like warmth and magnetic silage.',
          molecule: 'Ambrein & Ambroxan'
        },
        {
          name: 'Sun-Bleached Driftwood',
          origin: 'Corsican Coastline',
          sensory: 'Dry weathered cedar, salty woody bark soaked by decades of tide and Mediterranean sun.',
          molecule: 'Cedrol & Vertofix'
        },
        {
          name: 'Crystalline White Musk',
          origin: 'Laboratory Haute Synthesis',
          sensory: 'Pristine linen, sensual warm skin warmth, soft velvet texture that holds the fragrance indefinitely.',
          molecule: 'Helvetolide & Muscenone'
        }
      ]
    }
  };

  const currentData = tiers[activeTier];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto bg-white text-[#141210]">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#B38738] block mb-3 font-semibold">
          Olfactory Architecture
        </span>
        <h1 className="font-serif font-extrabold text-5xl sm:text-6xl lg:text-7xl text-[#141210] uppercase tracking-tight">
          The Scent <span className="italic font-bold bg-gradient-to-r from-[#B38738] via-[#C89B48] to-[#946820] bg-clip-text text-transparent">Pyramid</span>
        </h1>
        <p className="text-stone-600 font-light mt-4 text-base sm:text-lg leading-relaxed">
          A three-tiered symphony orchestrated to evolve throughout the day, mirroring the descent into the calm depths of the open ocean.
        </p>
      </div>

      {/* Tier Switcher Buttons */}
      <div className="flex justify-center mb-16">
        <div className="p-1.5 rounded-full bg-stone-100 flex gap-2 border border-stone-200 shadow-xs">
          <button
            onClick={() => {
              setActiveTier('top');
              soundManager.playChime();
            }}
            className={`px-6 py-2.5 rounded-full text-xs tracking-[0.2em] uppercase transition-all cursor-pointer font-medium ${
              activeTier === 'top'
                ? 'bg-white text-[#141210] shadow-md border border-[#B38738]/40 font-semibold'
                : 'text-stone-600 hover:text-[#141210]'
            }`}
          >
            Top Notes (0-30m)
          </button>
          <button
            onClick={() => {
              setActiveTier('heart');
              soundManager.playChime();
            }}
            className={`px-6 py-2.5 rounded-full text-xs tracking-[0.2em] uppercase transition-all cursor-pointer font-medium ${
              activeTier === 'heart'
                ? 'bg-white text-[#141210] shadow-md border border-[#B38738]/40 font-semibold'
                : 'text-stone-600 hover:text-[#141210]'
            }`}
          >
            Heart Notes (30m-4h)
          </button>
          <button
            onClick={() => {
              setActiveTier('base');
              soundManager.playChime();
            }}
            className={`px-6 py-2.5 rounded-full text-xs tracking-[0.2em] uppercase transition-all cursor-pointer font-medium ${
              activeTier === 'base'
                ? 'bg-white text-[#141210] shadow-md border border-[#B38738]/40 font-semibold'
                : 'text-stone-600 hover:text-[#141210]'
            }`}
          >
            Base Notes (4-14h+)
          </button>
        </div>
      </div>

      {/* Interactive Pyramid Breakdown */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTier}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="space-y-12"
        >
          {/* Tier Overview Banner */}
          <div className="bg-[#FBF6ED]/60 border border-[#B38738]/20 p-8 sm:p-10 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
            <div>
              <div className="flex items-center gap-3 text-[#B38738] mb-2 font-semibold">
                <Clock className="w-4 h-4" />
                <span className="font-mono text-xs uppercase tracking-widest">{currentData.duration}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#141210] font-medium">{currentData.name}</h2>
              <p className="text-stone-600 text-sm mt-2 max-w-2xl font-light leading-relaxed">
                {currentData.role}
              </p>
            </div>
            <button
              onClick={() => onSelectProduct('aura-edp')}
              className="px-6 py-3 rounded-full border border-[#B38738] bg-white text-[#141210] text-xs tracking-[0.2em] uppercase hover:bg-[#B38738] hover:text-white transition-all whitespace-nowrap cursor-pointer shadow-xs font-medium"
            >
              Experience in Flacon
            </button>
          </div>

          {/* Cards for Notes in this Tier */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentData.notes.map((note, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm hover:border-[#B38738]/50 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono tracking-widest text-[#B38738] uppercase font-semibold">
                      Origin: {note.origin}
                    </span>
                    <Sparkles className="w-4 h-4 text-[#B38738] transition-colors" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#141210] mb-3 group-hover:text-[#B38738] transition-colors font-medium">
                    {note.name}
                  </h3>
                  <p className="text-stone-600 text-sm font-light leading-relaxed mb-6">
                    {note.sensory}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1">
                    Key Olfactory Isolate
                  </span>
                  <span className="text-xs font-mono text-[#141210]">{note.molecule}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Longevity & Silage Radar */}
      <div className="mt-24 bg-[#FBF6ED]/60 p-10 rounded-3xl border border-[#B38738]/20 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#B38738] uppercase block mb-2 font-semibold">
              Performance Metrology
            </span>
            <h3 className="font-serif text-3xl text-[#141210] mb-4 font-medium">Silage & Longevity</h3>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Formulated at 28% Extrait de Parfum concentration in organic sugarcane alcohol without chemical extenders or phthalates.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-stone-200 text-center shadow-xs">
              <span className="text-3xl font-serif text-[#B38738] block mb-2 font-semibold">14+ Hrs</span>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-mono">Skin Persistence</span>
            </div>
            <div className="p-6 rounded-xl bg-white border border-stone-200 text-center shadow-xs">
              <span className="text-3xl font-serif text-[#B38738] block mb-2 font-semibold">3.5 Meters</span>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-mono">Silage Projection</span>
            </div>
            <div className="p-6 rounded-xl bg-white border border-stone-200 text-center shadow-xs">
              <span className="text-3xl font-serif text-[#B38738] block mb-2 font-semibold">28%</span>
              <span className="text-xs uppercase tracking-widest text-stone-500 font-mono">Pure Extrait Oil</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
