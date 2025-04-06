'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocketStore } from '@/store/useSocketStore';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { useProtestCheerStore } from '@/store/useProtestCheerStore';
import { UseProtestCheerCount } from '@/hooks/UseProtestCheerCount';
import { SendCheerMutation } from '@/hooks/SendCheerMutation';
import useConfetti from '@/hooks/useConfetti';
import { ProtestActionButton } from '@/components/Button';
import Image from 'next/image';
import { numberTransfer } from '@/lib/utils';

export const ProtestDetailCheer = ({ protestId }: { protestId: string }) => {
    const { socketIsReady } = useSocketStore();
    const { data } = UseProtestCheerCount(protestId, socketIsReady);
    const { effect } = useCheerEffect(data);
    const { cheerList, realtimeCheerIds } = useProtestCheerStore();
    const isRealtimeCheer = realtimeCheerIds.has(protestId);
    const cheerCountCalculater = socketIsReady
        ? cheerList.find((cheer) => String(cheer.protestId) === protestId)?.cheerCount
        : data?.cheerCount;

    const cheerDestination = `/app/cheer/protest/${protestId}`;
    const { sendMessage } = useSocketStore();
    const { mutate } = SendCheerMutation(String(protestId));
    const { getConfetti } = useConfetti();

    const handleConffeti = () => {
        getConfetti().addConfetti({
            emojis: ['🔥', '📣', '💪'],
            emojiSize: 80,
            confettiNumber: 30,
        });
    };
    return (
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
            <ProtestActionButton
                onClick={() => {
                    if (socketIsReady) {
                        handleConffeti();
                        sendMessage(cheerDestination);
                    } else {
                        mutate(String(protestId));
                    }
                }}
            >
                <Image src='/images/torch.png' alt='torch image' width={10} height={10} />
                <span className='text-sm text-white'> {numberTransfer(cheerCountCalculater || 0)} 응원</span>
            </ProtestActionButton>
        </div>
    );
};
