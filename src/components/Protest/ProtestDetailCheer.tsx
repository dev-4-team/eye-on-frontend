'use client';

import Image from 'next/image';
import { EMOJI } from '@/constants/emojis';
import { useConfetti } from '@/hooks/useConfetti';
import { numberTransfer } from '@/lib/utils';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { useSendCheerMutation } from '@/hooks/useSendCheerMutation';
import ProtestActionButton from '@/components/Button/ProtestActionButton';
import { useProtestCheerCount } from '@/hooks/useProtestCheerCount';

interface Props {
  protestId: string;
}

const ProtestDetailCheer = ({ protestId }: Props) => {
  const { data, isLoading, isError } = useProtestCheerCount({ protestId });
  const { effect } = useCheerEffect(data);
  const { mutate } = useSendCheerMutation({ protestId });
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
          mutate();
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

export default ProtestDetailCheer;
