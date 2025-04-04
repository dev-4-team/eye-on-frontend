'use client';

import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useSocketStore } from '@/store/useSocketStore';
import { SendCheerMutation } from '@/hooks/SendCheerMutation';
import useConfetti from '@/hooks/useConfetti';

export const ProtestCheeringButton = () => {
    const params = useParams();
    const protestId = params.id;
    const cheerDestination = `/app/cheer/protest/${protestId}`;
    const { sendMessage } = useSocketStore();
    const { socketIsReady } = useSocketStore();
    const { mutate } = SendCheerMutation(String(protestId));
    const { confetti } = useConfetti();

    const handleConffeti = () => {
        confetti?.addConfetti({
            emojis: ['🔥', '📣', '💪'],
            emojiSize: 80,
            confettiNumber: 30,
        });
    };

    return (
        <Button
            onClick={() => {
                if (socketIsReady) {
                    handleConffeti();
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
