import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_DEV_URL;
export const targetDate =
    process.env.NODE_ENV === 'development' ? '2025-03-15' : new Date().toISOString().split('T')[0];

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

    return `${month}월 ${day}일 ${weekday} ${hours}시 ${minutes}분`;
};

export const isDesktopOS = () => {
    if (typeof window === 'undefined') return false;
    return (
        'win16|win32|win64|windows|mac|macintel|linux|freebsd|openbsd|sunos'.indexOf(
            navigator.platform.toLowerCase()
        ) >= 0
    );
};

export const getIsMobile = () => {
    if (typeof window === 'undefined') return false;
    const userAgent = window.navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    return isMobile;
};

export const calculateRealDistanceOnePixel = (x1: number, y1: number, x2: number, y2: number) => {
    const R = 6371000;
    const toRadian = Math.PI / 180;
    const lat1 = x1 * toRadian;
    const lon1 = y1 * toRadian;
    const lat2 = x2 * toRadian;
    const lon2 = y2 * toRadian;

    return (
        2 *
        R *
        Math.asin(
            Math.sqrt(
                Math.sin((lat2 - lat1) / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin((lon2 - lon1) / 2) ** 2
            )
        )
    );
};

export const generateColorFromIndex = (index: number): string => {
    const r = (index * 50) % 256;
    const g = (index * 100) % 256;
    const b = (index * 150) % 256;
    return `rgb(${r}, ${g}, ${b})`;
};

export const numberTransfer = (number: number) => {
    if (number < 1000) {
        return number;
    } else if (number < 10000) {
        return `${(number / 1000).toFixed(1)}k`;
    } else {
        return `${(number / 10000).toFixed(1)}M`;
    }
};
