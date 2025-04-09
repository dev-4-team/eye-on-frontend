'use client';

import JSConfetti from 'js-confetti';
import { useEffect, useRef } from 'react';

const useConfetti = () => {
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

export default useConfetti;
