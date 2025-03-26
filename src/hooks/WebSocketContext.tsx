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
        const socket = new SockJS(`${SERVER_URL}/api/ws`);
        const StompClient = StompJs.Stomp.over(socket);

        StompClient.connect(
            {},
            function (frame: StompJs.Frame) {
                console.log(`웹소켓 연결 성공 ${frame}`);
                client.current = StompClient;
                setConnect(true);
                StompClient.subscribe('/topic/cheer', (message) => {
                    if (message.body) {
                        console.log('브로커가 보내준 메세지');
                    } else {
                        console.log('빈 값입니다.');
                    }
                });
            },
            function (error: unknown) {
                console.log(`connect error ${error}`);
            }
        );
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
