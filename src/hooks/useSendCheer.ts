import * as StompJs from '@stomp/stompjs';
export const useSendCheer = ({ client, protestId }: { client: StompJs.Client | null; protestId: string | null }) => {
    const sendCheer = () => {
        if (!client || !protestId) return;
        const destiantion = `/app/cheer/protest/${protestId}`;
        client.publish({
            destination: destiantion,
            body: JSON.stringify({ protestId }),
        });
    };
    return { sendCheer };
};
