import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;

export class StompSocket {
    private static instance: StompSocket;
    private client: StompJs.Client | null = null;

    private constructor() {}

    public static getInstance() {
        if (!StompSocket.instance) {
            StompSocket.instance = new StompSocket();
        }
        return StompSocket.instance;
    }

    public connect() {
        return new Promise<boolean>((resolve, reject) => {
            this.client = new StompJs.Client({
                webSocketFactory: () => {
                    return new SockJS(`${SERVER_URL}/api/ws`);
                },
            });
            this.client.onConnect = () => {
                console.log('socket 연결 성공');
                resolve(true);
            };
            this.client.onStompError = (error) => {
                console.log('socket 연결 실패', error);
                reject(error);
            };
            this.client.activate();
        });
    }

    public deactivate() {
        if (!this.isConnected()) return;

        this.client?.deactivate();
    }

    public subscribe(topic: string, callback: (message: StompJs.IFrame) => void) {
        if (!this.isConnected()) return;

        this.client?.subscribe(topic, callback);
    }

    public publish(topic: string, message?: string) {
        if (!this.isConnected()) return;
        this.client?.publish({
            destination: topic,
            body: message ? message : undefined,
        });
    }

    private isConnected() {
        return this.client?.connected ?? false;
    }
}

export const stompSocket = StompSocket.getInstance();
