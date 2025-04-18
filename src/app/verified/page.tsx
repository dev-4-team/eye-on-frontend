'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const handleGobackButton = () => {
    router.back();
  };
  return (
    <div className='flex justify-center items-center h-[86vh]'>
      <div className='flex flex-col h-[100%] items-center justify-around'>
        <div className='flex flex-col items-center gap-20'>
          <span className='text-xl font-bold'>인증이 완료되었습니다.</span>
          <Image src={'/images/check.gif'} width={200} height={200} alt='check' />
        </div>
        <Button onClick={handleGobackButton} variant={'signature'} size={'verify'}>
          인증완료
        </Button>
      </div>
    </div>
  );
}
