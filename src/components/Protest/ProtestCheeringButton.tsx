'use client';

import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useSocketStore } from '@/store/useSocketStore';

export const ProtestCheeringButton = () => {
    const params = useParams();
    const protestId = params.id;
    const destiantion = `/app/cheer/protest/${protestId}`;
    const { publish } = useSocketStore();

    return (
        <Button
            onClick={() => {
                publish(destiantion);
            }}
        >
            응원하기
        </Button>
    );
};
