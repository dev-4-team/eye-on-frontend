// import SockJS from 'sockjs-client';
// import * as StompJs from '@stomp/stompjs';

// const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;

// export class SocketManager {
//     private static instance: SocketManager;
//     private stompClient: StompJs.Client | null = null;
//     constructor() {}

//     async initialLizeSocket() {
//         return new Promise((resolve, reject) => {
//             if (!SERVER_URL) return;
//             this.stompClient = new StompJs.Client({
//                 webSocketFactory: () => {
//                     new SockJS(SERVER_URL);
//                 },
//             });
//             this.stompClient.activate();

//             this.stompClient.onConnect = (frame) => {
//                 console.log('소켓 연결 성공');
//                 resolve(frame);
//             };
//             this.stompClient.onStompError = (frame) => {
//                 console.log('소켓 연결 실패');
//                 reject('실패');
//             };
//         });
//     }

//     static getInstance() {
//         if (!SocketManager.instance) {
//             SocketManager.instance = new SocketManager();
//         }
//         return SocketManager.instance;
//     }
// }
