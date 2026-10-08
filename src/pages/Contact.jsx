import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Clock, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { soundManager } from '../data/products';

export const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    atelierLocation: 'Paris • Place Vendôme',
    appointmentType: 'Private VIP Scent Consultation',
    preferredDate: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playChime();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-3">
          Private Client Services
        </span>
        <h1 className="font-serif font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white uppercase tracking-tight">
          Atelier & <span className="italic font-bold gold-gradient-text">Concierge</span>
        </h1>
        <p className="text-gray-300 font-light mt-4 text-base sm:text-lg leading-relaxed">
          Schedule a private one-on-one consultation with an AURA Master Nose or request custom bespoke engraving.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Atelier Locations & Services Info */}
        <div className="space-y-10">
          <div>
            <h3 className="font-serif font-bold text-3xl text-white mb-4">Maison Salons</h3>
            <p className="text-gray-400 font-light text-sm leading-relaxed mb-6">
              Our intimate flagship salons offer an immersive acoustic and olfactory environment designed by renowned acoustic architect Kengo Kuma.
            </p>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl text-white">Paris Atelier</h4>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase">Place Vendôme</span>
                </div>
                <p className="text-xs text-gray-400 font-light">18 Place Vendôme, 75001 Paris, France</p>
                <p className="text-xs text-gray-500 font-mono">By Private Appointment Only • Tue - Sat 11:00 - 19:00</p>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl text-white">Monaco Coastal Salon</h4>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase">Port Hercule</span>
                </div>
                <p className="text-xs text-gray-400 font-light">7 Quai Antoine 1er, 98000 Monaco</p>
                <p className="text-xs text-gray-500 font-mono">Oceanfront Yacht Delivery Available • Daily 10:00 - 20:00</p>
              </div>

              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-xl text-white">Tokyo Flagship</h4>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase">Ginza Six</span>
                </div>
                <p className="text-xs text-gray-400 font-light">6-10-1 Ginza, Chuo-ku, Tokyo, Japan</p>
                <p className="text-xs text-gray-500 font-mono">Private Tea & Scent Pairing Room</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel-subtle border border-white/10 space-y-3">
            <h4 className="font-serif text-lg text-white">Direct VIP Atelier Desk</h4>
            <div className="space-y-2 text-xs font-mono text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+33 (0)1 42 68 55 00 (International Concierge)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>concierge@aura-parfums.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Form */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10">
          {formSubmitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl text-white">Appointment Reserved</h3>
              <p className="text-gray-300 text-sm font-light max-w-sm mx-auto leading-relaxed">
                Thank you, {formData.name || 'Honored Guest'}. Our Paris atelier concierge will reach out within 2 hours to confirm your private salon reservation.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-6 px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono tracking-widest text-gray-300 hover:text-white uppercase cursor-pointer"
              >
                Schedule Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
                  VIP Booking Desk
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white uppercase">
                  Request an Appointment
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full bg-[#050D1A] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@haute.com"
                    className="w-full bg-[#050D1A] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                      Salon Atelier
                    </label>
                    <select
                      value={formData.atelierLocation}
                      onChange={(e) => setFormData({ ...formData, atelierLocation: e.target.value })}
                      className="w-full bg-[#050D1A] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option>Paris • Place Vendôme</option>
                      <option>Monaco • Port Hercule</option>
                      <option>Tokyo • Ginza Six</option>
                      <option>Virtual Nose Masterclass</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                      Desired Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-[#050D1A] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                    Consultation Type
                  </label>
                  <select
                    value={formData.appointmentType}
                    onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                    className="w-full bg-[#050D1A] border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option>Private VIP Scent Consultation</option>
                    <option>Bespoke 24K Gold Flacon Engraving</option>
                    <option>Bridal & Sovereign Estate Gifting</option>
                    <option>Refill & Glass Restoration Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-400 uppercase tracking-widest mb-1.5">
                    Special Requests or Olfactory Preferences
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Mention any sensitivities or preferred notes..."
                    className="w-full bg-[#050D1A] border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-[#050D1A] font-semibold text-xs tracking-[0.25em] uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Confirm VIP Concierge Reservation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
