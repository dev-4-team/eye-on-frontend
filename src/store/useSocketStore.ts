import { create } from 'zustand';
import { StompSocket } from '@/lib/socket';
import { IFrame } from '@stomp/stompjs';

interface SocketStore {
    isStompSocketIsReady: boolean;
    connect: () => void;
    disconnect: () => void;
    subscribe: (topic: string, callback: (message: IFrame) => void) => void;
    publish: (topic: string, message?: string | undefined) => void;
}

export const useSocketStore = create<SocketStore>()((set, get) => ({
    isStompSocketIsReady: false,
    connect: async () => {
        try {
            await StompSocket.getInstance().connect();
            set({ isStompSocketIsReady: true });
        } catch (e) {
            set({ isStompSocketIsReady: false });
            console.log('에상치 못한 소켓 연결 에러', e);
        }
    },
    disconnect: () => {
        StompSocket.getInstance().deactivate();
        set({ isStompSocketIsReady: false });
    },
    subscribe: (topic, callback) => {
        StompSocket.getInstance().subscribe(topic, callback);
    },
    publish: (topic: string, message: string | undefined) => {
        StompSocket.getInstance().publish(topic, message);
    },
}));
