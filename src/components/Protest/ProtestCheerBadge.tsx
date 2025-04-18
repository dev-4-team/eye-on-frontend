'use client';
import { useCheerEffect } from '@/hooks/useCheerEffect';
import { UseProtestCheerCount } from '@/hooks/UseProtestCheerCount';

export const ProtestCheerBadge = ({ protestId }: { protestId: string }) => {
  const { data } = UseProtestCheerCount(protestId);
  const { effect } = useCheerEffect(data);

  return (
    <div className='flex flex-col justify-center items-center'>
      <>
        {effect && (
          <div className={`absolute bottom-3 animate-bounce ${effect ? 'text-red-500' : ''}`}>
            🔥
          </div>
        )}
        <div>{data?.cheerCount}</div>
      </>
    </div>
  );
};
