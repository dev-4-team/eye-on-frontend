'use client';

import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { StompSocket } from '@/lib/socket';

export const ProtestCheeringButton = () => {
    const socket = StompSocket.getInstance();
    const params = useParams();
    const protestId = params.id;
    const destiantion = `/app/cheer/protest/${protestId}`;

    if (!socket.isConnected() || !protestId) return;

    const sendCheer = () => {
        socket.send(destiantion);
    };

    return <Button onClick={sendCheer}>응원하기</Button>;
};
