'use client';

import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useSendCheer } from '../../hooks/useSendCheer';
import { WebSocketContext } from '../../hooks/WebSocketContext';
import { useContext } from 'react';

export const ProtestCheeringButton = () => {
    const { client, connect } = useContext(WebSocketContext);
    const params = useParams();
    const protestId = params.id;
    const { sendCheer } = useSendCheer({ client, protestId: String(protestId) });
    if (!protestId || !client || !connect) return null;

    return <Button onClick={sendCheer}>응원하기</Button>;
};
