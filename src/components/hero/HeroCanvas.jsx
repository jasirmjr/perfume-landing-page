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
        // Transparent while first canvas frame compiles so the eager underlying frame_001.jpg displays directly
        ctx.clearRect(0, 0, width, height);
      }

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
  }, [images, currentFrameIndex]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-white">
      {/* Direct Eager Landing Image - displays immediately on load with zero delay */}
      <img
        src="/Perfume_bottle_drops/frame_001.jpg"
        alt="AURA Haute Parfumerie Flacon"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        loading="eager"
        fetchPriority="high"
      />

      {/* Scrubbing Canvas Engine on top */}
      <canvas
        ref={canvasRef}
        className="relative w-full h-full object-cover block"
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
};
