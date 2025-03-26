'use client';

import * as StompJs from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';

export const useWebSocket = () => {
    const [StompClient, setStompClient] = useState<StompJs.Client | null>(null);
    const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;

    useEffect(() => {
        const socket = new SockJS(`${SERVER_URL}/api/ws`);
        const client = StompJs.Stomp.over(socket);

        const connevClient = () => {
            client.connect(
                {},
                function (frame: StompJs.Frame) {
                    console.log(`웹소켓 연결 성공 ${frame}`);
                    setStompClient(client);
                    client.subscribe('/topic/cheer', (message) => {
                        console.log('total cheer', message.body);
                        if (message.body) {
                            console.log('브로커가 보내준 메세지');
                        } else {
                            console.log('빈 값입니다.');
                        }
                    });
                },
                function (error: unknown) {
                    console.log(`connect error ${error}`);
                    setTimeout(connevClient, 3000);
                }
            );
        };
        if (!StompClient?.connected) {
            connevClient();
        }
        return () => {
            if (client) {
                client.disconnect();
            }
        };
    }, []);

    return { client: StompClient };
};
