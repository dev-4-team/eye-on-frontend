'use client';
import { useSocketConnection } from '@/hooks/useSocketConnection';
import { ReactNode } from 'react';

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    useSocketConnection();
    return <>{children}</>;
};
