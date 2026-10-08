import React from 'react';
import { PRESS_ITEMS } from '../data/products';
import { Award, Quote, Sparkles, ExternalLink } from 'lucide-react';

export const Press = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#B38738] block mb-3">
          International Acclaim
        </span>
        <h1 className="font-serif font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight">
          Press & <span className="italic font-bold bg-gradient-to-r from-[#B38738] via-[#C89B48] to-[#946820] bg-clip-text text-transparent">Editorial</span>
        </h1>
        <p className="text-gray-300 font-light mt-4 text-base sm:text-lg leading-relaxed">
          Celebrated by the foremost critics in haute parfumerie, architecture, and luxury design.
        </p>
      </div>

      {/* Campaign Feature Billboard */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 glass-panel p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B38738]/40 bg-[#0D0B09]/80 text-[10px] tracking-widest text-[#B38738] uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>Prix de la Beauté 2026 Winner</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-white uppercase leading-tight">
            “The most evocative aquatic creation of the past twenty years.”
          </h2>
          <p className="text-gray-300 font-light text-sm sm:text-base leading-relaxed">
            In its annual Grand Prix feature, VOGUE Haute Parfumerie hailed AURA as a watershed moment for sustainable high luxury, awarding it Best Sillage and Most Innovative Natural Extraction.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
            <span>PARIS FASHION WEEK EDITION</span>
            <span>•</span>
            <span className="text-[#B38738]">OCTOBER 2026</span>
          </div>
        </div>

        <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80"
            alt="Editorial Campaign Feature"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Critical Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PRESS_ITEMS.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/10 hover:border-[#B38738]/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono tracking-widest text-[#B38738] uppercase">
                  {item.badge}
                </span>
                <span className="text-[11px] font-mono text-gray-500 uppercase">
                  {item.date}
                </span>
              </div>
              <p className="font-serif text-xl sm:text-2xl text-white leading-relaxed mb-6 group-hover:text-[#E2B768] transition-colors">
                {item.quote}
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <div>
                <h4 className="font-serif text-lg text-white">{item.publication}</h4>
                <p className="text-xs font-mono text-gray-400">{item.author}</p>
              </div>
              <Quote className="w-8 h-8 text-[#B38738]/30" />
            </div>
          </div>
        ))}
      </div>

      {/* Press Kit Download CTA */}
      <div className="p-8 rounded-2xl glass-panel-subtle border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-serif text-xl text-white">Press Inquiries & Archival Imagery</h4>
          <p className="text-xs text-gray-400 font-light mt-1">
            Access high-resolution campaign assets, lookbooks, and fragrance notes dossier for publication.
          </p>
        </div>
        <button
          onClick={() => alert('AURA 2026 Press Dossier (PDF & High-Res TIFF Assets) download link generated.')}
          className="px-6 py-3 rounded-full border border-[#B38738]/50 text-[#E2B768] text-xs tracking-[0.2em] uppercase hover:bg-[#B38738]/15 hover:border-[#B38738] transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
        >
          <span>Download 2026 Press Kit</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
