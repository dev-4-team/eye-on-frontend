import { useEffect, useRef, useState } from 'react';

interface Props {
  protestId: string;
  cheerCount: number;
}

export const useCheerEffect = (data: Props) => {
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
