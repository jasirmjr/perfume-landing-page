import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, soundManager } from '../data/products';
import { useCart } from '../context/CartContext';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUESTIONS = [
  {
    id: 1,
    title: 'When is your presence most pronounced?',
    subtitle: 'The circadian rhythm of your signature essence.',
    options: [
      { text: 'Sun-drenched Mediterranean daylight & seaside warmth', profile: 'aura-elixir' },
      { text: 'Crystalline morning dawn & open breezy oceans', profile: 'aura-edp' },
      { text: 'Midnight galas, twilight dinners & intimate shadows', profile: 'aura-noir' },
      { text: 'Ever-shifting journeys & versatile travel moments', profile: 'aura-discovery-set' }
    ]
  },
  {
    id: 2,
    title: 'What texture evokes your personal serenity?',
    subtitle: 'The tactile emotional imprint you seek.',
    options: [
      { text: 'Crystalline salt crystals & crisp marine ozone air', profile: 'aura-edp' },
      { text: 'Velvety dark leather & warm smoldering amber resins', profile: 'aura-noir' },
      { text: 'Golden radiant citrus nectar & sun-kissed floral petals', profile: 'aura-elixir' },
      { text: 'A diverse flight of rare extracts awaiting discovery', profile: 'aura-discovery-set' }
    ]
  },
  {
    id: 3,
    title: 'What olfactory legacy do you wish to leave in the room?',
    subtitle: 'Your projected silage profile.',
    options: [
      { text: 'Effortless ethereal freshness that lingers like sea mist', profile: 'aura-edp' },
      { text: 'Hypnotic, mysterious authority that turns every head', profile: 'aura-noir' },
      { text: 'Enveloping golden glow and solar magnetic warmth', profile: 'aura-elixir' },
      { text: 'Subtle intimate variety tailored to the day’s mood', profile: 'aura-discovery-set' }
    ]
  }
];

export const ScentFinder = ({ onSelectProduct }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [recommendedProduct, setRecommendedProduct] = useState(null);
  const { addToCart } = useCart();

  const handleSelectOption = (profile) => {
    soundManager.playChime();
    const updatedAnswers = [...answers, profile];
    setAnswers(updatedAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate most frequent recommendation
      const counts = {};
      updatedAnswers.forEach(p => { counts[p] = (counts[p] || 0) + 1; });
      const bestMatchId = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      const match = PRODUCTS.find(p => p.id === bestMatchId) || PRODUCTS[0];
      setRecommendedProduct(match);

      // Trigger celebratory gold confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#FFF0CA', '#997B1E']
        });
      } catch {}
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setRecommendedProduct(null);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center justify-center">
      {!recommendedProduct ? (
        <div className="w-full">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8 max-w-md mx-auto">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#B38738]">
              Step {step + 1} of {QUESTIONS.length}
            </span>
            <div className="flex gap-2">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step ? 'w-8 bg-[#B38738]' : i < step ? 'w-4 bg-[#B38738]/50' : 'w-4 bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 text-center"
            >
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#B38738] block mb-3">
                Olfactory Diagnostic
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-white mb-3">
                {QUESTIONS[step].title}
              </h2>
              <p className="text-gray-400 text-sm font-light mb-10">
                {QUESTIONS[step].subtitle}
              </p>

              <div className="grid grid-cols-1 gap-4 text-left">
                {QUESTIONS[step].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option.profile)}
                    className="p-5 rounded-2xl glass-panel-subtle hover:border-[#B38738]/60 hover:bg-[#B38738]/10 border border-white/10 text-gray-200 hover:text-white transition-all text-sm font-light flex items-center justify-between group cursor-pointer"
                  >
                    <span>{option.text}</span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#B38738] group-hover:translate-x-1 transition-all flex-shrink-0 ml-4" />
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Recommendation Results Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full glass-panel p-8 sm:p-14 rounded-3xl border border-[#B38738]/40 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B38738]/40 bg-[#0D0B09]/80 text-[10px] tracking-widest text-[#B38738] uppercase mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Your Olfactory Soul Match</span>
          </div>

          <h2 className="font-serif font-extrabold text-4xl sm:text-6xl text-white uppercase mb-2">
            {recommendedProduct.name}
          </h2>
          <p className="text-sm font-mono tracking-widest text-[#B38738] uppercase mb-8">
            {recommendedProduct.tagline}
          </p>

          <div className="max-w-md mx-auto aspect-square rounded-2xl overflow-hidden border border-white/10 mb-8 shadow-2xl">
            <img
              src={recommendedProduct.image}
              alt={recommendedProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-gray-300 font-light text-base max-w-xl mx-auto leading-relaxed mb-8">
            {recommendedProduct.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onSelectProduct(recommendedProduct.id)}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#B38738] hover:bg-[#946820] text-white font-semibold text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_20px_rgba(179,135,56,0.45)] transition-all cursor-pointer"
            >
              Examine Full Profile (${recommendedProduct.price})
            </button>
            <button
              onClick={() => addToCart(recommendedProduct, recommendedProduct.sizes[0])}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#B38738]/50 text-[#E2B768] text-xs tracking-[0.2em] uppercase hover:bg-[#B38738]/15 transition-all cursor-pointer"
            >
              Add Direct to Coffret
            </button>
            <button
              onClick={handleReset}
              className="w-full sm:w-auto p-4 rounded-full border border-white/10 hover:border-white/30 text-gray-400 hover:text-white transition-all cursor-pointer"
              title="Retake Quiz"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
