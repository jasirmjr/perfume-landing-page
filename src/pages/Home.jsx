import React, { useEffect, useRef, useState } from 'react';
import { HeroCanvas } from '../components/hero/HeroCanvas';
import { HeroScrollText } from '../components/hero/HeroScrollText';
import { HeroOverlayCTA } from '../components/hero/HeroOverlayCTA';
import { ChoreographedPillarsAndShowcase } from '../components/showcase/ChoreographedPillarsAndShowcase';
import { useImageSequence } from '../hooks/useImageSequence';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const Home = ({ onNavigate, onSelectProduct }) => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { addToCart } = useCart();

  // Load the full 192 high-clarity frames from Perfume_bottle_drops
  const {
    images,
    isReady,
    progressPercent,
    currentFrameIndex,
    setFrameByProgress
  } = useImageSequence({
    totalFrames: 192,
    framePrefix: '/Perfume_bottle_drops/frame_',
    extension: '.jpg',
    padLength: 3
  });

  useEffect(() => {
    let prevVal = -1;
    const handleScroll = () => {
      if (!containerRef.current) return;
      const totalHeight = containerRef.current.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = window.scrollY / totalHeight;
      const clamped = Math.min(Math.max(0, progress), 1);
      if (Math.abs(prevVal - clamped) > 0.001) {
        prevVal = clamped;
        setScrollProgress(clamped);
        setFrameByProgress(clamped);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setFrameByProgress]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 1.5,
      behavior: 'smooth'
    });
  };

  const handleQuickBuy = () => {
    const flagship = PRODUCTS[0];
    addToCart(flagship, '100ml');
  };

  return (
    <div className="relative bg-white text-slate-800">
      {/* 500vh container for scrubbing the 240-frame sequence */}
      <div ref={containerRef} className="relative min-h-[500vh]">
        {/* Sticky Canvas Engine */}
        <HeroCanvas
          images={images}
          currentFrameIndex={currentFrameIndex}
          isReady={isReady}
          progressPercent={progressPercent}
        />

        {/* Narrative editorial overlay texts mapped to chapters (fading cleanly) */}
        <HeroScrollText scrollProgress={scrollProgress} />

        {/* Floating actions, audio toggle, and depth scrubber */}
        <HeroOverlayCTA
          scrollProgress={scrollProgress}
          onQuickBuy={handleQuickBuy}
          onScrollDown={handleScrollDown}
        />
      </div>

      {/* CONTINUOUS SCROLL-PINNED CHOREOGRAPHY & HERO DOCKING */}
      <ChoreographedPillarsAndShowcase onSelectProduct={onSelectProduct} />

    </div>
  );
};
