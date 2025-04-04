import { create } from 'zustand';
interface CheerInfo {
    protestId: string;
    cheerCount: number;
}

interface ProtestCheerStore {
    cheerList: CheerInfo[];
    realtimeCheerIds: Set<string>;
    setCheerList: (cheerList: CheerInfo[]) => void;
    addRealtimeCheer: (protestId: string) => void;
    clearRealtimeCheer: (protestId: string) => void;
}

export const useProtestCheerStore = create<ProtestCheerStore>((set) => ({
    cheerList: [],
    realtimeCheerIds: new Set(),
    setCheerList: (cheerList) => set({ cheerList }),
    addRealtimeCheer: (protestId: string) =>
        set((state) => {
            const newSet = new Set(state.realtimeCheerIds);
            newSet.add(protestId);
            return { realtimeCheerIds: newSet };
        }),
    clearRealtimeCheer: (protestId: string) =>
        set((state) => {
            const newSet = new Set(state.realtimeCheerIds);
            newSet.delete(protestId);
            return { realtimeCheerIds: newSet };
        }),
}));
