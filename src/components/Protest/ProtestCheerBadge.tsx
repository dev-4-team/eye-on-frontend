'use client';
import { useSocketStore } from '@/store/useSocketStore';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { useProtestCheerStore } from '@/store/useProtestCheerStore';
import { UseProtestCheerCount } from '@/hooks/UseProtestCheerCount';

export const ProtestCheerBadge = ({ protestId }: { protestId: string }) => {
    const { socketIsReady } = useSocketStore();
    const { data } = UseProtestCheerCount(protestId, socketIsReady);

    const { effect } = useCheerEffect(data);
    const { cheerList, realtimeCheerIds } = useProtestCheerStore();
    const isRealtimeCheer = realtimeCheerIds.has(protestId);
    const cheerCountCalculater = socketIsReady
        ? cheerList.find((cheer) => cheer.protestId === protestId)?.cheerCount
        : data?.cheerCount;
    return (
        <div className='flex flex-col justify-center items-center'>
            {cheerCountCalculater && (
                <>
                    {(effect || isRealtimeCheer) && (
                        <div className={`animate-bounce ${isRealtimeCheer ? 'text-red-500' : ''}`}>🔥</div>
                    )}
                    <div>{cheerCountCalculater}</div>
                </>
            )}
        </div>
    );
};
