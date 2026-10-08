import React from 'react';
import { Volume2, VolumeX, ChevronDown, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

/**
 * HeroOverlayCTA displays:
 * - Floating Sound Atmosphere toggle (Web Audio oceanic drone)
 * - Animated scroll indicator bar
 * - Floating Quick Buy CTA
 */
export const HeroOverlayCTA = ({ scrollProgress, onQuickBuy, onScrollDown }) => {
  const { isSoundActive, toggleSound, setIsCartOpen } = useCart();

  return (
    <>
     

    
    </>
  );
};
