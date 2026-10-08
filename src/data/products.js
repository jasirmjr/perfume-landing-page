// Audio synthesizer for atmospheric ocean ambient sound and luxury UI chime
class SoundController {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.ambientNodes = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  toggleOceanAtmosphere() {
    this.init();
    if (this.isPlaying) {
      this.stopAtmosphere();
      return false;
    } else {
      this.startAtmosphere();
      return true;
    }
  }

  startAtmosphere() {
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      // Master gain
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.15, this.ctx.currentTime + 3);
      this.gainNode.connect(this.ctx.destination);

      // Low oceanic drone (gentle water depth frequency)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note deep resonance

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110, this.ctx.currentTime); // Harmonic warmth

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, this.ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(this.gainNode);

      osc1.start();
      osc2.start();

      this.ambientNodes = [osc1, osc2, filter];
      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  stopAtmosphere() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
        setTimeout(() => {
          this.ambientNodes.forEach(node => {
            try { node.stop(); } catch {}
          });
          this.ambientNodes = [];
          this.isPlaying = false;
        }, 1500);
      } catch {
        this.isPlaying = false;
      }
    } else {
      this.isPlaying = false;
    }
  }

  playChime() {
    try {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime); // A5 crystal bell
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.6);
    } catch {}
  }
}

export const soundManager = new SoundController();

// Perfume products database
export const PRODUCTS = [
  {
    id: 'aura-edp',
    name: 'AURA Eau de Parfum',
    tagline: 'The Signature Oceanic Symphony',
    price: 245,
    sizes: ['50ml', '100ml', '200ml Flacon'],
    pricePerSize: { '50ml': 185, '100ml': 245, '200ml Flacon': 380 },
    rating: 4.9,
    reviewsCount: 142,
    concentration: '28% Extrait Concentration',
    inspiration: 'Submerged sunlight refracting through mineral-rich abyssal sea flora.',
    description: 'An iconic balance between crystalline salt spray, radiant bergamot, and sunlit coastal driftwood. Hand-harvested marine kelp yields an unparalleled natural amber sheen that lingers effortlessly for twelve hours.',
    notes: {
      top: ['Sea Salt Crystals', 'Sunlit Calabrian Bergamot', 'Morning Ozone'],
      heart: ['Blue Lotus', 'Coastal Neroli Petals', 'Deep Sea Orchid'],
      base: ['Natural Grey Ambergris', 'Sun-bleached Driftwood', 'White Musk']
    },
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=80',
    colorAccent: '#D4AF37',
    badge: 'Flagship Masterpiece',
    isBestSeller: true
  },
  {
    id: 'aura-noir',
    name: 'AURA Noir',
    tagline: 'The Midnight Abyss Extrait',
    price: 295,
    sizes: ['50ml', '100ml'],
    pricePerSize: { '50ml': 225, '100ml': 295 },
    rating: 5.0,
    reviewsCount: 98,
    concentration: '34% Pure Parfum Oil',
    inspiration: 'The silence and gravitational weight of nautical midnight.',
    description: 'Smoky volcanic minerality meets black sea leather, midnight cedar, and rare black truffled amber. Designed for twilight galas, intimate soirees, and commanding magnetic presence.',
    notes: {
      top: ['Black Pepper', 'Icy Night Air', 'Smoked Sea Grass'],
      heart: ['Dark Marine Leather', 'Midnight Jasmine', 'Volcanic Rock Ash'],
      base: ['Black Amber', 'Indonesian Patchouli', 'Aged Guaiacwood']
    },
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    colorAccent: '#60A5FA',
    badge: 'Limited Edition 2026',
    isBestSeller: false
  },
  {
    id: 'aura-elixir',
    name: 'AURA Elixir Solar',
    tagline: 'Golden Radiance at Dawn',
    price: 265,
    sizes: ['50ml', '100ml'],
    pricePerSize: { '50ml': 195, '100ml': 265 },
    rating: 4.8,
    reviewsCount: 76,
    concentration: '30% Extrait de Parfum',
    inspiration: 'Dawn breaking over the Mediterranean cliffside.',
    description: 'Luminous neroli drenched in golden solar aldehydes, Sicilian mandarins, and crushed sea fennel. A warm, enveloping glow that kisses skin with luxurious warmth.',
    notes: {
      top: ['Golden Blood Orange', 'Mediterranean Neroli', 'Solar Saline'],
      heart: ['Ylang Ylang Nectar', 'Tiare Flower', 'Wild Sea Thyme'],
      base: ['Bourbon Vanilla Pod', 'Golden Benzoin Resin', 'Warm Cashmeran']
    },
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    colorAccent: '#F59E0B',
    badge: 'Solar Edition',
    isBestSeller: false
  },
  {
    id: 'aura-discovery-set',
    name: 'The Oceanic Discovery Coffret',
    tagline: 'Four Curated Extrait Vials in Handcrafted Glass',
    price: 95,
    sizes: ['4 x 10ml Coffret'],
    pricePerSize: { '4 x 10ml Coffret': 95 },
    rating: 4.9,
    reviewsCount: 310,
    concentration: 'Travel Spray Extrait Collection',
    inspiration: 'A full voyage through the depths of oceanic luxury.',
    description: 'Experience all dimensions of AURA. Includes four 10ml atomizers: AURA Eau de Parfum, AURA Noir, AURA Elixir Solar, and the preview laboratory blend AURA Abyssal Drift. Includes a $95 voucher towards any 100ml flacon.',
    notes: {
      top: ['Curated Oceanic Flight'],
      heart: ['4 x 10ml Travel Atomizers'],
      base: ['Includes $95 Full Flacon Credit']
    },
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1000&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    colorAccent: '#34D399',
    badge: 'Full Credit Refundable',
    isBestSeller: true
  }
];

// Press & Editorial reviews
export const PRESS_ITEMS = [
  {
    publication: 'VOGUE Haute Parfumerie',
    date: 'Autumn Issue 2026',
    quote: '“AURA does not simply replicate the ocean; it captures the transcendental romance of disappearing into sapphire waves bathed in molten gold.”',
    author: 'Camille Laurent, Fragrance Director',
    badge: 'Scent of the Year'
  },
  {
    publication: 'GQ Style Quarterly',
    date: 'Spring Special',
    quote: '“The bottle is an architectural marvel of Murano craftsmanship, and the silage commands room-filling reverence without ever shouting.”',
    author: 'Julian Thorne, Grooming Editor',
    badge: 'Grooming Award Winner'
  },
  {
    publication: 'Harper’s BAZAAR',
    date: 'Exclusive Feature',
    quote: '“With sustainable oceanic extraction and ambergris certified cruelty-free, AURA sets an uncompromising benchmark for 21st-century luxury.”',
    author: 'Elena Rostova',
    badge: 'Best Conscious Luxury'
  },
  {
    publication: 'ELLE International',
    date: 'Global Review',
    quote: '“A sensory journey akin to plunging into crystalline Aegean waters as the sun rises. Simply hypnotic.”',
    author: 'Chantal Moreau',
    badge: 'Editor’s Choice'
  }
];
