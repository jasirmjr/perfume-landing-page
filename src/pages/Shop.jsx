import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';

export const Shop = ({ onSelectProduct }) => {
  const { addToCart } = useCart();
  const [filter, setFilter] = useState('all');

  const filteredProducts = PRODUCTS.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'bestseller') return item.isBestSeller;
    if (filter === 'extrait') return item.id !== 'aura-discovery-set';
    if (filter === 'discovery') return item.id === 'aura-discovery-set';
    return true;
  });

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto bg-white text-[#141210]">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#B38738] block mb-3 font-semibold">
          Haute Parfumerie Flacons
        </span>
        <h1 className="font-serif font-extrabold text-5xl sm:text-6xl lg:text-7xl text-[#141210] uppercase tracking-tight">
          The <span className="italic font-bold bg-gradient-to-r from-[#B38738] via-[#C89B48] to-[#946820] bg-clip-text text-transparent">Collection</span>
        </h1>
        <p className="text-stone-600 font-light mt-4 text-base sm:text-lg leading-relaxed">
          Four extraordinary extraits distilled with rare marine botanicals, housed in hand-blown Murano glass.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-16">
        <div className="p-1.5 rounded-full bg-stone-100 flex gap-2 border border-stone-200 flex-wrap justify-center shadow-xs">
          {[
            { id: 'all', label: 'All Flacons' },
            { id: 'bestseller', label: 'Maison Icons' },
            { id: 'extrait', label: 'Pure Extraits' },
            { id: 'discovery', label: 'Discovery Coffrets' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-6 py-2 rounded-full text-xs tracking-[0.2em] uppercase transition-all cursor-pointer font-medium ${
                filter === tab.id
                  ? 'bg-white text-[#141210] shadow-md border border-[#B38738]/40 font-semibold'
                  : 'text-stone-600 hover:text-[#141210]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:border-[#B38738]/50 transition-all duration-500 group flex flex-col justify-between"
          >
            {/* Image Container with Badge */}
            <div className="relative aspect-[4/5] overflow-hidden bg-stone-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#B38738]/40 text-[9px] font-mono tracking-widest uppercase text-[#B38738] font-semibold shadow-xs">
                  {product.badge}
                </div>
              )}

              {/* Hover Quick View Overlay */}
              <div className="absolute inset-0 bg-[#141210]/35 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button
                  onClick={() => onSelectProduct(product.id)}
                  className="px-5 py-2.5 rounded-full bg-white text-[#141210] font-medium shadow-lg text-xs tracking-widest uppercase transition-all flex items-center gap-2 cursor-pointer hover:bg-[#FBF6ED]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>
            </div>

            {/* Product Meta */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#B38738] mb-2 font-mono font-medium">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount})</span>
                </div>
                <h3
                  onClick={() => onSelectProduct(product.id)}
                  className="font-serif font-bold text-xl sm:text-2xl text-[#141210] group-hover:text-[#B38738] transition-colors cursor-pointer leading-tight mb-1"
                >
                  {product.name}
                </h3>
                <p className="text-xs text-stone-500 font-light line-clamp-2">
                  {product.tagline}
                </p>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 block uppercase">
                    Starts at
                  </span>
                  <span className="text-lg font-mono font-bold text-[#141210]">
                    ${product.price}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product, product.sizes[0])}
                  className="p-3 rounded-full bg-[#FBF6ED] hover:bg-[#B38738] text-[#B38738] hover:text-white transition-all cursor-pointer border border-[#B38738]/30 shadow-xs"
                  title="Add Default Size to Coffret"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Complimentary Sample Policy Banner */}
      <div className="mt-20 p-8 rounded-2xl bg-[#FBF6ED]/60 border border-[#B38738]/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full border border-[#B38738]/40 bg-white flex items-center justify-center text-[#B38738] flex-shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif text-xl text-[#141210] font-medium">The Atelier Complimentary Sample Policy</h4>
            <p className="text-xs text-stone-600 font-light max-w-xl mt-1">
              Every 100ml flacon order includes a complimentary 2ml matching sample vial. Test the vial first—if it doesn’t suit your skin chemistry, return the unopened 100ml flacon for a full refund.
            </p>
          </div>
        </div>
        <button
          onClick={() => onSelectProduct('aura-discovery-set')}
          className="px-6 py-2.5 rounded-full border border-[#B38738] bg-white text-[#141210] text-xs tracking-[0.2em] uppercase hover:bg-[#B38738] hover:text-white transition-all whitespace-nowrap cursor-pointer shadow-xs font-medium"
        >
          Order Discovery Set
        </button>
      </div>
    </div>
  );
};
