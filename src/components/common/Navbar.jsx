import React, { useState } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Navbar = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalCount, setIsCartOpen, isSoundActive, toggleSound } = useCart();

  const navLinks = [
    { id: 'home', label: 'Experience' },
    { id: 'notes', label: 'Notes' },
    { id: 'craft', label: 'Craft' },
    { id: 'shop', label: 'Collection' },
    { id: 'quiz', label: 'Scent Finder' },
    { id: 'press', label: 'Editorial' },
    { id: 'contact', label: 'Concierge' }
  ];

  return (
    <>
      {/* Floating Header with reduced maximum width and pure white frosted aesthetic */}
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300 px-4 sm:px-6 py-3.5 flex justify-center pointer-events-none">
        <div className="w-full max-w-3xl rounded-full backdrop-blur-xl transition-all duration-300 px-5 sm:px-6 py-2.5 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.06)] border border-slate-200/80 bg-white/90 text-slate-800 pointer-events-auto">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-left group cursor-pointer flex-shrink-0"
          >
           
            <div>
              <span className="font-serif font-bold text-xl tracking-[0.22em] uppercase block leading-none text-[#141210]">
                AURA
              </span>
              
            </div>
          </button>

          {/* Desktop Navigation Links (Compact Spacing & High Legibility) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`text-[11px] tracking-[0.18em] uppercase transition-all duration-200 relative py-1 cursor-pointer font-medium ${
                    isActive
                      ? 'text-[#B38738] font-semibold'
                      : 'text-stone-600 hover:text-[#141210]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#B38738] rounded-full shadow-[0_0_8px_#B38738]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            


            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-stone-700 hover:text-[#141210] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown / Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden backdrop-blur-2xl bg-white/95 text-[#141210] flex flex-col pt-24 px-8 pb-10 transition-colors">
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-serif text-2xl tracking-[0.15em] uppercase py-2 cursor-pointer transition-colors ${
                  currentPage === link.id
                    ? 'text-[#AA820A]'
                    : 'text-slate-700 hover:text-black'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

        </div>
      )}
    </>
  );
};
