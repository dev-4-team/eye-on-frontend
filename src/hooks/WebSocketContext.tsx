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
                StompClient.subscribe('/topic/cheer', (message) => {
                    console.log(`received : ${message}`);
                });
                client.current = StompClient;
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
