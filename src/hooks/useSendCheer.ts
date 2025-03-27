import * as StompJs from '@stomp/stompjs';
export const useSendCheer = ({ client, protestId }: { client: StompJs.Client | null; protestId: string | null }) => {
    const sendCheer = () => {
        if (!client || !protestId) return;
        const destiantion = `/app/cheer/protest/${protestId}`;
        try {
            client.publish({
                destination: destiantion,
            });
        } catch (error) {
            console.error('전송 실패:', error);
        }
    };
    return { sendCheer };
};
