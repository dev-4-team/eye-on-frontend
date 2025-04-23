import Link from 'next/link';
import { Single_Day } from 'next/font/google';
import KakaoLogin from '@/components/KakaoLogin/KakaoLogin';

const singleDay = Single_Day({ weight: '400' });

const Header = () => {
  return (
    <header className='flex items-center justify-between px-3.5 bg-white text-[#d44646] h-[6vh]'>
      <Link
        href={'/'}
        className={`${singleDay.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold`}
      >
        <span className='text-xl sm:text-2xl md:text-3xl'>주</span>
        <span className='text-lg sm:text-xl md:text-2xl'>변</span>
        <span className='text-xl sm:text-2xl md:text-3xl'>시</span>
        <span className='text-lg sm:text-xl md:text-2xl'>위</span>{' '}
        <span className='text-lg sm:text-xl md:text-2xl'>Now</span>
      </Link>
      <KakaoLogin />
    </header>
  );
};

export default Header;
