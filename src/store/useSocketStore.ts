import { create } from 'zustand';

interface SocketStore {
    isConnected: boolean;
    setConnected: (connected: boolean) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
    isConnected: false,
    setConnected: (connected) => set({ isConnected: connected }),
}));
