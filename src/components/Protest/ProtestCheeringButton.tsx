'use client';

import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useSocketStore } from '@/store/useSocketStore';
import { SendCheerMutation } from '@/lib/API/ProtestCheerCount';

export const ProtestCheeringButton = () => {
    const params = useParams();
    const protestId = params.id;
    const cheerDestination = `/app/cheer/protest/${protestId}`;
    const { sendMessage } = useSocketStore();
    const { socketIsReady } = useSocketStore();
    const { mutate } = SendCheerMutation(String(protestId));
    return (
        <Button
            onClick={() => {
                if (socketIsReady) {
                    sendMessage(cheerDestination);
                } else {
                    mutate(String(protestId));
                }
            }}
        >
            응원하기
        </Button>
    );
};
