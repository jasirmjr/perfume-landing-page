import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to pre-cache image frames and sync canvas render with scroll progress.
 * Configured for the complete 192 high-clarity frames at /Perfume_bottle_drops/frame_[001-192].jpg
 */
export const useImageSequence = ({
  totalFrames = 192,
  framePrefix = '/Perfume_bottle_drops/frame_',
  extension = '.jpg',
  padLength = 3
} = {}) => {
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Generate frame image URL
  const getFrameUrl = useCallback((index) => {
    // 1-indexed frames (001 to 192)
    const frameNum = Math.min(Math.max(1, index + 1), totalFrames);
    const padded = String(frameNum).padStart(padLength, '0');
    return `${framePrefix}${padded}${extension}`;
  }, [totalFrames, framePrefix, extension, padLength]);

  useEffect(() => {
    let isCancelled = false;
    const images = new Array(totalFrames);
    let loaded = 0;

    // Priority batch: load first 20 frames immediately for instant playback
    const PRIORITY_COUNT = Math.min(20, totalFrames);
    for (let i = 0; i < PRIORITY_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded >= 4) {
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
        idleTimer = setTimeout(() => loadNextChunk(endIndex, chunkSize), 35);
      }
    };

    idleTimer = setTimeout(() => loadNextChunk(PRIORITY_COUNT, 20), 50);

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
