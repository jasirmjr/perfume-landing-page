import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Waves } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    theme
  } = useCart();

  const isLight = theme === 'light';
  const shippingThreshold = 200;
  const isFreeShipping = subtotal >= shippingThreshold;
  const remainingForFreeShipping = Math.max(0, shippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className={`w-screen max-w-md border-l flex flex-col shadow-2xl transition-colors ${
                isLight
                  ? 'bg-white text-slate-800 border-slate-200'
                  : 'bg-[#071324] text-white border-[#D4AF37]/20'
              }`}
            >
              {/* Header */}
              <div className="p-6 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[#B8860B] dark:text-[#D4AF37]">
                    Haute Parfumerie
                  </span>
                  <h3 className="font-serif text-2xl tracking-wide uppercase">Your Selection</h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free shipping banner */}
              <div
                className={`px-6 py-3 border-b flex items-center gap-3 ${
                  isLight
                    ? 'bg-amber-50/70 border-amber-100 text-slate-700'
                    : 'bg-[#0A1D36] border-white/5 text-gray-300'
                }`}
              >
                <Waves className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <p className="text-xs">
                  {isFreeShipping ? (
                    <span className="text-[#B8860B] dark:text-[#D4AF37] font-medium">
                      Complimentary oceanic courier included
                    </span>
                  ) : (
                    <span>
                      Add <strong>${remainingForFreeShipping}</strong> for complimentary express delivery
                    </span>
                  )}
                </p>
              </div>

              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-16 h-16 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center mb-4 text-[#D4AF37]">
                      <Waves className="w-8 h-8 opacity-40" />
                    </div>
                    <p className="font-serif text-xl mb-2">Your Coffret is Empty</p>
                    <p className="text-xs text-gray-500 max-w-xs mb-6 font-light">
                      Explore our oceanic extrait collection and select your signature olfactory imprint.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2.5 rounded-full border border-[#D4AF37] text-[#B8860B] dark:text-[#D4AF37] text-xs tracking-[0.2em] uppercase hover:bg-[#D4AF37]/10 transition-all cursor-pointer font-medium"
                    >
                      Browse Scents
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4 pb-6 border-b border-black/5 dark:border-white/5 group"
                    >
                      <div className="w-20 h-24 rounded-lg overflow-hidden bg-slate-100 dark:bg-black/40 border border-black/5 dark:border-white/10 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-serif text-lg leading-tight">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-xs text-[#B8860B] dark:text-[#D4AF37] font-mono block mt-0.5">
                            {item.size} • Extrait
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-black/15 dark:border-white/15 rounded-full px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.size, -1)}
                              className="p-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-mono">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.size, 1)}
                              className="p-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-mono text-sm font-semibold text-slate-800 dark:text-[#F3E5AB]">
                            ${item.price * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Footer */}
              {cartItems.length > 0 && (
                <div
                  className={`p-6 border-t space-y-4 ${
                    isLight ? 'bg-stone-50 border-stone-200' : 'bg-[#0D0B09]/95 border-white/10'
                  }`}
                >
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span className="font-mono font-medium text-[#141210] dark:text-white">
                        ${subtotal}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>Oceanic Certified Courier</span>
                      <span className="font-mono text-[#B38738]">
                        {isFreeShipping ? 'COMPLIMENTARY' : '$15'}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-serif pt-2 border-t border-black/10 dark:border-white/10">
                      <span>Total Immersion</span>
                      <span className="font-mono text-lg font-bold text-[#B38738]">
                        ${subtotal + (isFreeShipping ? 0 : 15)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert('Redirecting to AURA Secure VIP Atelier Checkout. Your oceanic order is reserved.');
                    }}
                    className="w-full py-4 rounded-full bg-[#B38738] hover:bg-[#946820] text-white font-semibold text-xs tracking-[0.25em] uppercase hover:shadow-[0_0_20px_rgba(179,135,56,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Proceed to VIP Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B38738]" />
                    <span>Encrypted 256-bit Checkout • Authentic Batch Guarantee</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
