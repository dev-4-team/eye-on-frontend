'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocketStore } from '@/store/useSocketStore';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { useProtestCheerStore } from '@/store/useProtestCheerStore';
import { UseProtestCheerCount } from '@/hooks/UseProtestCheerCount';

export const ProtestDetailCheer = ({ protestId }: { protestId: string }) => {
    const { socketIsReady } = useSocketStore();
    const { data } = UseProtestCheerCount(protestId, socketIsReady);

    const { effect } = useCheerEffect(data);
    const { cheerList, realtimeCheerIds } = useProtestCheerStore();
    const isRealtimeCheer = realtimeCheerIds.has(protestId);

    const temporalProtestId = protestId;

    const cheerCountCalculater = socketIsReady
        ? cheerList.find((cheer) => cheer.protestId === temporalProtestId)?.cheerCount
        : data?.cheerCount;

    return (
        <>
            {cheerCountCalculater !== undefined && (
                <div className='flex flex-col justify-center items-center'>
                    <AnimatePresence>
                        {(effect || isRealtimeCheer) && (
                            <motion.div
                                key={Date.now()}
                                className='text-2xl'
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                animate={{ scale: 1.5, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                🔥
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div>{cheerCountCalculater}</div>
                </div>
            )}
        </>
    );
};
