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
  const lastDrawnImgRef = useRef(null);
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

      // Current target frame or fallback to last successfully drawn frame for continuous fluid rendering
      let imgToDraw = images[currentFrameIndex];
      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        lastDrawnImgRef.current = imgToDraw;
      } else if (lastDrawnImgRef.current) {
        imgToDraw = lastDrawnImgRef.current;
      }

      if (imgToDraw && imgToDraw.complete && imgToDraw.naturalWidth > 0) {
        // Draw image cover with maximum sharpness and correct aspect ratio
        const hRatio = width / imgToDraw.naturalWidth;
        const vRatio = height / imgToDraw.naturalHeight;
        const ratio = Math.max(hRatio, vRatio);

        const centerShiftX = (width - imgToDraw.naturalWidth * ratio) / 2;
        const centerShiftY = (height - imgToDraw.naturalHeight * ratio) / 2;

        ctx.clearRect(0, 0, width, height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(
          imgToDraw,
          0,
          0,
          imgToDraw.naturalWidth,
          imgToDraw.naturalHeight,
          centerShiftX,
          centerShiftY,
          imgToDraw.naturalWidth * ratio,
          imgToDraw.naturalHeight * ratio
        );
      } else {
        // Fallback gradient while initial frames stream in
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        if (isLight) {
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.5, '#FBF6ED');
          grad.addColorStop(1, '#F3EAD8');
        } else {
          grad.addColorStop(0, '#0D0B09');
          grad.addColorStop(0.5, '#141210');
          grad.addColorStop(1, '#050D1A');
        }
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        // Subtle shimmering circular halo
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(179, 135, 56, 0.08)';
        ctx.fill();
      }

      // Add delicate cinematic vignette adapted to theme for luxury editorial feel
      const vignette = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.45,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.85
      );
      if (isLight) {
        vignette.addColorStop(0, 'rgba(255, 255, 255, 0)');
        vignette.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
      } else {
        vignette.addColorStop(0, 'rgba(13, 11, 9, 0)');
        vignette.addColorStop(1, 'rgba(13, 11, 9, 0.65)');
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
        isLight ? 'bg-white' : 'bg-[#0D0B09]'
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
            isLight ? 'bg-white/90' : 'bg-[#0D0B09]/90'
          }`}
        >
          <div className="w-16 h-16 rounded-full border border-[#B38738]/40 border-t-[#B38738] animate-spin mb-6" />
          <p className="text-[#B38738] font-serif tracking-[0.25em] text-lg uppercase font-medium">
            Synthesizing Oceanic Essence
          </p>
          <div
            className={`w-48 h-1 rounded-full mt-4 overflow-hidden ${
              isLight ? 'bg-stone-200' : 'bg-white/10'
            }`}
          >
            <div
              className="h-full bg-[#B38738] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span
            className={`text-xs tracking-widest mt-2 ${
              isLight ? 'text-stone-500' : 'text-white/50'
            }`}
          >
            {progressPercent}% ESSENCE FRAMES LOADED
          </span>
        </div>
      )}
    </div>
  );
};
