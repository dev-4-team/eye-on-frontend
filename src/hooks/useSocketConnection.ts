import { useSocketStore } from '@/store/useSocketStore';
import { useEffect } from 'react';

export const useSocketConnection = () => {
    const { connect, disconnect, subscribe } = useSocketStore();

    useEffect(() => {
        const connectedSocket = async () => {
            await connect();
            subscribe('/topic/cheer', (message) => {
                const response = JSON.parse(message.body);
                console.log('서버에서 보낸 응원하기 데이터', response);
            });
            subscribe('/user/queue/errors', (message) => {
                try {
                    const response = JSON.parse(message.body);
                    console.log('에러 발생', JSON.stringify(response));
                } catch (e) {
                    console.log('메세지 파싱 오류', e);
                }
            });
        };

        connectedSocket();
        return () => {
            disconnect();
        };
    }, []);
};
