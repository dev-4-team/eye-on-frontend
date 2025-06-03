import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='flex flex-col items-center justify-center p-1.5 bg-[#f8f8f8] text-[#333] text-[clamp(0.7rem,1vw,1.3rem)] text-center h-[8vh]'>
      <h2 className='text-[clamp(0.7rem,1vw,1.3rem)]'>오늘의 집회 및 시위 일정을 확인해보세요!</h2>
      <p>
        건의사항이 있으신가요?&nbsp;
        <Link
          href='https://forms.gle/yVCSNEFvB6rA95QW7'
          target='_blank'
          rel='noopener noreferrer'
          className='text-[#d44646] font-bold no-underline hover:underline'
        >
          Google 설문 링크
        </Link>
      </p>
      <p>
        문의 :&nbsp;
        <a
          href='mailto:eye.on.korea25@google.com'
          className='text-[#d44646] font-bold no-underline hover:underline'
        >
          eye.on.korea25@google.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
