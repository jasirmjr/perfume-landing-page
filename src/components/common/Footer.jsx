import React, { useState } from 'react';
import { Mail, ArrowRight, Sparkles, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Footer = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { theme } = useCart();
  const isLight = theme === 'light';

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      className={`relative border-t pt-20 pb-12 overflow-hidden text-sm transition-colors duration-300 ${
        isLight
          ? 'bg-slate-50 border-slate-200 text-slate-600'
          : 'bg-[#020710] border-white/10 text-gray-400'
      }`}
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b ${
            isLight ? 'border-slate-200' : 'border-white/5'
          }`}
        >
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
             
              <span
                className={`font-serif font-bold text-3xl tracking-[0.25em] uppercase ${
                  isLight ? 'text-[#141210]' : 'text-white'
                }`}
              >
                AURA
              </span>
            </div>
            <p className="font-light leading-relaxed max-w-sm text-xs">
              Distilled in Grasse, captured from oceanic depths. A luxury perfume maison honoring the untamed marine world through sustainable haute perfumerie.
            </p>
            <div className="pt-2">
              
            </div>
          </div>

          {/* Maison Links */}
          <div>
            <h4
              className={`font-serif uppercase tracking-[0.2em] text-xs font-semibold mb-4 ${
                isLight ? 'text-[#141210]' : 'text-white'
              }`}
            >
              Maison
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('notes')}
                  className="hover:text-[#B38738] transition-colors cursor-pointer"
                >
                  Olfactory Notes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('craft')}
                  className="hover:text-[#B38738] transition-colors cursor-pointer"
                >
                  Artisanal Craft & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-[#B38738] transition-colors cursor-pointer"
                >
                  The Flacon Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-[#B38738] transition-colors cursor-pointer"
                >
                  Interactive Scent Finder
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Services */}
          <div>
            <h4
              className={`font-serif uppercase tracking-[0.2em] text-xs font-semibold mb-4 ${
                isLight ? 'text-[#141210]' : 'text-white'
              }`}
            >
              Atelier & Care
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#B38738] transition-colors cursor-pointer"
                >
                  VIP Concierge Appointment
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('press')}
                  className="hover:text-[#B38738] transition-colors cursor-pointer"
                >
                  Press & Editorials
                </button>
              </li>
              <li>
                <span className="text-gray-400 cursor-not-allowed">Murano Bottle Restoration</span>
              </li>
              <li>
                <span className="text-gray-400 cursor-not-allowed">Ocean Conservation Fund</span>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div className="space-y-3">
            <h4
              className={`font-serif uppercase tracking-[0.2em] text-xs font-semibold ${
                isLight ? 'text-[#141210]' : 'text-white'
              }`}
            >
              The Private Salon
            </h4>
            <p className="text-xs">
              Receive private invitations to confidential harvest releases and limited flacon reserves.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-xs text-[#B38738] bg-[#B38738]/10 p-3 rounded-lg border border-[#B38738]/30">
                <Check className="w-4 h-4" />
                <span>You are inducted into the Private Salon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className={`w-full border rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#B38738] ${
                      isLight
                        ? 'bg-white border-stone-300 text-[#141210] placeholder-stone-400'
                        : 'bg-[#0D0B09] border-white/15 text-white placeholder-gray-500'
                    }`}
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#B38738] text-white rounded-md text-xs font-medium hover:bg-[#946820] transition-colors cursor-pointer flex items-center justify-center shadow-sm"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Legal and Colophon */}
        <div
          className={`pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-4 ${
            isLight ? 'text-slate-500' : 'text-gray-500'
          }`}
        >
          <p>© {new Date().getFullYear()} AURA Parfumerie Internationale. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Formulated in Grasse, France</span>
            <span>•</span>
            <span>Crafted with 100% Recycled Oceanic Glass</span>
           
          </div>
        </div>
      </div>
    </footer>
  );
};
