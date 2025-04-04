import { useSocketStore } from '@/store/useSocketStore';
import { useCallback, useEffect, useRef } from 'react';
import { useProtestCheerStore } from '@/store/useProtestCheerStore';
import { ProtestsCheerCount } from '@/lib/API/ProtestCheerCount';

export const useSocketConnection = () => {
    const { connect, disconnect, join } = useSocketStore();
    const { addRealtimeCheer, clearRealtimeCheer } = useProtestCheerStore();
    const { setCheerList } = useProtestCheerStore();
    const cheerListRef = useRef<any[]>([]);

    const updateCheer = (message: any) => {
        try {
            const response = JSON.parse(message.body);
            console.log('실시간 응원 이벤트:', response);

            addRealtimeCheer(response.protestId);
            const updatedList = cheerListRef.current.map((cheer) =>
                cheer.protestId === response.protestId ? { ...cheer, cheerCount: response.cheerCount } : cheer
            );
            cheerListRef.current = updatedList;
            setCheerList(updatedList);
            // 1초 후 실시간 응원 표시 제거
            setTimeout(() => {
                clearRealtimeCheer(response.protestId);
            }, 1500);
        } catch (e) {
            console.error('응원 메시지 파싱 오류:', e);
        }
    };

    const updateError = useCallback((message: any) => {
        try {
            const response = JSON.parse(message.body);
            console.log('에러 발생', JSON.stringify(response));
        } catch (e) {
            console.log('메세지 파싱 오류', e);
        }
    }, []);

    useEffect(() => {
        const connectedSocket = async () => {
            try {
                await connect();
                const response = await ProtestsCheerCount();
                cheerListRef.current = response.data;
                setCheerList(response.data);
                join('/topic/cheer', updateCheer);
                join('/user/queue/errors', updateError);
            } catch (e) {
                console.log('소켓 연결 실패', e);
            }
        };

        connectedSocket();
        return () => disconnect();
    }, []);
};
