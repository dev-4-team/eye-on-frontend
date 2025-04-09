import { useEffect, useRef, useState } from 'react';

export const useCheerEffect = (data: { protestId: string; cheerCount: number }) => {
  const [effect, setEffect] = useState(false);
  const cheerCounRef = useRef<number | null>(null);
  useEffect(() => {
    if (cheerCounRef.current === null) {
      cheerCounRef.current = data?.cheerCount;
      return;
    }
    if (cheerCounRef.current < data?.cheerCount) {
      setEffect(true);
      const timeout = setTimeout(() => {
        setEffect(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
    cheerCounRef.current = data?.cheerCount;
  }, [data?.cheerCount, data]);
  return { effect };
};
