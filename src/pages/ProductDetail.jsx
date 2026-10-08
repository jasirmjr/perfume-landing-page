import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { Star, ShieldCheck, Truck, RefreshCw, ArrowLeft, Check, Sparkles } from 'lucide-react';

export const ProductDetail = ({ productId, onBack, onSelectOtherProduct }) => {
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const { addToCart } = useCart();

  const currentPrice = product.pricePerSize ? product.pricePerSize[selectedSize] || product.price : product.price;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Return Navigation */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-[#B38738] transition-colors mb-10 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Collection</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Product Visual Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#0D0B09]/90 backdrop-blur-md border border-[#B38738]/50 text-xs font-mono tracking-widest uppercase text-[#B38738]">
                {product.badge}
              </div>
            )}
          </div>

          {/* Environmental photo banner */}
          <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10">
            <img
              src={product.bannerImage}
              alt={product.inspiration}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#0D0B09]/60 backdrop-blur-xs flex items-center justify-center p-6 text-center">
              <p className="font-serif text-lg text-white italic max-w-md">
                “{product.inspiration}”
              </p>
            </div>
          </div>
        </div>

        {/* Product Details & Purchase Controls */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#B38738] font-mono mb-3">
              <Star className="w-4 h-4 fill-current" />
              <span>{product.rating}</span>
              <span className="text-gray-500">•</span>
              <span>{product.reviewsCount} verified reviews</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">{product.concentration}</span>
            </div>

            <h1 className="font-serif font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white uppercase leading-[0.95] mb-3">
              {product.name}
            </h1>
            <p className="text-sm font-mono tracking-widest text-[#B38738] uppercase">
              {product.tagline}
            </p>
          </div>

          <div className="text-3xl font-mono text-[#E2B768]">
            ${currentPrice} <span className="text-xs text-gray-400 font-sans font-light">USD (Tax Included)</span>
          </div>

          <p className="text-gray-300 font-light leading-relaxed text-sm sm:text-base">
            {product.description}
          </p>

          {/* Size Selection */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <span className="text-xs font-mono tracking-widest uppercase text-gray-400 block">
              Select Flacon Silhouette
            </span>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 rounded-xl text-xs font-mono tracking-wider uppercase transition-all cursor-pointer border ${
                    selectedSize === size
                      ? 'border-[#B38738] bg-[#B38738]/20 text-[#E2B768] shadow-[0_0_15px_rgba(179,135,56,0.3)]'
                      : 'border-white/10 bg-black/30 text-gray-400 hover:text-white'
                  }`}
                >
                  {size} • ${product.pricePerSize ? product.pricePerSize[size] || product.price : product.price}
                </button>
              ))}
            </div>
          </div>

          {/* Olfactory Notes Mini Breakdown */}
          <div className="p-6 rounded-2xl glass-panel-subtle border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#B38738] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Olfactory Imprint</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-gray-400 block font-mono text-[10px] uppercase">Top</span>
                <span className="text-white font-serif">{product.notes.top.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-mono text-[10px] uppercase">Heart</span>
                <span className="text-white font-serif">{product.notes.heart.join(', ')}</span>
              </div>
              <div>
                <span className="text-gray-400 block font-mono text-[10px] uppercase">Base</span>
                <span className="text-white font-serif">{product.notes.base.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-4 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-full bg-[#B38738] hover:bg-[#946820] text-white font-semibold text-xs tracking-[0.25em] uppercase hover:shadow-[0_0_25px_rgba(179,135,56,0.45)] transition-all cursor-pointer flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Reserved In Your Coffret</span>
                </>
              ) : (
                <span>Acquire Flacon — ${currentPrice}</span>
              )}
            </button>

            <div className="grid grid-cols-3 gap-4 text-center text-[10px] text-gray-400 font-mono pt-4 border-t border-white/5">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#B38738]" />
                <span>Insured Global Courier</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#B38738]" />
                <span>Numbered Grasse Batch</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="w-4 h-4 text-[#B38738]" />
                <span>30-Day Sample Guarantee</span>
              </div>
            </div>
          </div>

          {/* Other Flacons */}
          <div className="pt-8 border-t border-white/10">
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400 block mb-4">
              Explore Alternative Chapters
            </span>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {PRODUCTS.filter(p => p.id !== product.id).map(p => (
                <button
                  key={p.id}
                  onClick={() => onSelectOtherProduct(p.id)}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-white/10 hover:border-[#B38738]/50 bg-black/30 text-left transition-colors cursor-pointer flex-shrink-0"
                >
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <span className="text-xs font-serif text-white block">{p.name}</span>
                    <span className="text-[10px] font-mono text-[#B38738]">${p.price}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
