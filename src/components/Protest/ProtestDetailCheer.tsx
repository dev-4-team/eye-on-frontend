'use client';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { useSendCheerMutation } from '@/hooks/useSendCheerMutation';
import useConfetti from '@/hooks/useConfetti';
import { ProtestActionButton } from '@/components/Button';
import Image from 'next/image';
import { numberTransfer } from '@/lib/utils';
import { useProtestCheerCount } from '@/hooks/UseProtestCheerCount';
import { EMOJI } from '@/constants/emojis';

export const ProtestDetailCheer = ({ protestId }: { protestId: string }) => {
  const { data, isLoading, isError } = useProtestCheerCount(protestId);
  const { effect } = useCheerEffect(data);
  const { mutate } = useSendCheerMutation(String(protestId));
  const { getConfetti } = useConfetti();
  const handleConffeti = () => {
    getConfetti().addConfetti({
      emojis: [EMOJI.FIRE, EMOJI.CHECK, EMOJI.HEART],
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
          <div className='animate-spin'>{EMOJI.LOADDING}</div>
        ) : isError || !data ? (
          <div>{EMOJI.WARNING}</div>
        ) : (
          <>
            {effect ? (
              <div className='animate-bounce'>{EMOJI.FIRE}</div>
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
