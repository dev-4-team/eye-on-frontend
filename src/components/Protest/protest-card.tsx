import { ProtestData } from '@/types';
import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';

export default function ProtestCard({ id, title, description, location }: ProtestData) {
    return (
        <Link href={`/protest/${id}`}>
            <div className="flex flex-col gap-0.5 text-start bg-background-white rounded-md p-3">
                <div className="flex justify-between">
                    <h1 className="text-[#D44646] font-bold">{title}</h1>
                    <MdArrowOutward />
                </div>
                <p className="text-[11px] text-zinc-400">{location}</p>
                <p className="text-[13px] truncate">{description}</p>
            </div>
        </Link>
    );
}
