import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;

export class StompSocket {
    private static instance: StompSocket;
    private socket: StompJs.Client;

    private constructor() {
        const socket = new StompJs.Client({
            webSocketFactory: () => {
                return new SockJS(`${SERVER_URL}/api/ws`);
            },
        });
        this.socket = socket;
    }

    public static getInstance() {
        if (!StompSocket.instance) {
            StompSocket.instance = new StompSocket();
        }
        return StompSocket.instance;
    }

    public connect() {
        return new Promise((resolve, reject) => {
            this.socket.onConnect = () => {
                console.log('socket 연결 성공');
                resolve(true);
            };
            this.socket.onStompError = () => {
                console.log('socket 연결 실패');
                reject(false);
            };
            this.socket.activate();
        });
    }
    public disconnect() {
        this.socket.deactivate();
    }

    public isConnected() {
        return this.socket.connected;
    }

    public subscribe(topic: string, callback: (message: StompJs.IFrame) => void) {
        this.socket.subscribe(topic, callback);
    }

    public send(topic: string, message?: string) {
        this.socket.publish({ destination: topic, body: message });
    }
}
