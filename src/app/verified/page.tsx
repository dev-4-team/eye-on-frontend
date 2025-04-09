import Image from 'next/image';

export default function Page() {
  return (
    <div className='flex justify-center h-[86vh]'>
      <div>
        <Image src={'/images/check.gif'} width={100} height={100} alt='check' />
      </div>
    </div>
  );
}
