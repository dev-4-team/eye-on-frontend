import { useSocketStore } from '@/store/useSocketStore';
import { useEffect, useRef, useState } from 'react';

export const useCheerEffect = (data: { protestId: number; cheerCount: number }) => {
    const [effect, setEffect] = useState(false);
    const cheerCounRef = useRef<number | null>(null);
    const { socketIsReady } = useSocketStore();
    useEffect(() => {
        if (socketIsReady) return;
        if (cheerCounRef.current === null) {
            cheerCounRef.current = data?.cheerCount;
            return;
        }
        if (cheerCounRef.current < data?.cheerCount) {
            setEffect(true);
            const timeout = setTimeout(() => {
                setEffect(false);
            }, 1500);
            return () => clearTimeout(timeout);
        }
        cheerCounRef.current = data?.cheerCount;
    }, [data?.cheerCount, data, socketIsReady]);
    return { effect };
};
