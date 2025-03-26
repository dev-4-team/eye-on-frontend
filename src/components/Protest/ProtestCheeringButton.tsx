'use client';

import { Button } from '@/components/ui/button';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useParams } from 'next/navigation';
import { useSendCheer } from '../../hooks/useSendCheer';

export const ProtestCheeringButton = () => {
    const { client } = useWebSocket();
    const params = useParams();
    const protestId = params.id;
    const { sendCheer } = useSendCheer({ client, protestId: String(protestId) });
    if (!protestId) return null;

    return <Button onClick={sendCheer}>응원하기</Button>;
};
