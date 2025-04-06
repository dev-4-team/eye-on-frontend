import SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { ISocket } from '@/lib/ISoket';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;

export class StompSocket implements ISocket {
    private static instance: StompSocket;
    private client: StompJs.Client | null = null;
    private subscriptions: Map<string, StompJs.StompSubscription> = new Map();

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
                webSocketFactory: () => SockJS(`${SERVER_URL}/api/ws`),
                reconnectDelay: 0,
                onWebSocketClose: () => reject(false),
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

    public disconnect() {
        if (!this.isConnected()) return;
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
        this.subscriptions.clear();
        this.client?.deactivate();
    }

    public join(topic: string, callback: (message: StompJs.IFrame) => void) {
        if (!this.isConnected()) return;
        if (!this.subscriptions.has(topic)) {
            const subscribe = this.client?.subscribe(topic, callback);
            if (subscribe) this.subscriptions.set(topic, subscribe);
        }
    }

    public leave(topic: string) {
        if (!this.isConnected()) return;
        if (this.subscriptions.has(topic)) {
            this.subscriptions.get(topic)?.unsubscribe();
            this.subscriptions.delete(topic);
        }
    }

    public sendMessage(topic: string, message?: string) {
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
