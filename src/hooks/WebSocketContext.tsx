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
                    const subscription = StompClient.subscribe('/topic/cheer', (message) => {
                        console.log('메시지 수신:', message.body);
                    });
                    console.log('구독 성공, ID:', subscription);
                } catch (error) {
                    console.error('구독 실패:', error);
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
