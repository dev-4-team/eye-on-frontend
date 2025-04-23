'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const cameFromValidRoute = sessionStorage.getItem('fromValidRoute');

    if (!cameFromValidRoute) {
      router.replace('/');
    } else {
      setIsValid(true);
    }
  }, [router]);

  const handleGobackButton = () => {
    sessionStorage.removeItem('fromValidRoute');
    router.back();
  };

  if (!isValid) {
    return (
      <div className='flex justify-center items-center h-[86vh]'>
        <div className='flex flex-col h-[100%] items-center justify-around'>
          <span>잘못 된 접근입니다</span>
        </div>
      </div>
    );
  }

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
