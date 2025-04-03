'use client';
import { useSocketConnection } from '@/hooks/useSocketConnection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ReactNode } from 'react';

export default function TanStackProvider({ children }: { children: ReactNode }) {
    const queryClient = new QueryClient();
    useSocketConnection();

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
