'use client';
import { EMOJI } from '@/constants/emojis';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { useProtestCheerCount } from '@/hooks/useProtestCheerCount';
interface Prosp {
  protestId: string;
}
const ProtestCheerBadge = ({ protestId }: Prosp) => {
  const { data } = useProtestCheerCount(protestId);
  const { effect } = useCheerEffect(data);

  return (
    <div className='flex flex-col justify-center items-center'>
      <>
        {effect && (
          <div className={`absolute bottom-3 animate-bounce ${effect ? 'text-red-500' : ''}`}>
            {EMOJI.FIRE}
          </div>
        )}
        <div>{data?.cheerCount}</div>
      </>
    </div>
  );
};

export default ProtestCheerBadge;
