import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';
import { Protest } from '@/types/protest';

const ProtestCard = ({ id, title, description, locations }: Protest) => {
  return (
    <Link href={`/protest/${id}`}>
      <div className='flex flex-col gap-0.5 text-start bg-background-white rounded-md p-3'>
        <div className='flex justify-between'>
          <h1 className='text-[#D44646] font-bold'>{title}</h1>
          <MdArrowOutward />
        </div>
        <p className='text-[11px] text-zinc-400'>{locations[0].name}</p>
        <p className='text-[13px] truncate'>{description}</p>
      </div>
    </Link>
  );
};

export default ProtestCard;
