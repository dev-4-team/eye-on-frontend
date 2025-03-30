'use client';

import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useSocketStore } from '@/store/useSocketStore';

export const ProtestCheeringButton = () => {
    const params = useParams();
    const protestId = params.id;
    const cheerDestination = `/app/cheer/protest/${protestId}`;
    const { publish } = useSocketStore();

    return (
        <Button
            onClick={() => {
                publish(cheerDestination);
            }}
        >
            응원하기
        </Button>
    );
};
