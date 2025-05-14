'use client';

import Image from 'next/image';
import { EMOJI } from '@/constants/emojis';
import { numberTransfer } from '@/lib/utils';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { useSendCheerMutation } from '@/hooks/useSendCheerMutation';
import ProtestActionButton from '@/components/Button/ProtestActionButton';
import { useProtestCheerCount } from '@/hooks/useProtestCheerCount';

interface Props {
  protestId: string;
}

const ProtestDetailCheer = ({ protestId }: Props) => {
  const { cheerCount, cheerCountIsLoading, cheerCountIsError } = useProtestCheerCount({
    protestId,
  });
  const { effect } = useCheerEffect(cheerCount);
  const { cheerProtest, cheerError } = useSendCheerMutation({ protestId });

  const handleCheerButtonClick = () => {
    cheerProtest();
  };

  return (
    <div className='flex flex-col justify-center items-center  '>
      <ProtestActionButton
        onClick={handleCheerButtonClick}
        disabled={cheerCountIsLoading || cheerCountIsError || cheerError}
      >
        {cheerCountIsLoading ? (
          <div className='animate-spin'>{EMOJI.LOADDING}</div>
        ) : cheerCountIsError ? (
          <div>{EMOJI.WARNING}</div>
        ) : (
          <>
            {effect ? (
              <div className='animate-bounce'>{EMOJI.FIRE}</div>
            ) : (
              <Image src='/images/torch.png' alt='torch image' width={10} height={10} />
            )}
            <span className='text-sm text-white'>
              {numberTransfer(cheerCount?.cheerCount ?? 'X')} 응원하기
            </span>
          </>
        )}
      </ProtestActionButton>
    </div>
  );
};

export default ProtestDetailCheer;
