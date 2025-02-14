import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (isoString: string) => {
    const date = new Date(isoString);

    const month = date.getMonth() + 1;
    const day = date.getDate();

    const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const weekday = weekdays[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${month}월 ${day}일 ${weekday} ${hours}시 ${minutes}분 `;
};
