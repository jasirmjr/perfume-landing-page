import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to pre-cache image frames and sync canvas render with scroll progress.
 * Configured for the 240 extracted frames at /frames/ezgif-frame-[001-240].jpg
 */
export const useImageSequence = ({
  totalFrames = 240,
  framePrefix = '/frames/ezgif-frame-',
  extension = '.jpg',
  padLength = 3
} = {}) => {
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Generate frame image URL
  const getFrameUrl = useCallback((index) => {
    // 1-indexed frames (001 to 240)
    const frameNum = Math.min(Math.max(1, index + 1), totalFrames);
    const padded = String(frameNum).padStart(padLength, '0');
    return `${framePrefix}${padded}${extension}`;
  }, [totalFrames, framePrefix, extension, padLength]);

  useEffect(() => {
    let isCancelled = false;
    const images = new Array(totalFrames);
    let loaded = 0;

    // Priority batch: load first 20 frames immediately for instantaneous initial playback
    const PRIORITY_COUNT = Math.min(20, totalFrames);
    for (let i = 0; i < PRIORITY_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= 8) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
      };
      images[i] = img;
    }

    // Secondary stream: load remaining frames progressively in background idle chunks
    let idleTimer = null;
    const loadNextChunk = (startIndex, chunkSize) => {
      if (isCancelled || startIndex >= totalFrames) return;
      const endIndex = Math.min(startIndex + chunkSize, totalFrames);
      for (let i = startIndex; i < endIndex; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        img.onload = () => {
          if (isCancelled) return;
          loaded++;
          setLoadedCount(loaded);
        };
        img.onerror = () => {
          if (isCancelled) return;
          loaded++;
          setLoadedCount(loaded);
        };
        images[i] = img;
      }
      if (endIndex < totalFrames) {
        idleTimer = setTimeout(() => loadNextChunk(endIndex, chunkSize), 80);
      }
    };

    idleTimer = setTimeout(() => loadNextChunk(PRIORITY_COUNT, 25), 150);

    imagesRef.current = images;

    return () => {
      isCancelled = true;
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [totalFrames, getFrameUrl]);

  // Set frame based on a progress value (0 to 1)
  const setFrameByProgress = useCallback((progress) => {
    const clampedProgress = Math.min(Math.max(0, progress), 1);
    const frameIdx = Math.min(
      Math.floor(clampedProgress * totalFrames),
      totalFrames - 1
    );
    setCurrentFrameIndex(frameIdx);
    return frameIdx;
  }, [totalFrames]);

  return {
    images: imagesRef.current,
    totalFrames,
    loadedCount,
    progressPercent: Math.round((loadedCount / totalFrames) * 100),
    isReady,
    currentFrameIndex,
    setFrameByProgress,
    getFrameUrl
  };
};
