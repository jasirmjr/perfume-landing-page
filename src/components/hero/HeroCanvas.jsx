import React, { useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

/**
 * HeroCanvas renders the image frame sequence to an HTML5 canvas.
 * Adapts fallback and vignette according to light / dark luxury themes.
 */
export const HeroCanvas = ({
  images,
  currentFrameIndex,
  isReady,
  progressPercent
}) => {
  const canvasRef = useRef(null);
  const { theme } = useCart();
  const isLight = theme === 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Check current frame image
      const img = images[currentFrameIndex];

      if (img && img.complete && img.naturalWidth > 0) {
        // Draw image cover
        const hRatio = width / img.naturalWidth;
        const vRatio = height / img.naturalHeight;
        const ratio = Math.max(hRatio, vRatio);

        const centerShiftX = (width - img.naturalWidth * ratio) / 2;
        const centerShiftY = (height - img.naturalHeight * ratio) / 2;

        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(
          img,
          0,
          0,
          img.naturalWidth,
          img.naturalHeight,
          centerShiftX,
          centerShiftY,
          img.naturalWidth * ratio,
          img.naturalHeight * ratio
        );

        if (isLight) {
          // Soft luxury pearl white atmospheric tint over image frames for clean white aesthetic
          ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
          ctx.fillRect(0, 0, width, height);
        }
      } else {
        // Fallback gradient while frames load
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        if (isLight) {
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.5, '#F1F5F9');
          grad.addColorStop(1, '#E2E8F0');
        } else {
          grad.addColorStop(0, '#050D1A');
          grad.addColorStop(0.5, '#0A192F');
          grad.addColorStop(1, '#020710');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Subtle shimmering circular halo
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(212, 175, 55, 0.08)';
        ctx.fill();
      }

      // Add delicate cinematic vignette adapted to theme
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.35,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      if (isLight) {
        vignette.addColorStop(0, 'rgba(255, 255, 255, 0)');
        vignette.addColorStop(1, 'rgba(255, 255, 255, 0.4)');
      } else {
        vignette.addColorStop(0, 'rgba(5, 13, 26, 0)');
        vignette.addColorStop(1, 'rgba(5, 13, 26, 0.6)');
      }
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();
    };

    render();

    const handleResize = () => {
      render();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [images, currentFrameIndex, isLight]);

  return (
    <div
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden ${
        isLight ? 'bg-white' : 'bg-[#050D1A]'
      }`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover block"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* Loading Skeleton Indicator */}
      {!isReady && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md z-10 ${
            isLight ? 'bg-white/90' : 'bg-[#050D1A]/90'
          }`}
        >
          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/40 border-t-[#D4AF37] animate-spin mb-6" />
          <p className="text-[#D4AF37] font-serif tracking-[0.25em] text-lg uppercase font-medium">
            Synthesizing Oceanic Essence
          </p>
          <div
            className={`w-48 h-1 rounded-full mt-4 overflow-hidden ${
              isLight ? 'bg-slate-200' : 'bg-white/10'
            }`}
          >
            <div
              className="h-full bg-[#D4AF37] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span
            className={`text-xs tracking-widest mt-2 ${
              isLight ? 'text-slate-500' : 'text-white/50'
            }`}
          >
            {progressPercent}% DEEP SEA FRAMES LOADED
          </span>
        </div>
      )}
    </div>
  );
};
