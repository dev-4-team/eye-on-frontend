'use client';

import { useEffect, useRef } from 'react';
import JSConfetti from 'js-confetti';

export const useConfetti = () => {
  const jsConfettiRef = useRef<JSConfetti | null>(null);

  const getConfetti = () => {
    if (!jsConfettiRef.current) {
      jsConfettiRef.current = new JSConfetti();
    }
    return jsConfettiRef.current;
  };

  useEffect(() => {
    return () => {
      jsConfettiRef.current?.destroyCanvas();
      jsConfettiRef.current = null;
    };
  }, []);

  return { getConfetti };
};
