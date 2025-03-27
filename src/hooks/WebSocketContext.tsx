'use client';

import * as StompJs from '@stomp/stompjs';
import { createContext, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

export const WebSocketContext = createContext<{ client: StompJs.Client | null; connect: boolean }>({
    client: null,
    connect: false,
});

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    const client = useRef<StompJs.Client | null>(null);
    const [connect, setConnect] = useState(false);
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
    useEffect(() => {
        const StompClient = new StompJs.Client({
            webSocketFactory: () => {
                return new SockJS(`${SERVER_URL}/api/ws`!);
            },
            onConnect: () => {
                console.log('소켓 연결 성공');
                setConnect(true);
                client.current = StompClient;
                try {
                    const cheerSubScription = StompClient.subscribe('/topic/cheer', (message) => {
                        const response = JSON.parse(message.body);
                        console.log('서버에서 보낸 응원하기 데이터:', response);
                    });
                    console.log('응원하기 토픽 구독 성공, ID:', cheerSubScription);
                } catch (error) {
                    console.error('시위 응원하기 구독 실패:', error);
                }
                try {
                    const logSubScription = StompClient.subscribe('/user/queue/errors', (message) => {
                        console.log('서버에서 보낸 에러 로그', message);
                    });
                    console.log('에러 토픽 구독 성공', logSubScription);
                } catch (e) {
                    console.log(`에러 토픽 구독 실패 ${e}`);
                }
            },
            onStompError: (error) => {
                console.log(`소켓 연결 실패 ${error}`);
            },
        });
        StompClient.activate();
        return () => {
            if (client.current) {
                client.current.deactivate();
                setConnect(false);
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ client: client.current, connect }}>{children}</WebSocketContext.Provider>
    );
};
