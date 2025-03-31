import { useSocketStore } from '@/store/useSocketStore';
import { useEffect } from 'react';

export const useSocketConnection = () => {
    const { connect, disconnect, join } = useSocketStore();

    useEffect(() => {
        const connectedSocket = async () => {
            try {
                await connect();
                join('/topic/cheer', (message: any) => {
                    const response = JSON.parse(message.body);
                    console.log('서버에서 보낸 응원하기 데이터', response);
                });
                join('/user/queue/errors', (message: any) => {
                    try {
                        const response = JSON.parse(message.body);
                        console.log('에러 발생', JSON.stringify(response));
                    } catch (e) {
                        console.log('메세지 파싱 오류', e);
                    }
                });
            } catch (e) {
                /* 
                소켓 연결이 실패했을때 어떻게 해야할지 고민중
                    1. 소켓이 연결되지 않으면 아에 에러처리
                    2. 응원하기 기능만 사용 못하게 ex) : 응원하기 버튼만 못쓰게 또는 안보이게처리
             */
                console.log('소켓 연결 실패', e);
            }
        };

        connectedSocket();
        return () => disconnect();
    }, []);
};
