'use client'
import { EMOJI } from '@/constants/emojis'
import { useCheerEffect } from '@/hooks/useCheerEffect'
import { useProtestCheerCount } from '@/hooks/useProtestCheerCount'
interface Props {
  protestId: string
}
const ProtestCheerBadge = ({ protestId }: Props) => {
  const { cheerCount, cheerCountIsLoading, cheerCountIsError } = useProtestCheerCount({
    protestId,
  })
  const { effect } = useCheerEffect({ protestId, cheerCount: cheerCount?.cheerCount ?? 0 })
  if (!protestId || cheerCountIsError || cheerCountIsLoading) return null

  return (
    <div className='flex flex-col justify-center items-center'>
      <>
        {effect && (
          <div className={`absolute bottom-3 animate-bounce ${effect ? 'text-red-500' : ''}`}>
            {EMOJI.FIRE}
          </div>
        )}
        <div>{cheerCount?.cheerCount}</div>
      </>
    </div>
  )
}

export default ProtestCheerBadge
