'use client';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { UseProtestCheerCount } from '@/hooks/UseProtestCheerCount';
import { SendCheerMutation } from '@/hooks/SendCheerMutation';
import useConfetti from '@/hooks/useConfetti';
import { ProtestActionButton } from '@/components/Button';
import Image from 'next/image';
import { numberTransfer } from '@/lib/utils';

export const ProtestDetailCheer = ({ protestId }: { protestId: string }) => {
  const { data, isLoading, isError } = UseProtestCheerCount(protestId);
  const { effect } = useCheerEffect(data);
  const { mutate } = SendCheerMutation(String(protestId));
  const { getConfetti } = useConfetti();
  const handleConffeti = () => {
    getConfetti().addConfetti({
      emojis: ['🔥', '✔️', '❤️'],
      emojiSize: 80,
      confettiNumber: 30,
    });
  };
  return (
    <div className='flex flex-col justify-center items-center  '>
      <ProtestActionButton
        onClick={() => {
          handleConffeti();
          mutate(String(protestId));
        }}
        disabled={isLoading || isError || !data}
      >
        {isLoading ? (
          <div className='animate-spin'>⟳</div>
        ) : isError || !data ? (
          <div>⚠️</div>
        ) : (
          <>
            {effect ? (
              <div className='animate-bounce'>🔥</div>
            ) : (
              <Image src='/images/torch.png' alt='torch image' width={10} height={10} />
            )}
            <span className='text-sm text-white'>{numberTransfer(data.cheerCount)} 응원하기</span>
          </>
        )}
      </ProtestActionButton>
    </div>
  );
};
