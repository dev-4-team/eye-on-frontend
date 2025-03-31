import { create } from 'zustand';
import { StompSocket } from '@/lib/socket';
import { ISocket } from '@/lib/ISoket';

interface SocketStore {
    socketIsReady: boolean;
    socket: ISocket;
    connect: () => void;
    disconnect: () => void;
    join: (topic: string, callback: (message: unknown) => void) => void;
    sendMessage: (topic: string, message?: string | undefined) => void;
}

export const useSocketStore = create<SocketStore>()((set, get) => ({
    socketIsReady: false,
    socket: StompSocket.getInstance(),
    connect: async () => {
        try {
            await get().socket.connect();
            set({ socketIsReady: true });
        } catch (e) {
            set({ socketIsReady: false });
            console.log('에상치 못한 소켓 연결 에러', e);
            throw e;
        }
    },
    disconnect: () => {
        get().socket.disconnect();
        set({ socketIsReady: false });
    },
    join: (topic, callback) => {
        get().socket.join(topic, callback);
    },
    sendMessage: (topic: string, message: string | undefined) => {
        get().socket.sendMessage(topic, message);
    },
}));
